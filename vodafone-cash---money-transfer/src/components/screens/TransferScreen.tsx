import React, { useState } from 'react';
import { ArrowLeft, X, ContactRound, ReceiptText, Delete, History } from 'lucide-react';
import { Contact } from '../../types';
import { playKeypadClick } from '../../utils/sound';

interface TransferScreenProps {
  initialMobile: string;
  initialAmount: number;
  lang: 'en' | 'ar';
  isMuted: boolean;
  onProceed: (mobile: string, amount: number, contactName: string) => void;
  onOpenHistory: () => void;
}

const PRESET_CONTACTS: Contact[] = [
  {
    name: 'Ibrahim Adel',
    maskedName: 'Ibrahim A******* M****',
    phone: '01059656653',
    avatarColor: 'bg-emerald-500',
  },
  {
    name: 'Mohamed Ahmed',
    maskedName: 'Mohamed A**** S****',
    phone: '01062097751',
    avatarColor: 'bg-red-500',
  },
  {
    name: 'Sara Mahmoud',
    maskedName: 'Sara M****** H*****',
    phone: '01198765432',
    avatarColor: 'bg-indigo-500',
  },
  {
    name: 'Tamer Hosny',
    maskedName: 'Tamer H**** F****',
    phone: '01287654321',
    avatarColor: 'bg-amber-500',
  },
  {
    name: 'Nour El-Din',
    maskedName: 'Nour E****** K****',
    phone: '01512345678',
    avatarColor: 'bg-teal-500',
  },
];

export const TransferScreen: React.FC<TransferScreenProps> = ({
  initialMobile,
  initialAmount,
  lang,
  isMuted,
  onProceed,
  onOpenHistory,
}) => {
  const [mobileNumber, setMobileNumber] = useState<string>(initialMobile || '01059656653');
  const [amount, setAmount] = useState<number>(initialAmount || 29010);
  const [showContactsModal, setShowContactsModal] = useState<boolean>(false);
  const [selectedContactName, setSelectedContactName] = useState<string>('Ibrahim A******* M****');
  const [activeTab, setActiveTab] = useState<'keypad' | 'quick'>('quick');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const t = {
    title: lang === 'en' ? 'Money Transfer' : 'تحويل أموال',
    transferTo: lang === 'en' ? 'Transfer to' : 'تحويل إلى',
    mobileLabel: lang === 'en' ? 'Mobile number' : 'رقم الموبايل',
    fees: lang === 'en' ? 'Fees' : 'الرسوم',
    amount: lang === 'en' ? 'Amount' : 'المبلغ',
    currency: lang === 'en' ? 'EGP' : 'جنيه',
    allowedText:
      lang === 'en'
        ? 'Allowed amount: from 5 EGP to 60,000 EGP'
        : 'المبلغ المسموح به: من 5 جنيه إلى 60,000 جنيه',
    confirm: lang === 'en' ? 'Confirm' : 'تأكيد',
    selectContact: lang === 'en' ? 'Select Contact' : 'اختر جهة اتصال',
    close: lang === 'en' ? 'Close' : 'إغلاق',
    invalidMobile:
      lang === 'en'
        ? 'Please enter a valid 11-digit Egyptian mobile number'
        : 'يرجى إدخال رقم هاتف مصري صحيح مكون من 11 رقم',
    invalidAmount:
      lang === 'en'
        ? 'Amount must be between 5 and 60,000 EGP'
        : 'المبلغ يجب أن يكون بين 5 و 60,000 جنيه',
    recentContacts: lang === 'en' ? 'Recent Contacts' : 'جهات الاتصال الأخيرة',
    keypadToggle: lang === 'en' ? 'Keypad' : 'لوحة المفاتيح',
    quickAdd: lang === 'en' ? 'Quick Add' : 'إضافة سريعة',
    history: lang === 'en' ? 'History' : 'السجل',
  };

  const handleQuickAdd = (increment: number) => {
    if (!isMuted) playKeypadClick();
    setAmount((prev) => Math.min(60000, prev + increment));
    setErrorMsg('');
  };

  const handleKeyPress = (num: string) => {
    if (!isMuted) playKeypadClick();
    setErrorMsg('');
    const str = amount.toString();
    if (str === '0') {
      setAmount(Number(num));
    } else {
      const next = Number(str + num);
      if (next <= 60000) {
        setAmount(next);
      }
    }
  };

  const handleBackspace = () => {
    if (!isMuted) playKeypadClick();
    const str = amount.toString();
    if (str.length <= 1) {
      setAmount(0);
    } else {
      setAmount(Number(str.slice(0, -1)));
    }
  };

  const handleSelectContact = (contact: Contact) => {
    if (!isMuted) playKeypadClick();
    setMobileNumber(contact.phone);
    setSelectedContactName(contact.maskedName);
    setShowContactsModal(false);
  };

  const handleConfirm = () => {
    // Validation
    const cleanNumber = mobileNumber.replace(/\D/g, '');
    if (cleanNumber.length !== 11 || !/^(010|011|012|015)/.test(cleanNumber)) {
      setErrorMsg(t.invalidMobile);
      return;
    }
    if (amount < 5 || amount > 60000) {
      setErrorMsg(t.invalidAmount);
      return;
    }

    let contactName = selectedContactName;
    const found = PRESET_CONTACTS.find((c) => c.phone === cleanNumber);
    if (found) {
      contactName = found.maskedName;
    } else if (!contactName || contactName.includes('Ibrahim')) {
      contactName = 'Recipient *******';
    }

    onProceed(cleanNumber, amount, contactName);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#F8F8FA] min-h-[640px]">
      <div>
        {/* Top Header Bar (Matching video 00:00) */}
        <div className="bg-black text-white px-4 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (!isMuted) playKeypadClick();
                setAmount(29010);
                setMobileNumber('01059656653');
              }}
              className="p-1 hover:bg-neutral-800 rounded-full transition-colors active:scale-95"
              title="Reset"
            >
              <ArrowLeft className="w-5 h-5 text-white rtl:rotate-180" />
            </button>
            <h1 className="text-lg font-bold tracking-normal">{t.title}</h1>
          </div>

          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1 text-xs text-zinc-300 hover:text-white px-2 py-1 bg-neutral-800/80 rounded-md transition-colors"
            title="Transfer History"
          >
            <History className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">{t.history}</span>
          </button>
        </div>

        {/* Form Container */}
        <div className="p-4 space-y-5">
          {/* Section: Transfer To */}
          <div>
            <h2 className="text-sm font-bold text-gray-800 mb-2">{t.transferTo}</h2>

            {/* Mobile Number Input Container with teal/cyan border (video frame 00:00) */}
            <div className="relative flex items-center bg-white rounded-lg border-2 border-[#00828a] px-3 py-2.5 shadow-xs transition-all focus-within:ring-2 focus-within:ring-[#00828a]/20">
              {/* Clear button (X) */}
              {mobileNumber && (
                <button
                  type="button"
                  onClick={() => {
                    if (!isMuted) playKeypadClick();
                    setMobileNumber('');
                  }}
                  className="p-1 text-gray-400 hover:text-gray-700 transition-colors mr-2 rtl:mr-0 rtl:ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Number Input Field */}
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-[10px] text-gray-400 font-medium leading-none mb-1">
                  {t.mobileLabel}
                </span>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 11);
                    setMobileNumber(val);
                    setErrorMsg('');
                  }}
                  placeholder="010xxxxxxxx"
                  className="w-full text-base font-semibold text-gray-800 tracking-wide outline-hidden bg-transparent"
                />
              </div>

              {/* Contact Picker Button */}
              <button
                type="button"
                onClick={() => {
                  if (!isMuted) playKeypadClick();
                  setShowContactsModal(true);
                }}
                className="p-1.5 text-gray-500 hover:text-red-600 transition-colors ml-2 rtl:ml-0 rtl:mr-2"
                title={t.selectContact}
              >
                <ContactRound className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contacts avatars */}
            <div className="mt-2.5 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-[11px] text-gray-400 whitespace-nowrap">{t.recentContacts}:</span>
              {PRESET_CONTACTS.slice(0, 3).map((contact) => (
                <button
                  key={contact.phone}
                  onClick={() => handleSelectContact(contact)}
                  className="inline-flex items-center gap-1.5 px-2 py-1 bg-white border border-gray-200 hover:border-red-400 rounded-full text-gray-700 hover:text-red-600 text-[11px] font-medium transition-all shadow-2xs whitespace-nowrap active:scale-95"
                >
                  <span className={`w-2 h-2 rounded-full ${contact.avatarColor}`}></span>
                  <span>{contact.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Amount Display Card */}
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-xs">
            {/* Row: Fees & Amount labels */}
            <div className="flex items-center justify-between text-xs text-gray-500 font-medium mb-3">
              <div className="flex items-center gap-1.5">
                <ReceiptText className="w-4 h-4 text-gray-400" />
                <span>{t.fees}</span>
                <span className="font-bold text-gray-700">5 {t.currency}</span>
              </div>
              <span className="font-semibold text-gray-700">{t.amount}</span>
            </div>

            {/* Large Amount Display in dark teal `#007A87` */}
            <div className="text-center py-2">
              <div className="inline-flex items-baseline justify-center gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#007A87] tracking-tight">
                  {amount.toLocaleString()}
                </span>
                <span className="text-base sm:text-lg font-bold text-gray-800">
                  {t.currency}
                </span>
              </div>
            </div>

            {/* Quick adder chips: +500, +100, +10 (matching video 00:00 - 00:04) */}
            <div className="flex items-center justify-center gap-2.5 mt-3">
              <button
                type="button"
                onClick={() => handleQuickAdd(500)}
                className="flex-1 py-2 px-3 bg-[#EEEDF2] hover:bg-[#E3E1EB] active:scale-95 text-gray-800 font-semibold rounded-full text-sm transition-all text-center shadow-2xs"
              >
                +500
              </button>
              <button
                type="button"
                onClick={() => handleQuickAdd(100)}
                className="flex-1 py-2 px-3 bg-[#EEEDF2] hover:bg-[#E3E1EB] active:scale-95 text-gray-800 font-semibold rounded-full text-sm transition-all text-center shadow-2xs"
              >
                +100
              </button>
              <button
                type="button"
                onClick={() => handleQuickAdd(10)}
                className="flex-1 py-2 px-3 bg-[#EEEDF2] hover:bg-[#E3E1EB] active:scale-95 text-gray-800 font-semibold rounded-full text-sm transition-all text-center shadow-2xs"
              >
                +10
              </button>
            </div>

            {/* Allowed amount notice text */}
            <p className="text-center text-[11px] text-gray-400 mt-3 font-normal">
              {t.allowedText}
            </p>
          </div>

          {/* Error Message if any */}
          {errorMsg && (
            <div className="p-2.5 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-medium animate-shake text-center">
              {errorMsg}
            </div>
          )}

          {/* Input Mode Selector: Interactive Numpad for amount */}
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              {activeTab === 'quick' ? t.quickAdd : t.keypadToggle}
            </span>
            <div className="flex items-center gap-1 bg-gray-200/80 p-0.5 rounded-lg text-[11px]">
              <button
                type="button"
                onClick={() => setActiveTab('quick')}
                className={`px-2 py-0.5 rounded-md font-medium transition-all ${
                  activeTab === 'quick' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-600'
                }`}
              >
                + / -
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('keypad')}
                className={`px-2 py-0.5 rounded-md font-medium transition-all ${
                  activeTab === 'keypad' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-600'
                }`}
              >
                123
              </button>
            </div>
          </div>

          {/* Interactive Numeric Pad (for precise amount adjustment) */}
          {activeTab === 'keypad' ? (
            <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-2xs grid grid-cols-3 gap-2">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                <button
                  key={digit}
                  type="button"
                  onClick={() => handleKeyPress(digit)}
                  className="py-2.5 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 rounded-lg text-base font-bold text-gray-800 transition-colors"
                >
                  {digit}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  if (!isMuted) playKeypadClick();
                  setAmount(0);
                }}
                className="py-2.5 bg-gray-50 hover:bg-red-50 text-red-500 text-xs font-semibold rounded-lg"
              >
                C
              </button>
              <button
                type="button"
                onClick={() => handleKeyPress('0')}
                className="py-2.5 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 rounded-lg text-base font-bold text-gray-800"
              >
                0
              </button>
              <button
                type="button"
                onClick={handleBackspace}
                className="py-2.5 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 rounded-lg flex items-center justify-center text-gray-700"
              >
                <Delete className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: '+1,000', val: 1000 },
                { label: '+5,000', val: 5000 },
                { label: '+10,000', val: 10000 },
                { label: 'Reset', val: -1 },
              ].map((pill) => (
                <button
                  key={pill.label}
                  type="button"
                  onClick={() => {
                    if (pill.val === -1) {
                      setAmount(5);
                    } else {
                      handleQuickAdd(pill.val);
                    }
                  }}
                  className="py-1.5 px-2 bg-white border border-gray-200 hover:border-red-400 hover:bg-red-50/50 rounded-lg text-xs font-semibold text-gray-700 hover:text-red-600 transition-all shadow-2xs active:scale-95 text-center"
                >
                  {pill.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sticky Action Area (Matching video 00:05) */}
      <div className="p-4 bg-white border-t border-gray-100 sticky bottom-0 z-10 shadow-lg">
        <button
          type="button"
          onClick={handleConfirm}
          className="w-full py-3.5 bg-[#E60000] hover:bg-[#cc0000] active:scale-[0.99] text-white font-bold rounded-lg text-base transition-all shadow-md shadow-red-600/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{t.confirm}</span>
        </button>
      </div>

      {/* Contacts Modal */}
      {showContactsModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl space-y-4 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-gray-900 text-base">{t.selectContact}</h3>
              <button
                onClick={() => setShowContactsModal(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-2 flex-1 pr-1">
              {PRESET_CONTACTS.map((c) => (
                <button
                  key={c.phone}
                  type="button"
                  onClick={() => handleSelectContact(c)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-red-50/60 border border-transparent hover:border-red-200 transition-all text-left rtl:text-right group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${c.avatarColor} text-white font-bold flex items-center justify-center shadow-xs text-sm`}
                    >
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-red-600 text-sm">
                        {c.name}
                      </p>
                      <p className="text-xs text-gray-500 font-mono tracking-wide">{c.phone}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Cash
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowContactsModal(false)}
              className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg text-sm transition-colors"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
