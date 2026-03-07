import { useState, useEffect } from 'react';

export const useOnboarding = (user, userData) => {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Cargar estado de localStorage
  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`onboarding_${user.uid}`);
      if (stored === 'completed') {
        setHasSeenOnboarding(true);
      } else if (!hasSeenOnboarding) {
        // Mostrar modal a nuevos usuarios
        setIsModalOpen(true);
      }
    }
  }, [user]);

  const startTour = () => {
    setIsModalOpen(false);
    setIsTourActive(true);
    setTourStep(0);
  };

  const skipTour = () => {
    setIsModalOpen(false);
    completeOnboarding();
  };

  const nextStep = () => {
    setTourStep(prev => prev + 1);
  };

  const previousStep = () => {
    setTourStep(prev => Math.max(0, prev - 1));
  };

  const endTour = () => {
    setIsTourActive(false);
    completeOnboarding();
  };

  const completeOnboarding = () => {
    if (user) {
      localStorage.setItem(`onboarding_${user.uid}`, 'completed');
      setHasSeenOnboarding(true);
    }
  };

  const resetOnboarding = () => {
    if (user) {
      localStorage.removeItem(`onboarding_${user.uid}`);
      setHasSeenOnboarding(false);
      setIsModalOpen(true);
    }
  };

  return {
    hasSeenOnboarding,
    isModalOpen,
    setIsModalOpen,
    isTourActive,
    setIsTourActive,
    tourStep,
    setTourStep,
    startTour,
    skipTour,
    nextStep,
    previousStep,
    endTour,
    completeOnboarding,
    resetOnboarding,
    isHelpOpen,
    setIsHelpOpen
  };
};
