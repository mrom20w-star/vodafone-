import React, { useState } from 'react';
import { ArrowLeft, Gift, Sparkles } from 'lucide-react';
import { TransferData } from '../../types';
import { VodafoneCashBadge } from '../VodafoneLogo';
import { playKeypadClick } from '../../utils/sound';

interface ConfirmScreenProps {
  data: TransferData;
  lang: 'en' | 'ar';
  isMuted: boolean;
  onBack: () => void;
  onConfirm: (greetingCard?: { enabled: boolean; template: string; message: string }) => void;
}

const GREETING_TEMPLATES = [
  { id: 'gift', title: 'هدية خاصة 🎁', titleEn: 'Special Gift 🎁', defaultMsg: 'ألف مبروك وبالتوفيق دائماً!' },
  { id: 'thanks', title: 'شكراً جزيلاً 🙏', titleEn: 'Thank You 🙏', defaultMsg: 'شكراً جزيلاً على مجهودك الكريم' },
  { id: 'birthday', title: 'عيد ميلاد سعيد 🎂', titleEn: 'Happy Birthday 🎂', defaultMsg: 'كل سنة وانت طيب وعقبال 100 سنة!' },
  { id: 'eid', title: 'كل عام وأنتم بخير 🌙', titleEn: 'Eid Mubarak 🌙', defaultMsg: 'تقبل الله منا ومنكم صالح الأعمال' },
];

export const ConfirmScreen: React.FC<ConfirmScreenProps> = ({
  data,
  lang,
  isMuted,
  onBack,
  onConfirm,
}) => {
  const [greetingCardEnabled, setGreetingCardEnabled] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('gift');
  const [customGreetingMessage, setCustomGreetingMessage] = useState<string>('');

  const t = {
    title: lang === 'en' ? 'Confirm' : 'تأكيد',
    transferAmountSubtitle: lang === 'en' ? 'Transfer amount' : 'مبلغ التحويل',
    currency: lang === 'en' ? 'EGP' : 'جنيه',
    from: lang === 'en' ? 'From' : 'من',
    to: lang === 'en' ? 'To' : 'إلى',
    fees: lang === 'en' ? 'Fees' : 'الرسوم',
    totalAmountDue: lang === 'en' ? 'Total amount due' : 'إجمالي المبلغ المطلوب',
    addGreetingCard: lang === 'en' ? 'Add greeting card?' : 'إضافة كارت معايدة؟',
    greetingNote: lang === 'en' ? 'Attach a lovely message' : 'أرفق رسالة لطيفة مع التحويل',
    disclaimer1: lang === 'en' ? '* Vodafone Cash users only.' : '* لعملاء فودافون كاش فقط.',
    disclaimer2:
      lang === 'en'
        ? "Make sure you enter the correct number. In case of a wrong transfer, we won't be able to refund the amount."
        : 'يرجى التأكد من كتابة الرقم الصحيح. في حالة التحويل الخاطئ لن نتمكن من استرداد المبلغ.',
    confirmBtn: lang === 'en' ? 'Confirm' : 'تأكيد',
  };

  const handleToggleGreeting = () => {
    if (!isMuted) playKeypadClick();
    setGreetingCardEnabled(!greetingCardEnabled);
  };

  const handleProceed = () => {
    if (!isMuted) playKeypadClick();
    onConfirm(
      greetingCardEnabled
        ? {
            enabled: true,
            template: selectedTemplate,
            message:
              customGreetingMessage ||
              GREETING_TEMPLATES.find((g) => g.id === selectedTemplate)?.defaultMsg ||
              'Best wishes!',
          }
        : undefined
    );
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#F8F8FA] min-h-[640px]">
      <div>
        {/* Top Header Bar (Matching video 00:09) */}
        <div className="bg-black text-white px-4 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (!isMuted) playKeypadClick();
                onBack();
              }}
              className="p-1 hover:bg-neutral-800 rounded-full transition-colors active:scale-95"
              title="Back"
            >
              <ArrowLeft className="w-5 h-5 text-white rtl:rotate-180" />
            </button>
            <h1 className="text-lg font-bold tracking-normal">{t.title}</h1>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Top Amount Banner (Matching video 00:09) */}
          <div className="text-center pt-2 pb-1">
            <div className="inline-flex items-baseline justify-center gap-1.5">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#007A87] tracking-tight">
                {data.amount.toLocaleString()}
              </span>
              <span className="text-lg font-bold text-gray-800">{t.currency}</span>
            </div>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              {t.transferAmountSubtitle}
            </p>
          </div>

          {/* Details Card with rows and Vodafone Cash badge */}
          <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs divide-y divide-gray-100 overflow-hidden">
            {/* From Row */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-gray-400 w-12">{t.from}</span>
                <span className="text-sm font-bold text-gray-900 font-mono tracking-wide">
                  {data.fromNumber}
                </span>
              </div>
              <VodafoneCashBadge />
            </div>

            {/* To Row */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-start gap-4">
                <span className="text-xs font-semibold text-gray-400 w-12 pt-0.5">{t.to}</span>
                <div>
                  <span className="text-sm font-bold text-gray-900 font-mono tracking-wide block">
                    {data.toNumber}
                  </span>
                  <span className="text-xs text-gray-400 font-medium block mt-0.5">
                    {data.recipientName}
                  </span>
                </div>
              </div>
              <VodafoneCashBadge />
            </div>

            {/* Fees Row */}
            <div className="p-3.5 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400">{t.fees}</span>
              <span className="text-sm font-bold text-gray-900">
                {data.fees} {t.currency}
              </span>
            </div>

            {/* Total amount due Row */}
            <div className="p-3.5 flex items-center justify-between bg-gray-50/50">
              <span className="text-sm font-bold text-gray-900">{t.totalAmountDue}</span>
              <span className="text-sm font-extrabold text-gray-900">
                {data.totalAmount.toLocaleString()} {t.currency}
              </span>
            </div>
          </div>

          {/* Greeting Card Toggle (Matching video 00:09) */}
          <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Gift className="w-4 h-4 text-rose-500" />
                <span className="text-sm font-semibold text-gray-800">{t.addGreetingCard}</span>
              </div>

              {/* iOS/Android style toggle switch */}
              <button
                type="button"
                onClick={handleToggleGreeting}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  greetingCardEnabled ? 'bg-red-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    greetingCardEnabled
                      ? lang === 'ar'
                        ? '-translate-x-5'
                        : 'translate-x-5'
                      : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Expanded Greeting Card options when enabled */}
            {greetingCardEnabled && (
              <div className="mt-3 pt-3 border-t border-gray-100 space-y-3 animate-fade-in">
                <div className="grid grid-cols-2 gap-2">
                  {GREETING_TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      type="button"
                      onClick={() => {
                        if (!isMuted) playKeypadClick();
                        setSelectedTemplate(tmpl.id);
                      }}
                      className={`p-2 rounded-lg text-xs font-semibold border transition-all text-left rtl:text-right ${
                        selectedTemplate === tmpl.id
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{lang === 'ar' ? tmpl.title : tmpl.titleEn}</span>
                        {selectedTemplate === tmpl.id && <Sparkles className="w-3 h-3 text-red-500" />}
                      </div>
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder={
                    lang === 'ar' ? 'اكتب رسالة خاصة (اختياري)...' : 'Write personal message (optional)...'
                  }
                  value={customGreetingMessage}
                  onChange={(e) => setCustomGreetingMessage(e.target.value)}
                  className="w-full text-xs p-2 bg-gray-50 border border-gray-200 rounded-lg outline-hidden focus:border-red-500"
                />
              </div>
            )}
          </div>

          {/* Vodafone Disclaimer Note (Matching video 00:09 - 00:10) */}
          <div className="px-1 py-1 text-gray-500 text-xs leading-relaxed space-y-1">
            <p className="font-semibold text-gray-700">{t.disclaimer1}</p>
            <p className="text-[11px] text-gray-500">{t.disclaimer2}</p>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Area (Matching video 00:10) */}
      <div className="p-4 bg-white border-t border-gray-100 sticky bottom-0 z-10 shadow-lg">
        <button
          type="button"
          onClick={handleProceed}
          className="w-full py-3.5 bg-[#E60000] hover:bg-[#cc0000] active:scale-[0.99] text-white font-bold rounded-lg text-base transition-all shadow-md shadow-red-600/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{t.confirmBtn}</span>
        </button>
      </div>
    </div>
  );
};
