import React, { useState } from 'react';
import { auth } from './firebase';

import { useAuth } from './hooks/useAuth';
import { useChallenges } from './hooks/useChallenges';
import { useGameLogic } from './hooks/useGameLogic';
import { useAppNavigation } from './hooks/useAppNavigation';
import { useLeaderboard } from './hooks/useLeaderboard';
import { useOnboarding } from './hooks/useOnboarding';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AuthScreen from './components/auth/AuthScreen';
import MenuScreen from './components/screens/MenuScreen';
import PlayScreen from './components/screens/PlayScreen';
import UserDashboard from './components/screens/UserDashboard';
import Leaderboard from './components/screens/Leaderboard';
import CreateChallenge from './components/ui/CreateChallenge';
import ConfirmModal from './components/ui/ConfirmModal';
import OnboardingModal from './components/onboarding/OnboardingModal';
import OnboardingTour from './components/onboarding/OnboardingTour';
import HelpPanel from './components/onboarding/HelpPanel';
import HelpButton from './components/onboarding/HelpButton';

import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [screen, setScreen] = useState('menu');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Hooks personalizados
  const { user, userData, logout } = useAuth();
  const { challenges, myCustomChallenges } = useChallenges(user?.uid);
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