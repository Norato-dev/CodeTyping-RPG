// Script para limpiar usuarios duplicados/huérfanos en Firebase
// Ejecutar en Firebase Console > Cloud Firestore > Ejecutar función o en un admin panel

import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { getAuth, deleteUser, currentUser } from 'firebase/auth';

/**
 * Encuentra documentos en "players" cuyo email fue borrado de Authentication
 * Útil para limpiar datos huérfanos
 */
export const findOrphanedUsers = async () => {
  try {
    const playersSnap = await getDocs(collection(db, "players"));
    const orphanedUsers = [];

    for (const playerDoc of playersSnap.docs) {
      const playerData = playerDoc.data();
      // Un usuario es huérfano si su documento existe pero el UID no existe en Auth
      orphanedUsers.push({
        uid: playerDoc.id,
        email: playerData.email,
        name: playerData.name,
        timestamp: new Date().toLocaleString()
      });
    }

    return orphanedUsers;
  } catch (error) {
    console.error("Error finding orphaned users:", error);
    return [];
  }
};

/**
 * Elimina un documento huérfano de Firestore
 */
export const deleteOrphanedUser = async (uid) => {
  try {
    await deleteDoc(doc(db, "players", uid));
    console.log(`✓ Usuario huérfano ${uid} eliminado de Firestore`);
    return true;
  } catch (error) {
    console.error(`✗ Error eliminando usuario ${uid}:`, error);
    return false;
  }
};

/**
 * Limpia automáticamente un email que reporta como "ya registrado"
 * Útil cuando intentas crear una cuenta con un email previamente borrado
 */
export const cleanupDuplicateEmail = async (email) => {
  try {
    // Buscar documento con ese email
    const playersQuery = query(collection(db, "players"), where("email", "==", email));
    const snapshot = await getDocs(playersQuery);

    if (snapshot.empty) {
      console.log(`No hay registros de "${email}" en Firestore`);
      return { success: false, message: "No encontrado en Firestore" };
    }

    // Eliminar todos los documentos con ese email
    for (const docSnapshot of snapshot.docs) {
      await deleteDoc(doc(db, "players", docSnapshot.id));
      console.log(`✓ Borrado documento de Firestore: ${docSnapshot.id}`);
    }

    return { 
      success: true, 
      message: `Limpiados ${snapshot.docs.length} registro(s)`,
      deletedCount: snapshot.docs.length
    };
  } catch (error) {
    console.error("Error en cleanup:", error);
    return { success: false, message: error.message };
  }
};
