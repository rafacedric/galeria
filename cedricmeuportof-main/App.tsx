import React, { useEffect } from 'react';
import ArtPortfolio from './components/ArtPortfolio';
import CustomCursor from './components/CustomCursor';

const App: React.FC = () => {
  useEffect(() => {
    document.body.style.overflow = 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-black text-black font-sans">
      <CustomCursor showOutline={false} />

      {/* Top-right logo */}
      <div className="fixed top-0 right-0 z-50 pointer-events-none p-6 md:p-12 w-[40vw] h-[20vh] md:w-[25vw] md:h-[25vh] lg:w-[20vw]">
        <img
          src={`${import.meta.env.BASE_URL}cedriclogo.png`}
          alt="Rafael Cedric"
          className="w-full h-full object-contain object-right-top transition-opacity duration-1000"
        />
      </div>

      <ArtPortfolio onBack={() => {}} onHoverChange={() => {}} />
    </main>
  );
};

export default App;