import React, { useState, useEffect } from 'react';
import LandingScene, { SceneMode } from './components/LandingScene';
import ArtPortfolio from './components/ArtPortfolio';
//import ProfessionalPortfolio from './components/ProfessionalPortfolio';
import CustomCursor from './components/CustomCursor';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<SceneMode>('index');

  // Lock/unlock body scroll based on current view
  useEffect(() => {
    if (currentView === 'index') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [currentView]);

  const navigateTo = (view: SceneMode) => {
    window.scrollTo(0, 0);
    setCurrentView(view);
  };

  return (
    <main 
      className={`relative w-full transition-colors duration-700 font-sans bg-black text-black
        ${currentView === 'index' ? 'h-screen h-[100dvh] overflow-hidden' : 'min-h-screen'}`}
    >
      {/* Custom Cursor */}
      <CustomCursor showOutline={currentView === 'index'} />

      {/* Background Video Layer */}
      <LandingScene sceneMode={currentView} />

      {/* DYNAMIC LOGO */}
      <div className="fixed top-0 right-0 z-50 pointer-events-none p-6 md:p-12 
                      w-[40vw] h-[20vh] md:w-[25vw] md:h-[25vh] lg:w-[20vw]">
        <img
          src={`${import.meta.env.BASE_URL}cedriclogo.png`}
          alt="Rafael Cedric"
          className="w-full h-full object-contain object-right-top transition-opacity duration-1000"
        />
      </div>

      {/* Index View */}
      {currentView === 'index' && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center animate-in fade-in duration-1000">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-[20vh]">
            
            <button
              onClick={() => navigateTo('art')}
              className="group relative w-64 h-20 rounded-full flex items-center justify-center 
                         bg-white/10 border border-white/30 backdrop-blur-md
                         transition-all duration-500 hover:scale-105 active:scale-95
                         hover:border-white/60 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              {/* Single solid color text */}
              <span className="relative z-10 font-bold text-lg tracking-widest uppercase text-black transition-all duration-300">
                Art Gallery
              </span>

              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/5 pointer-events-none" />
            </button>

          </div>
        </div>
      )}

      {/* Art Portfolio View */}
      {currentView === 'art' && (
        <div className="relative z-20 animate-in fade-in duration-700">
          <ArtPortfolio
            onBack={() => navigateTo('index')}
            onHoverChange={() => { }}
          />
        </div>
      )}


    </main>
  );
};

export default App;