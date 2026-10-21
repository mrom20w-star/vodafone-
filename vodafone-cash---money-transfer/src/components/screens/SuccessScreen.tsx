import React, { useEffect, useState } from 'react';
import { ArrowLeft, Share2, Check, Copy, Download, MessageSquareShare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TransferData } from '../../types';
import { SuccessScallopCheck, VodafoneCashBadge } from '../VodafoneLogo';
import { playKeypadClick, playSuccessChime } from '../../utils/sound';

interface SuccessScreenProps {
  data: TransferData;
  lang: 'en' | 'ar';
  isMuted: boolean;
  onDone: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  data,
  lang,
  isMuted,
  onDone,
}) => {
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const t = {
    title: lang === 'en' ? 'Success' : 'نجاح',
    completed: lang === 'en' ? 'Transfer completed successfully' : 'تم التحويل بنجاح',
    transferAmountSubtitle: lang === 'en' ? 'Transfer amount' : 'مبلغ التحويل',
    currency: lang === 'en' ? 'EGP' : 'جنيه',
    from: lang === 'en' ? 'From' : 'من',
    to: lang === 'en' ? 'To' : 'إلى',
    fees: lang === 'en' ? 'Fees' : 'الرسوم',
    totalAmountDue: lang === 'en' ? 'Total amount due' : 'إجمالي المبلغ المطلوب',
    operationDate: lang === 'en' ? 'Operation date' : 'تاريخ العملية',
    operationId: lang === 'en' ? 'Operation ID' : 'رقم العملية',
    done: lang === 'en' ? 'DONE' : 'تم',
    share: lang === 'en' ? 'SHARE' : 'مشاركة',
    shareReceipt: lang === 'en' ? 'Share Transfer Receipt' : 'مشاركة إيصال التحويل',
    copySummary: lang === 'en' ? 'Copy text summary' : 'نسخ ملخص التحويل',
    copiedMsg: lang === 'en' ? 'Copied to clipboard!' : 'تم النسخ للحافظة!',
    whatsappShare: lang === 'en' ? 'Share via WhatsApp' : 'إرسال عبر واتساب',
    close: lang === 'en' ? 'Close' : 'إغلاق',
    greetingAttached: lang === 'en' ? 'Greeting Card Included' : 'مرفق كارت إهداء',
  };

  useEffect(() => {
    // Sound fanfare
    if (!isMuted) {
      playSuccessChime();
    }

    // Confetti celebration
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#E60000', '#10B981', '#007A87', '#FFD700'],
      });
    } catch {
      // ignore
    }
  }, [isMuted]);

  const receiptSummaryText = `
Vodafone Cash - Transfer Receipt
-----------------------------
Amount: ${data.amount.toLocaleString()} EGP
To: ${data.toNumber} (${data.recipientName})
From: ${data.fromNumber}
Fees: ${data.fees} EGP
Total: ${data.totalAmount.toLocaleString()} EGP
Date: ${data.operationDate}
Operation ID: ${data.operationId}
Status: Completed Successfully
-----------------------------
`.trim();

  const handleCopyReceipt = () => {
    navigator.clipboard.writeText(receiptSummaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const encoded = encodeURIComponent(receiptSummaryText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#F8F8FA] min-h-[640px]">
      <div>
        {/* Top Header Bar (Matching video 00:18) */}
        <div className="bg-black text-white px-4 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (!isMuted) playKeypadClick();
                onDone();
              }}
              className="p-1 hover:bg-neutral-800 rounded-full transition-colors active:scale-95"
              title="Done"
            >
              <ArrowLeft className="w-5 h-5 text-white rtl:rotate-180" />
            </button>
            <h1 className="text-lg font-bold tracking-normal">{t.title}</h1>
          </div>
        </div>

        <div className="p-4 space-y-3.5">
          {/* Green Rosette Badge & Status (Matching video 00:18 - 00:20) */}
          <div className="flex flex-col items-center justify-center pt-2 pb-1">
            <SuccessScallopCheck className="w-18 h-18 mb-3" />

            <h2 className="text-sm sm:text-base font-semibold text-gray-700 tracking-tight text-center mb-1">
              {t.completed}
            </h2>

            {/* Big Dark Teal Amount */}
            <div className="inline-flex items-baseline justify-center gap-1.5 mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#007A87] tracking-tight">
                {data.amount.toLocaleString()}
              </span>
              <span className="text-lg font-bold text-gray-800">{t.currency}</span>
            </div>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              {t.transferAmountSubtitle}
            </p>
          </div>

          {/* Details Card (Matching video 00:18 - 00:20) */}
          <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs divide-y divide-gray-100 overflow-hidden text-xs">
            {/* From Row */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-400 w-12">{t.from}</span>
                <span className="font-bold text-gray-900 font-mono tracking-wide text-sm">
                  {data.fromNumber}
                </span>
              </div>
              <VodafoneCashBadge />
            </div>

            {/* To Row */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-start gap-4">
                <span className="font-semibold text-gray-400 w-12 pt-0.5">{t.to}</span>
                <div>
                  <span className="font-bold text-gray-900 font-mono tracking-wide text-sm block">
                    {data.toNumber}
                  </span>
                  <span className="text-xs text-gray-400 font-medium block mt-0.5">
                    {data.recipientName}
                  </span>
                </div>
              </div>
              <VodafoneCashBadge />
            </div>

            {/* Fees */}
            <div className="p-3 flex items-center justify-between">
              <span className="font-semibold text-gray-400">{t.fees}</span>
              <span className="font-bold text-gray-900">
                {data.fees} {t.currency}
              </span>
            </div>

            {/* Total Amount Due */}
            <div className="p-3.5 flex items-center justify-between bg-gray-50/50">
              <span className="font-bold text-gray-900 text-sm">{t.totalAmountDue}</span>
              <span className="font-extrabold text-gray-900 text-sm">
                {data.totalAmount.toLocaleString()} {t.currency}
              </span>
            </div>

            {/* Operation Date */}
            <div className="p-3 flex items-center justify-between">
              <span className="font-medium text-gray-400">{t.operationDate}</span>
              <span className="font-semibold text-gray-800 text-right rtl:text-left">
                {data.operationDate}
              </span>
            </div>

            {/* Operation ID */}
            <div className="p-3 flex items-center justify-between">
              <span className="font-medium text-gray-400">{t.operationId}</span>
              <span className="font-mono font-bold text-gray-800 tracking-wider">
                {data.operationId}
              </span>
            </div>
          </div>

          {/* If Greeting card was attached */}
          {data.greetingCard?.enabled && (
            <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-rose-700">
                <span>🎁</span>
                <span>{t.greetingAttached}</span>
              </div>
              <p className="text-gray-700 italic">"{data.greetingCard.message}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sticky Action Buttons: DONE & SHARE (Matching video 00:18 - 00:20) */}
      <div className="p-4 bg-white border-t border-gray-100 sticky bottom-0 z-10 shadow-lg flex items-center gap-3">
        {/* DONE button */}
        <button
          type="button"
          onClick={() => {
            if (!isMuted) playKeypadClick();
            onDone();
          }}
          className="flex-1 py-3 bg-white hover:bg-gray-50 active:scale-[0.99] border-2 border-gray-300 text-gray-800 font-bold rounded-lg text-sm transition-all text-center uppercase tracking-wider"
        >
          {t.done}
        </button>

        {/* SHARE button */}
        <button
          type="button"
          onClick={() => {
            if (!isMuted) playKeypadClick();
            setShowShareModal(true);
          }}
          className="flex-1 py-3 bg-[#E60000] hover:bg-[#cc0000] active:scale-[0.99] text-white font-bold rounded-lg text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-red-600/20 uppercase tracking-wider"
        >
          <Share2 className="w-4 h-4" />
          <span>{t.share}</span>
        </button>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
          <div className="bg-white w-full max-w-sm rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-gray-900 text-base">{t.shareReceipt}</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-full"
              >
                ✕
              </button>
            </div>

            {/* Quick Receipt Summary Card Preview */}
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 text-xs space-y-1 font-mono">
              <div className="flex justify-between text-gray-500 font-sans">
                <span>Vodafone Cash</span>
                <span>{data.operationDate}</span>
              </div>
              <div className="text-base font-bold text-gray-900 font-sans">
                {data.amount.toLocaleString()} EGP
              </div>
              <div className="text-gray-600">To: {data.toNumber}</div>
              <div className="text-gray-500 text-[10px]">ID: {data.operationId}</div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2">
              <button
                onClick={handleCopyReceipt}
                className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-semibold text-gray-800 flex items-center justify-center gap-2 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? t.copiedMsg : t.copySummary}</span>
              </button>

              <button
                onClick={handleShareWhatsApp}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <MessageSquareShare className="w-4 h-4" />
                <span>{t.whatsappShare}</span>
              </button>
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="w-full py-2 text-gray-500 hover:text-gray-800 text-xs font-medium"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
