import React from 'react';
import { Wifi, Battery, Volume2, VolumeX, Smartphone, Monitor, Globe } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  isSimulator: boolean;
  onToggleSimulator: () => void;
  lang: 'en' | 'ar';
  onToggleLang: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onBottomNavBack?: () => void;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  isSimulator,
  onToggleSimulator,
  lang,
  onToggleLang,
  isMuted,
  onToggleMute,
  onBottomNavBack,
}) => {
  // Format current or fixed realistic time like the video: 2:49
  const now = new Date();
  const timeStr = `${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-start p-0 sm:py-6 sm:px-4 font-sans selection:bg-red-600 selection:text-white">
      {/* Top Floating Control Bar */}
      <header className="w-full max-w-md mb-2 px-3 py-1.5 flex items-center justify-between text-xs text-slate-300 bg-slate-800/80 backdrop-blur-md rounded-full shadow-lg border border-slate-700/60 z-30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-white tracking-wide">
            Vodafone Cash <span className="text-red-400 font-bold">Simulator</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            className="p-1.5 hover:bg-slate-700 rounded-full transition-colors text-slate-300 hover:text-white"
            title={isMuted ? 'Unmute sound' : 'Mute sound'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1 px-2 py-1 hover:bg-slate-700 rounded-full transition-colors text-slate-300 hover:text-white font-medium"
            title="Toggle Language"
          >
            <Globe className="w-3 h-3 text-cyan-400" />
            <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
          </button>

          {/* Simulator Frame Toggle */}
          <button
            onClick={onToggleSimulator}
            className="flex items-center gap-1 px-2 py-1 bg-slate-700/80 hover:bg-slate-600 rounded-full transition-colors text-slate-200"
            title={isSimulator ? 'Fit Fullscreen' : 'Show Phone Frame'}
          >
            {isSimulator ? <Smartphone className="w-3 h-3 text-red-400" /> : <Monitor className="w-3 h-3 text-cyan-400" />}
            <span className="hidden sm:inline text-[11px]">{isSimulator ? 'Phone Frame' : 'Full Width'}</span>
          </button>
        </div>
      </header>

      {/* Main Container / Phone Mockup */}
      <div
        className={`w-full transition-all duration-300 relative ${
          isSimulator
            ? 'max-w-[420px] bg-black sm:rounded-[44px] sm:shadow-2xl sm:ring-8 sm:ring-slate-800 sm:border-4 sm:border-slate-700 overflow-hidden min-h-[780px]'
            : 'max-w-md bg-white min-h-screen shadow-md'
        } flex flex-col`}
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        {/* Realistic Android Status Bar (matching video 00:00 - 00:20) */}
        <div className="bg-black text-white px-4 pt-2.5 pb-1.5 flex items-center justify-between text-xs select-none z-20">
          <div className="flex items-center gap-2">
            <span className="font-medium tracking-tight text-[11px] text-gray-200">Vodafone EG</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-80"></div>
          </div>

          <div className="flex items-center gap-1.5 text-gray-200 text-[11px] font-medium">
            <Wifi className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold">4G</span>
            <span className="text-[10px]">40%</span>
            <Battery className="w-3.5 h-3.5 fill-current" />
            <span className="ml-1 tracking-wider font-semibold">{timeStr}</span>
          </div>
        </div>

        {/* Dynamic App Content Body */}
        <div className="flex-1 bg-[#F7F7F8] flex flex-col relative overflow-y-auto">
          {children}
        </div>

        {/* Android Virtual Bottom Navigation Bar (as seen in frames 00:00 - 00:20) */}
        {isSimulator && (
          <nav aria-label="System navigation" className="bg-black py-2.5 px-10 flex items-center justify-between text-gray-400 select-none z-20 border-t border-zinc-900">
            {/* Back (Triangle pointing left or right depending on RTL) */}
            <button
              onClick={onBottomNavBack}
              className="p-2 hover:text-white transition-colors active:scale-90"
              title="Back"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <polygon points="17,5 7,12 17,19" />
              </svg>
            </button>
            {/* Home (Circle) */}
            <button
              onClick={onBottomNavBack}
              className="p-2 hover:text-white transition-colors active:scale-90"
              title="Home"
            >
              <div className="w-3.5 h-3.5 rounded-full border-2 border-current"></div>
            </button>
            {/* Recent Apps (Square) */}
            <button
              className="p-2 hover:text-white transition-colors active:scale-90"
              title="Recent Apps"
            >
              <div className="w-3.5 h-3.5 border-2 border-current rounded-xs"></div>
            </button>
          </nav>
        )}
      </div>
    </div>
  );
};
