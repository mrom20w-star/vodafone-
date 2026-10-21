import React from 'react';

/**
 * Authentic Vodafone Brand Speechmark Logo
 */
export const VodafoneIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-6 h-6',
  color = '#E60000',
}) => {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="48" fill={color} />
      {/* Vodafone Speechmark mark */}
      <path
        d="M50 20C33.4315 20 20 33.4315 20 50C20 63.8562 29.3562 75.5255 42.1484 78.8929C40.7634 76.2415 40 73.2104 40 70C40 58.9543 48.9543 50 60 50C63.2104 50 66.2415 50.7634 68.8929 52.1484C65.5255 39.3562 53.8562 20 50 20Z"
        fill="white"
      />
      <circle cx="60" cy="70" r="10" fill="white" />
    </svg>
  );
};

/**
 * Vodafone Cash Badge (seen in Confirm screen next to phone numbers)
 */
export const VodafoneCashBadge: React.FC<{ className?: string }> = ({ className = 'h-7' }) => {
  return (
    <div className={`inline-flex items-center gap-1 bg-[#E60000] text-white px-2 py-0.5 rounded text-[11px] font-bold shadow-xs select-none ${className}`}>
      <svg viewBox="0 0 100 100" className="w-4 h-4 fill-white">
        <circle cx="50" cy="50" r="48" fill="white" />
        <path
          d="M50 20C33.4315 20 20 33.4315 20 50C20 63.8562 29.3562 75.5255 42.1484 78.8929C40.7634 76.2415 40 73.2104 40 70C40 58.9543 48.9543 50 60 50C63.2104 50 66.2415 50.7634 68.8929 52.1484C65.5255 39.3562 53.8562 20 50 20Z"
          fill="#E60000"
        />
        <circle cx="60" cy="70" r="10" fill="#E60000" />
      </svg>
      <span className="tracking-tight text-[10px] leading-tight flex flex-col font-black">
        <span className="leading-none">vodafone</span>
        <span className="text-[9px] -mt-0.5 font-bold text-amber-200">cash</span>
      </span>
    </div>
  );
};

/**
 * Vodafone Spinner Loader Overlay (seen in video: 00:06-00:08 and 00:13-00:17)
 */
export const VodafoneLoader: React.FC<{ message?: string; subMessage?: string }> = ({
  message = 'Loading...',
  subMessage,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity duration-300">
      <div className="flex flex-col items-center p-6 rounded-2xl">
        {/* Animated Spiral Arc around Vodafone Logo */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="url(#spinnerGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="180"
              strokeDashoffset="60"
            />
          </svg>
          
          {/* Centered Speechmark in loader */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-12 h-12">
              <path
                d="M50 22C34.5 22 22 34.5 22 50C22 62.9 30.7 73.8 42.6 77C41.3 74.5 40.5 71.7 40.5 68.7C40.5 58.4 48.8 50.1 59.1 50.1C62.1 50.1 64.9 50.8 67.4 52.1C64.4 40.2 53.6 22 50 22Z"
                fill="white"
              />
              <circle cx="59.5" cy="68.7" r="9.3" fill="white" />
            </svg>
          </div>
        </div>

        {/* Loading text as in video */}
        <div className="mt-4 text-center">
          <p className="text-white text-base font-semibold tracking-wide drop-shadow-md">
            {message}
          </p>
          {subMessage && (
            <p className="text-white/80 text-xs mt-1 animate-pulse">{subMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Green Scalloped Badge with White Checkmark (as in Success screen 00:18)
 */
export const SuccessScallopCheck: React.FC<{ className?: string }> = ({ className = 'w-20 h-20' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Scalloped rosette background */}
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <path
          d="M50 0 
             C54 0, 58 4, 62 7 
             C66 10, 71 11, 75 16 
             C79 21, 81 27, 84 33 
             C87 39, 91 44, 91 50 
             C91 56, 87 61, 84 67 
             C81 73, 79 79, 75 84 
             C71 89, 66 90, 62 93 
             C58 96, 54 100, 50 100 
             C46 100, 42 96, 38 93 
             C34 90, 29 89, 25 84 
             C21 79, 19 73, 16 67 
             C13 61, 9 56, 9 50 
             C9 44, 13 39, 16 33 
             C19 27, 21 21, 25 16 
             C29 11, 34 10, 38 7 
             C42 4, 46 0, 50 0 Z"
          fill="#10B981"
        />
        {/* White Checkmark */}
        <path
          d="M34 50 L44 60 L66 38"
          fill="none"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

/**
 * Phone graphic for PIN screen header
 */
export const PinHeaderIllustration: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Smartphone silhouette */}
      <div className="w-10 h-14 border-2 border-red-500 rounded-lg p-0.5 flex flex-col items-center justify-between bg-white shadow-xs">
        <div className="w-2.5 h-0.5 bg-gray-300 rounded-full mt-0.5"></div>
        {/* Screen with card symbol */}
        <div className="w-full flex-1 mx-0.5 my-1 bg-red-50 rounded-xs flex flex-col items-center justify-center">
          <div className="w-6 h-4 bg-red-600 rounded-xs flex items-center justify-center text-[7px] text-white font-bold">
            CASH
          </div>
        </div>
        <div className="w-1.5 h-1.5 rounded-full border border-gray-300 mb-0.5"></div>
      </div>
      {/* Floating badge */}
      <div className="absolute -bottom-1 -right-1 bg-red-600 text-[8px] font-black text-white px-1 py-0.5 rounded shadow-xs">
        كاش
      </div>
    </div>
  );
};
