# 🎵 Audio Player - Instrucciones

Tu app ahora usa un reproductor de audio MP3 simple con solo control de volumen.

## 📁 Cómo Cargar tu Música

### **Opción 1: Copiar archivo MP3 (Recomendado)**

1. Descarga o genera tu archivo MP3 de música ambiental
2. Colócalo en esta carpeta: `public/music/`
3. **Renómbralo exactamente**: `ambient.mp3`

Estructura final:
```
code-typing-rpg/
├── public/
│   └── music/
│       └── ambient.mp3  ← Tu archivo aquí
├── src/
└── ...
```

### **Opción 2: Usar URL externa**

Si prefieres hospedar el MP3 en otro lugar, edita `src/components/AudioPlayer.jsx`:

```javascript
const { isPlaying, togglePlay, volume, setVolume } = useAudioPlayer(
  'https://tu-servidor.com/musica.mp3'
);
```

## ⚙️ Características

✅ Play / Pause
✅ Control de volumen (0-100%)
✅ Loop infinito
✅ Indicador visual cuando está reproduciendo
✅ Almacenado en bottom-right (como antes)

## 🔧 Personalización

### **Cambiar volumen por defecto:**

Edita `src/hooks/useAudioPlayer.js`:
```javascript
const [volume, setVolume] = useState(0.5);  // Cambia 0.3 por lo que quieras
```

### **Cambiar ruta del MP3:**

Edita `src/components/AudioPlayer.jsx`:
```javascript
const { isPlaying, togglePlay, volume, setVolume } = useAudioPlayer('/music/tu-archivo.mp3');
```

## 📝 Formatos Soportados

- `.mp3` ✅ Recomendado
- `.wav` ✅
- `.ogg` ✅
- `.m4a` ✅ (con CORS)

## 🎧 Recomendaciones de Música

Para una app de coding RPG:
- **Ambiental/Lo-fi**: Chill Beats, Study Music
- **Instrumental**: Piano, Synthwave
- **Duración**: 30+ minutos (en loop)
- **Tamaño**: < 5MB (se carga al inicio)

Prueba en:
- [Free Music Archive](https://freemusicarchive.org)
- [Incompetech (Kevin MacLeod)](https://incompetech.com)
- [Pixabay Music](https://pixabay.com/music)

---

¡Listo! Copia tu MP3 en `public/music/ambient.mp3` y reinicia la app. 🎶
