import React, { useState, useEffect } from 'react';
import LandingScene, { SceneMode } from './components/LandingScene';
import ArtPortfolio from './components/ArtPortfolio';
//import ProfessionalPortfolio from './components/ProfessionalPortfolio';
import CustomCursor from './components/CustomCursor';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<SceneMode>('index');
<<<<<<< HEAD
=======
  const [isVertical, setIsVertical] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isButtonPretendHovered, setIsButtonPretendHovered] = useState(false);
  const [button1Bounds, setButton1Bounds] = useState<ButtonBounds>({ x: 0, y: 0, w: 0, h: 0 });
  const [button2Bounds, setButton2Bounds] = useState<ButtonBounds>({ x: 0, y: 0, w: 0, h: 0 });
>>>>>>> 822f4ab (Fix button and and page name)

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

<<<<<<< HEAD
=======
  // Track Button Positions for Shader Masking
  useEffect(() => {
    const updateBounds = () => {
      if (btn1Ref.current) {
        const rect1 = btn1Ref.current.getBoundingClientRect();
        setButton1Bounds({
          x: (rect1.left + rect1.width / 2) / window.innerWidth,
          y: (rect1.top + rect1.height / 2) / window.innerHeight,
          w: (rect1.width / 2) / window.innerWidth,
          h: (rect1.height / 2) / window.innerHeight
        });
      }
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);
    const timer = setTimeout(updateBounds, 100);
    return () => {
      window.removeEventListener('resize', updateBounds);
      clearTimeout(timer);
    }
  }, [currentView]);

  // Idle hover animation for the main button
  useEffect(() => {
    if (currentView !== 'index') {
      setIsButtonPretendHovered(false);
      return;
    }

    const interval = window.setInterval(() => {
      setIsButtonPretendHovered((value) => (isButtonHovered ? false : !value));
    }, 900);

    return () => window.clearInterval(interval);
  }, [currentView, isButtonHovered]);

>>>>>>> 822f4ab (Fix button and and page name)
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
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              className="group relative w-64 h-20 rounded-full flex items-center justify-center 
                         bg-white/10 border border-white/30 backdrop-blur-md
                         transition-all duration-500 hover:scale-105 active:scale-95
                         hover:border-white/60 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
<<<<<<< HEAD
              {/* Single solid color text */}
              <span className="relative z-10 font-bold text-lg tracking-widest uppercase text-black transition-all duration-300">
                Art Gallery
=======
              {/* Conditional text color: Full black on vertical, gradient on desktop */}
              <span className={`relative z-10 font-bold text-lg tracking-widest uppercase transition-all duration-300
                ${isVertical 
                  ? 'text-black' 
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-700 to-gray-700 group-hover:from-black group-hover:to-black'
                }`}
              style={{
                opacity: isButtonHovered || isButtonPretendHovered ? 1 : 0.9,
                transform: isButtonHovered || isButtonPretendHovered ? 'scale(1.02)' : 'scale(1)'
              }}
              >
                See works
>>>>>>> 822f4ab (Fix button and and page name)
              </span>

              <div className={`absolute inset-0 rounded-full transition-all duration-500 pointer-events-none ${isButtonHovered || isButtonPretendHovered ? 'opacity-100 bg-white/10' : 'opacity-0 bg-white/5'}`} />
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