# 🎮 Code Typing RPG - Documentación Completa

## 📋 Resumen General

**Code Typing RPG** es una aplicación gamificada de escritura de código en tiempo real. Los usuarios completan desafíos de código dentro de límites de tiempo, ganan XP, desbloquean logros y compiten en rankings globales.

---

## ✨ Características Implementadas

### 1. **🎯 Mecánicas de Juego**
- **5 Vidas**: Sistema de escudos que disminuye con cada error
- **Timer**: Límites de tiempo por dificultad (Fácil: 60s, Medio: 45s, Difícil: 30s)
- **WPM Tracking**: Calcula velocidad de escritura (Palabras Por Minuto)
- **XP Rewards**: Puntos XP basados en velocidad, precisión y dificultad
- **3 Niveles de Dificultad**: Fácil, Medio, Difícil

### 2. **🏆 Sistema de Logros (8 Badges)**
- **firstHack**: Completar tu primer desafío
- **novicHacker**: Alcanzar 100 XP
- **experiencedHacker**: Alcanzar 1000 XP
- **legendaryHacker**: Alcanzar 5000 XP
- **speedDemon**: Completar 3 desafíos con WPM > 80
- **sonic**: Completar un desafío Difícil en < 15 segundos
- **xpMaster**: Ganar 500 XP en una sola partida
- **timePlayed**: Jugar 3+ horas totales

**UI**: Grid responsive (2/3/4 cols), badges desbloqueados brillan, notificación al desbloquear nuevo

### 3. **📊 Dashboard de Estadísticas**
**4 Estadísticas Principales:**
- **XP Total**: Puntos acumulados (animación contador)
- **Hacks Completados**: Partidas ganadas
- **WPM Promedio**: Velocidad promedio calculada
- **Tiempo Jugado**: Horas/minutos totales

**Características:**
- Contador animado al cargar (0 → valor final)
- Efectos hover con glow personalizado
- Entrada escalonada de componentes

### 4. **🏅 Leaderboard Global (Top 10)**
- Ranking por XP descendente
- Muestra: Nombre, XP, Batallas Ganadas, WPM promedio
- Medallas: 🥇 Oro (1°), 🥈 Plata (2°), 🥉 Bronce (3°)
- Avatares con dicebear API
- Real-time updates con Firestore onSnapshot

### 5. **✨ Animaciones**
- **Confetti**: Lluvia de partículas al ganar
- **XP Popup**: Números flotantes al ganar XP
- **Shimmer Badges**: Brillo horizontal en logros nuevos
- **Counter Animation**: Números subiendo suavemente
- **Hover Effects**: Escala + glow en stat boxes
- **Pulse Ring**: Anillo expandiendo en avatar
- **Staggered Entrada**: Animación secuencial de elementos

### 6. **🎵 Audio Manager**
- Reproductor MP3 minimalista
- Control de volumen (0-100%)
- Play/Pause
- Loop infinito automático
- Ubicado en bottom-right
- Indicador visual cuando reproduce

### 7. **🔐 Autenticación Avanzada**

**Login/Registro:**
- Email + Password
- Google Sign-In
- Verificación automática de email tras registro

**Recuperación de Contraseña:**
- Tab "¿OLVIDASTE TU PASSWORD?"
- Firebase envía email de reseteo automático

**Cambio de Contraseña en Dashboard:**
- Modal elegante con overlay
- Reautenticación obligatoria (seguridad)
- Validaciones (6+ chars, coincidir, diferente a actual)
- Mensajes de error específicos

**Limpieza de Emails Duplicados:**
- Detección automática de "email-already-in-use"
- Auto-limpia registros huérfanos en Firestore
- Permite reintentar registro

### 8. **📚 Tutorial/Onboarding Completo**

**3 Componentes:**

a) **Modal Inicial** (OnboardingModal.jsx)
- Aparece para nuevos usuarios tras registro
- Explica los 3 pilares: Juega, Logros, Skills
- Muestra los 4 pasos básicos de cómo jugar
- Botones: "Saltar" o "Empezar Tour"

b) **Tour Interactivo** (OnboardingTour.jsx)
- 4 pasos: Menu → Play → Dashboard → Leaderboard
- Tooltips con explicaciones
- Barra de progreso
- Navegación Next/Previous
- Botón "Completado" al final

c) **Centro de Ayuda** (HelpPanel.jsx)
- Panel deslizable desde la derecha
- 6 tips expandibles:
  - XP & Progreso
  - Logros Especiales
  - Sistema de Vidas
  - Tiempo es Oro
  - Música Ambiental
  - WPM (Velocidad)
- Botón para repetir tour
- Siempre accesible (HelpButton en bottom-left)

**Persistencia:**
- localStorage guarda `onboarding_${userId}`
- No molesta a usuarios que ya completaron
- Se puede resetear desde Centro de Ayuda

### 9. **🎨 UI/UX**
- **Tema**: Dark Mode (slate-900/black) con acentos cyan/pink
- **Tipografía**: "Itálica" para títulos, "mono" para código
- **Responsive**: Mobile-first, breakpoints MD/LG
- **Animaciones**: Framer Motion para transiciones suaves
- **Iconos**: Lucide React (18+ iconos usados)
- **Gradientes**: GradientBg, cy an-blue dominantes

### 10. **🔥 Características Extras**
- **Hamburger Menu**: Navbar colapsable en mobile
- **Active States**: Indicadores visuales de pantalla actual
- **Sound Effects**: tick, error, attack, win, fail (en Game component)
- **Responsive Design**: Adaptable a tablets/mobile
- **Error Handling**: Mensajes claros en toda la app
- **Loading States**: Spinners en operaciones async

---

## 🏗️ Arquitectura

### **Estructura de Carpetas**

```
src/
├── hooks/
│   ├── useAuth.js              # Auth state + Firebase
│   ├── useChallenges.js        # Cargar desafíos
│   ├── useGameLogic.js         # Mecánicas juego
│   ├── useAppNavigation.js     # Navigator screens
│   ├── useLeaderboard.js       # Ranking real-time
│   ├── usePlayerStats.js       # Estadísticas
│   ├── useAchievements.js      # Logros unlock
│   ├── useAudioPlayer.js       # Audio control
│   ├── useOnboarding.js        # Tutorial state
│   └── [más hooks]
│
├── components/
│   ├── Auth.jsx                # Login/Register modal
│   ├── Navbar.jsx              # Top nav + user menu
│   ├── MenuScreen.jsx          # Challenge selection
│   ├── PlayScreen.jsx          # Game HUD
│   ├── Game.jsx                # Code editor
│   ├── UserDashboard.jsx       # Profile + stats
│   ├── Achievements.jsx        # Badge grid
│   ├── Leaderboard.jsx         # Top 10 ranking
│   ├── AudioPlayer.jsx         # Music player
│   ├── OnboardingModal.jsx     # First-time modal
│   ├── OnboardingTour.jsx      # Step-by-step guide
│   ├── HelpPanel.jsx           # Help drawer
│   ├── HelpButton.jsx          # Help circle button
│   └── [más componentes]
│
├── data/
│   └── achievements.js         # 8 achievement defs
│
├── utils/
│   ├── firebaseCleanup.js      # Cleanup utilities
│   └── [funciones utiles]
│
├── App.jsx                     # Main container
├── firebase.js                 # Firebase config
└── index.css / main.jsx        # Punto de entrada
```

### **Data Flow**

```
App.jsx (Main Container)
├── useAuth() → Login/Register
├── useChallenges() → Challenge selection
├── useGameLogic() → Game mechanics
├── useLeaderboard() → Real-time ranking
├── useOnboarding() → Tutorial state
└── Components tree
    ├── Navbar (Screen navigation)
    ├── [Screen Component] (Menu/Play/Dashboard/Leaderboard)
    ├── AudioPlayer (Music control)
    └── Onboarding (Modal/Tour/Help)

Firebase ↔ Hooks (Real-time listeners)
```

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 + Vite |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Backend** | Firebase (Firestore + Auth) |
| **Audio** | HTML5 Audio API |
| **Build** | Vite (ESBuild) |

---

## 📱 Pantallas Principales

### **1. Auth Screen**
- Login con email/password
- Google Sign-in
- Registro con verificación de email
- Recuperación de password
- Limpieza automática de duplicados

### **2. Menu Screen** (Challenge Selection)
- Grid de desafíos por dificultad
- Búsqueda/filtrado
- Mis desafíos personalizados
- Stats preview

### **3. Play Screen** (Game)
- Code editor con validación real-time
- HUD superior: vidas, timer, WPM, sync%
- Enemy sprite animado
- Animaciones: confetti (win), tremor (low HP)

### **4. Dashboard**
- Perfil con avatar
- 4 estadísticas principales (animadas)
- Badge grid (8 logros)
- Lista de desafíos propios (CRUD)

### **5. Leaderboard**
- Top 10 jugadores por XP
- Medallas (🥇🥈🥉)
- Stats personalizadas por jugador

---

## 🚀 Cómo Usar

### **Setup Inicial**
```bash
npm install
npm run dev
```

### **Agregar Música**
1. Descarga MP3 de música ambiental
2. Colócalo en `public/music/ambient.mp3`
3. Reinicia el server

### **Crear Desafíos Personalizados**
1. Ve a Menu → "CREAR_SCRIPT"
2. Ingresa: Título, Código (JavaScript), Dificultad
3. Se guarda en Firestore automáticamente

### **Ver Progreso**
1. Click en tu avatar (top-right)
2. Ve a "PERFIL"
3. Inspecciona: XP, Logros, Estadísticas

---

## 📊 Base de Datos (Firestore)

### **Colecciones:**

**`players/`**
```javascript
{
  uid: string,
  name: string,
  email: string,
  photoURL: string,
  xp: number,
  battlesWon: number,
  createdAt: timestamp,
  subcollections: {
    gameHistory: [{wpm, duration, difficulty, timestamp}],
    achievements: [{id, unlockedAt}]
  }
}
```

**`challenges/`**
```javascript
{
  userId: string,
  title: string,
  code: string,
  difficulty: 'Fácil' | 'Medio' | 'Difícil',
  createdAt: timestamp
}
```

---

## 🎓 Próximas Mejoras (Opcionales)

- [ ] Multi-player matches (real-time)
- [ ] Leaderboards semanales
- [ ] Sistema de habilidades (skills tree)
- [ ] Daily challenges
- [ ] Streaming (Twitch integration)
- [ ] Mobile app (Flutter/React Native)
- [ ] Voice chat
- [ ] Tournaments

---

## 📝 Notas de Desarrollo

- **Errores Compilación**: 0 (validado)
- **Performance**: Optimizado para 60fps
- **Responsive**: Testeado en mobile/tablet/desktop
- **Accesibilidad**: Textos con buen contraste, iconos descriptivos
- **Seguridad**: Firebase auth, reautenticación para críticos

---

## ✅ Checklist de Desarrollo

- [x] Sistema de juego
- [x] Desafíos customizables
- [x] XP y rewards
- [x] 8 logros/badges
- [x] Dashboard con stats
- [x] Leaderboard real-time
- [x] Autenticación avanzada
- [x] Audio/música
- [x] Animaciones fluidas
- [x] Tutorial/Onboarding
- [x] Responsive design
- [x] Dark mode

---

**Versión**: 1.0 Complete
**Última Actualización**: March 7, 2026
**Estado**: ✅ PRODUCTION READY
