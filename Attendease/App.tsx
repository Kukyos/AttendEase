import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { DynamicBackground } from './components/Background';
import {
  TitleSlide,
  IntroductionSlide,
  ProblemSlide,
  ObjectiveSlide,
  DeviceDesignSlide,
  HardwareBlockSlide,
  WorkflowSlide,
  DatabaseSlide,
  DashboardMockupSlide,
  ImplementationSlide,
  TechStackSlide,
  CodeWalkthroughSlide,
  ResultsSlide,
  ConclusionSlide,
  ReferenceSlide,
  DemoSlide
} from './components/Slides';

const SLIDES = [
  TitleSlide,
  IntroductionSlide,
  ProblemSlide,
  ObjectiveSlide,
  DeviceDesignSlide,
  HardwareBlockSlide,
  WorkflowSlide,
  DatabaseSlide,
  DashboardMockupSlide,
  ImplementationSlide,
  TechStackSlide,
  CodeWalkthroughSlide,
  ResultsSlide,
  ConclusionSlide,
  ReferenceSlide,
  DemoSlide
];

const DEMO_SLIDE_INDEX = SLIDES.length - 1;

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const goToDemo = () => {
    setCurrentSlide(DEMO_SLIDE_INDEX);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const CurrentSlideComponent = SLIDES[currentSlide];

  return (
    <div className="h-screen w-screen bg-black text-white overflow-hidden relative" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Background */}
      <DynamicBackground />

      {/* Try Demo Button — Top Right */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={goToDemo}
        className="absolute top-5 right-5 z-50 flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all duration-200"
        style={{
          background: currentSlide === DEMO_SLIDE_INDEX 
            ? 'rgba(255,255,255,0.15)' 
            : 'rgba(255,255,255,0.06)',
          border: currentSlide === DEMO_SLIDE_INDEX
            ? '1px solid rgba(255,255,255,0.30)'
            : '1px solid rgba(255,255,255,0.12)',
          boxShadow: currentSlide === DEMO_SLIDE_INDEX
            ? '0 0 20px rgba(255,255,255,0.08)'
            : 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(255,255,255,0.08)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = currentSlide === DEMO_SLIDE_INDEX 
            ? 'rgba(255,255,255,0.15)' 
            : 'rgba(255,255,255,0.06)';
          e.currentTarget.style.borderColor = currentSlide === DEMO_SLIDE_INDEX
            ? 'rgba(255,255,255,0.30)'
            : 'rgba(255,255,255,0.12)';
          e.currentTarget.style.boxShadow = currentSlide === DEMO_SLIDE_INDEX
            ? '0 0 20px rgba(255,255,255,0.08)'
            : 'none';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <Play size={12} color="white" fill="white" />
        <span className="text-xs font-medium" style={{ color: '#ffffff' }}>Try Demo</span>
      </motion.button>

      {/* Slide Content */}
      <div className="relative z-10 h-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="h-full w-full"
          >
            <CurrentSlideComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-50 p-5 flex justify-between items-end pointer-events-none">
        <div className="font-mono text-xs pointer-events-auto" style={{ color: 'rgba(255,255,255,0.2)' }}>
          {currentSlide + 1} / {SLIDES.length}
        </div>

        <div className="flex gap-3 pointer-events-auto">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-2.5 rounded-full disabled:opacity-20 transition-all cursor-pointer"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <ChevronLeft size={20} color="white" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === SLIDES.length - 1}
            className="p-2.5 rounded-full disabled:opacity-20 transition-all cursor-pointer"
            style={{
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.25)',
              boxShadow: '0 0 12px rgba(255,255,255,0.08)',
            }}
          >
            <ChevronRight size={20} color="white" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full z-50 progress-bar-track">
        <motion.div
          className="h-full progress-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / SLIDES.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

export default App;
