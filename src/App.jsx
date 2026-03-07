import React, { useState } from 'react';
import { auth } from './firebase';

import { useAuth } from './hooks/useAuth';
import { useChallenges } from './hooks/useChallenges';
import { useGameLogic } from './hooks/useGameLogic';
import { useAppNavigation } from './hooks/useAppNavigation';
import { useLeaderboard } from './hooks/useLeaderboard';
import { useOnboarding } from './hooks/useOnboarding';

import Navbar from './components/Navbar';
import AuthScreen from './components/AuthScreen';
import MenuScreen from './components/MenuScreen';
import PlayScreen from './components/PlayScreen';
import UserDashboard from './components/UserDashboard';
import CreateChallenge from './components/CreateChallenge';
import Leaderboard from './components/Leaderboard';
import ConfirmModal from './components/ConfirmModal';
import Footer from './components/Footer';
import AudioPlayer from './components/AudioPlayer';
import OnboardingModal from './components/OnboardingModal';
import OnboardingTour from './components/OnboardingTour';
import HelpPanel from './components/HelpPanel';
import HelpButton from './components/HelpButton';

import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [screen, setScreen] = useState('menu');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Hooks personalizados
  const { user, userData, logout } = useAuth();
  const { challenges, myCustomChallenges } = useChallenges();
  const {
    currentChallenge,
    lives,
    timeLeft,
    isGameOver,
    isDefeated,
    isAttacking,
    gainedXP,
    liveStats,
    startChallenge,
    handleWin,
    handleMistake,
    endGame,
    setLiveStats,
    DIFFICULTY_THEMES
  } = useGameLogic(user);

  // Leaderboard
  const { leaderboard, loading: leaderboardLoading } = useLeaderboard();

  // Onboarding
  const {
    isModalOpen,
    isTourActive,
    tourStep,
    startTour,
    skipTour,
    nextStep,
    previousStep,
    endTour,
    resetOnboarding,
    isHelpOpen,
    setIsHelpOpen
  } = useOnboarding(user, userData);
  useAppNavigation(user, screen, currentChallenge, setScreen);

  // Manejadores
  const handleLogout = async () => {
    await logout();
    setShowLogoutModal(false);
  };

  const handleStartChallenge = (challenge) => {
    startChallenge(challenge);
    setScreen('play');
  };

  const handleCompleteGame = (finalWpm) => {
    handleWin(finalWpm);
  };

  const handleScreenChange = (newScreen) => {
    setScreen(newScreen);
  };

  return (
    <div className="min-h-screen w-full bg-[#020617] text-slate-100 selection:bg-cyan-500/30">
      <ConfirmModal 
        isOpen={showLogoutModal} 
        onClose={() => setShowLogoutModal(false)} 
        onConfirm={handleLogout} 
      />

      <Navbar 
        user={user} 
        screen={screen}
        onScreenChange={handleScreenChange} 
        onLogoutRequest={() => setShowLogoutModal(true)} 
      />

      <main className="max-w-7xl mx-auto p-6">
        <AnimatePresence mode="wait">
          {!user ? (
            <AuthScreen key="auth" />
          ) : (
            <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {screen === 'menu' && (
                <MenuScreen 
                  challenges={challenges}
                  myCustomChallenges={myCustomChallenges}
                  userData={userData}
                  onStartChallenge={handleStartChallenge}
                  themes={DIFFICULTY_THEMES}
                />
              )}

              {screen === 'play' && currentChallenge && (
                <PlayScreen
                  currentChallenge={currentChallenge}
                  lives={lives}
                  timeLeft={timeLeft}
                  isGameOver={isGameOver}
                  isDefeated={isDefeated}
                  isAttacking={isAttacking}
                  gainedXP={gainedXP}
                  liveStats={liveStats}
                  themes={DIFFICULTY_THEMES}
                  onComplete={handleCompleteGame}
                  onMistake={handleMistake}
                  onStatsUpdate={setLiveStats}
                />
              )}

              {screen === 'dashboard' && <UserDashboard user={user} userData={userData} />}
              
              {screen === 'create' && <CreateChallenge onSuccess={() => setScreen('menu')} />}

              {screen === 'leaderboard' && <Leaderboard leaderboard={leaderboard} loading={leaderboardLoading} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer 
        githubUrl="https://github.com/Norato-dev/" 
        developerName="David Norato Ramirez" 
      />

      <AudioPlayer />

      {/* ONBOARDING COMPONENTS */}
      <OnboardingModal 
        isOpen={isModalOpen}
        onStartTour={startTour}
        onSkip={skipTour}
      />

      <OnboardingTour
        isOpen={isTourActive}
        tourStep={tourStep}
        onNext={nextStep}
        onPrevious={previousStep}
        onEnd={endTour}
      />

      <HelpButton onClick={() => setIsHelpOpen(true)} />

      <HelpPanel
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        onResetTour={resetOnboarding}
      />
    </div>
  );
}

export default App;