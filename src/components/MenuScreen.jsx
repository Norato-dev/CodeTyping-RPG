import React from 'react';
import MissionGrid from './MissionGrid';

const MenuScreen = ({ 
  challenges, 
  myCustomChallenges, 
  userData, 
  onStartChallenge, 
  themes 
}) => {
  return (
    <div className="space-y-20">
      <section>
        <div className="border-l-4 border-green-500 pl-6 mb-8">
          <h2 className="text-4xl font-black uppercase italic">
            Misiones <span className="text-green-500">Base</span>
          </h2>
        </div>
        <MissionGrid 
          challenges={challenges} 
          onStart={onStartChallenge} 
          completedLevels={userData?.completedLevels || []} 
          themes={themes} 
        />
      </section>

      {myCustomChallenges.length > 0 && (
        <section>
          <div className="border-l-4 border-pink-600 pl-6 mb-8">
            <h2 className="text-4xl font-black uppercase italic text-pink-500">
              Mis Inyecciones
            </h2>
          </div>
          <MissionGrid 
            challenges={myCustomChallenges} 
            onStart={onStartChallenge} 
            completedLevels={userData?.completedLevels || []} 
            themes={themes} 
          />
        </section>
      )}
    </div>
  );
};

export default MenuScreen;
