export const ACHIEVEMENTS = {
  firstHack: {
    id: 'firstHack',
    title: 'Primer Hack',
    description: 'Completa tu primer desafío',
    icon: '🎯',
    color: 'from-green-500 to-emerald-600',
    check: (userData, playerStats) => userData?.battlesWon >= 1
  },
  novicHacker: {
    id: 'novicHacker',
    title: 'Hacker Novato',
    description: 'Completa 5 desafíos',
    icon: '🔓',
    color: 'from-cyan-500 to-blue-600',
    check: (userData, playerStats) => userData?.battlesWon >= 5
  },
  experiencedHacker: {
    id: 'experiencedHacker',
    title: 'Hacker Experimentado',
    description: 'Completa 25 desafíos',
    icon: '⚡',
    color: 'from-purple-500 to-pink-600',
    check: (userData, playerStats) => userData?.battlesWon >= 25
  },
  legendaryHacker: {
    id: 'legendaryHacker',
    title: 'Hacker Legendario',
    description: 'Completa 100 desafíos',
    icon: '👑',
    color: 'from-yellow-500 to-orange-600',
    check: (userData, playerStats) => userData?.battlesWon >= 100
  },
  speedDemon: {
    id: 'speedDemon',
    title: 'Velocista',
    description: 'Alcanza 100 WPM promedio',
    icon: '🚀',
    color: 'from-red-500 to-pink-600',
    check: (userData, playerStats) => playerStats?.averageWpm >= 100
  },
  sonic: {
    id: 'sonic',
    title: 'Supersónico',
    description: 'Alcanza 150 WPM promedio',
    icon: '💨',
    color: 'from-blue-500 to-cyan-600',
    check: (userData, playerStats) => playerStats?.averageWpm >= 150
  },
  xpMaster: {
    id: 'xpMaster',
    title: 'Maestro de XP',
    description: 'Acumula 10000 XP',
    icon: '⭐',
    color: 'from-yellow-400 to-yellow-600',
    check: (userData, playerStats) => userData?.xp >= 10000
  },
  timePlayed: {
    id: 'timePlayed',
    title: 'Jugador Dedicado',
    description: 'Juega más de 3 horas',
    icon: '⏰',
    color: 'from-indigo-500 to-purple-600',
    check: (userData, playerStats) => playerStats?.totalTimeSeconds >= 10800 // 3 horas
  }
};
