# ⚡ CODE-TYPING RPG

![Vercel Deployment](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

> **"Domina el código, hackea el mainframe y sobrevive al sistema."**

**Code-Typing RPG** es un simulador de coding y entrenamiento de mecanografía envuelto en una estética Cyberpunk. El objetivo es completar fragmentos de código real en el menor tiempo posible, evitando que el firewall detecte tus errores y agote tu integridad.

---

## 🚀 Características Principales

* **Reto de Precisión:** Sistema de "Integridad" (vidas) que se agota con cada error tipográfico.
* **Contra el Reloj:** Temporizadores dinámicos basados en la dificultad de la inyección de código.
* **Estadísticas en Tiempo Real:** Visualización de WPM (Palabras por minuto) y porcentaje de sincronización (Sync).
* **Multijugador Persistente:** Autenticación con Google y guardado de progreso mediante Firebase Cloud Firestore.
* **Creador de Retos:** Los usuarios pueden inyectar sus propios fragmentos de código para que otros los hackeen.

---

## 🛠️ Stack Tecnológico

* **Frontend:** [React.js](https://reactjs.org/) con Vite.
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/) + Framer Motion (Animaciones).
* **Backend:** [Firebase](https://firebase.google.com/) (Auth & Firestore).
* **Iconografía:** [Lucide React](https://lucide.dev/).
* **Avatar Generation:** [DiceBear API](https://www.dicebear.com/).

---

## 📦 Instalación Local

Si deseas clonar este proyecto y ejecutarlo en tu máquina:

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/Norato-dev/CodeTyping-RPG.git
   cd CodeTyping-RPG

2. **Instala las dependencias:**
    ```bash
    npm install
3. **Configura las variables de entorno:**
Crea un archivo `.env.local` en la raíz y añade tus credenciales de Firebase:
    ```
    VITE_FIREBASE_API_KEY=tu_api_key
    VITE_FIREBASE_AUTH_DOMAIN=tu_dominio.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
    VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
    VITE_FIREBASE_APP_ID=tu_app_id
    ```
4. **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev

## 🎮 Cómo Jugar

1 **Inicia Sesión:** Accede con tu cuenta de Google para guardar tu progreso en el Mainframe.

2 **Elige una Misión:** Selecciona un reto de la cuadrícula (Fácil, Medio o Difícil).

3 **Codea:** Escribe el código que aparece en pantalla. ¡Cuidado! Los errores restan integridad al sistema.


## 📜 Licencia

Este proyecto está bajo la Licencia MIT.

## 👤 Autor

Desarrollado con ❤️ por **David Norato Ramirez**.
* **GitHub:** [Norato-Dev](https://github.com/Norato-dev).

*Este proyecto fue creado con fines educativos y para amantes del desarrollo de software.*
