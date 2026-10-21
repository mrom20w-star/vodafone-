import React, { useState, useEffect } from 'react';
import { ArrowLeft, Delete, KeyRound, X } from 'lucide-react';
import { PinHeaderIllustration } from '../VodafoneLogo';
import { playKeypadClick } from '../../utils/sound';

interface PinScreenProps {
  lang: 'en' | 'ar';
  isMuted: boolean;
  onBack: () => void;
  onPinComplete: (pin: string) => void;
}

export const PinScreen: React.FC<PinScreenProps> = ({
  lang,
  isMuted,
  onBack,
  onPinComplete,
}) => {
  const [pin, setPin] = useState<string>('');
  const [showForgotModal, setShowForgotModal] = useState<boolean>(false);

  const t = {
    title: lang === 'en' ? 'Type your PIN code' : 'اكتب الرقم السري',
    forgotPin: lang === 'en' ? 'Forgot PIN?' : 'نسيت الرقم السري؟',
    forgotModalTitle: lang === 'en' ? 'Reset Vodafone Cash PIN' : 'إعادة تعيين الرقم السري',
    forgotModalBody:
      lang === 'en'
        ? 'Dial *9*12# from your Vodafone line and enter your National ID number to create a new 6-digit PIN code.'
        : 'اطلب الكود #12*9* من خط فودافون الخاص بك وادخل الرقم القومي لإنشاء رقم سري جديد مكون من 6 أرقام.',
    testHint:
      lang === 'en'
        ? 'Tip: Enter any 6 digits (e.g. 1 2 3 4 5 6)'
        : 'تلميح: ادخل أي 6 أرقام (مثال: 1 2 3 4 5 6)',
    close: lang === 'en' ? 'Close' : 'إغلاق',
  };

  const handleDigit = (digit: string) => {
    if (!isMuted) playKeypadClick();
    if (pin.length < 6) {
      const nextPin = pin + digit;
      setPin(nextPin);
      if (nextPin.length === 6) {
        // Automatically complete
        setTimeout(() => {
          onPinComplete(nextPin);
        }, 150);
      }
    }
  };

  const handleBackspace = () => {
    if (!isMuted) playKeypadClick();
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
    }
  };

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) {
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin]);

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#FCFAFD] min-h-[640px] px-6 py-4">
      {/* Top Bar with Back Arrow */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            if (!isMuted) playKeypadClick();
            onBack();
          }}
          className="p-1.5 hover:bg-purple-100/50 rounded-full transition-colors active:scale-95"
          title="Back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-800 rtl:rotate-180" />
        </button>
        <span className="text-xs text-gray-400 font-medium">{t.testHint}</span>
      </div>

      {/* Header Graphic & Title (Matching video 00:11) */}
      <div className="flex flex-col items-center justify-center my-auto pt-2 pb-6">
        <PinHeaderIllustration className="mb-4 scale-110" />

        <h2 className="text-xl font-bold text-gray-900 tracking-tight text-center mb-6">
          {t.title}
        </h2>

        {/* 6 PIN Indicator Dots (matching video 00:11 - 00:12) */}
        <div className="flex items-center justify-center gap-4 mb-4">
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const isFilled = index < pin.length;
            return (
              <div
                key={index}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-200 ${
                  isFilled
                    ? 'bg-[#5B3E6A] scale-115 shadow-xs'
                    : 'bg-[#E5DFEA] border border-transparent'
                }`}
              />
            );
          })}
        </div>

        {/* Forgot PIN Link */}
        <button
          type="button"
          onClick={() => {
            if (!isMuted) playKeypadClick();
            setShowForgotModal(true);
          }}
          className="text-sm font-semibold text-[#D81B60] hover:text-red-700 hover:underline transition-colors mt-2"
        >
          {t.forgotPin}
        </button>
      </div>

      {/* Custom Keypad Grid (Matching video 00:11-00:12) */}
      <div className="max-w-[320px] mx-auto w-full pb-4">
        <div className="grid grid-cols-3 gap-y-4 gap-x-6 place-items-center">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handleDigit(digit)}
              className="w-16 h-16 rounded-full bg-[#F3EFF6] hover:bg-[#E8E1EE] active:bg-[#DCD3E4] active:scale-95 text-2xl font-semibold text-gray-900 flex items-center justify-center transition-all shadow-2xs select-none"
            >
              {digit}
            </button>
          ))}

          {/* Empty spacer on left */}
          <div className="w-16 h-16" />

          {/* 0 digit */}
          <button
            type="button"
            onClick={() => handleDigit('0')}
            className="w-16 h-16 rounded-full bg-[#F3EFF6] hover:bg-[#E8E1EE] active:bg-[#DCD3E4] active:scale-95 text-2xl font-semibold text-gray-900 flex items-center justify-center transition-all shadow-2xs select-none"
          >
            0
          </button>

          {/* Backspace Button with [x] icon */}
          <button
            type="button"
            onClick={handleBackspace}
            className="w-16 h-16 rounded-full hover:bg-gray-200/50 active:scale-95 flex items-center justify-center text-gray-700 transition-all select-none"
            title="Delete"
          >
            <div className="border border-gray-400 rounded-md p-1 flex items-center justify-center">
              <Delete className="w-5 h-5 text-gray-600" />
            </div>
          </button>
        </div>
      </div>

      {/* Forgot PIN Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-xs w-full p-5 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-600">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">{t.forgotModalTitle}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{t.forgotModalBody}</p>
            <div className="bg-gray-100 p-2.5 rounded-lg font-mono text-sm font-bold text-red-600">
              *9*12#
            </div>
            <button
              onClick={() => setShowForgotModal(false)}
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-xs transition-colors"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
