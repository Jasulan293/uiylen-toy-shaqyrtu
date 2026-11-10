import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, RotateCcw, SlidersHorizontal, Check } from 'lucide-react';
import { WeddingData } from '../types';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: WeddingData;
  onSave: (newData: WeddingData) => void;
  onReset: () => void;
}

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<WeddingData>({ ...data });
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync if prop changes
  React.useEffect(() => {
    setFormData({ ...data });
  }, [data]);

  if (!isOpen) return null;

  const handleChange = (field: keyof WeddingData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      // Auto-update monogram if groom or bride name changes
      monogram:
        field === 'groomName'
          ? `${value.charAt(0)} & ${prev.brideName.charAt(0)}`
          : field === 'brideName'
          ? `${prev.groomName.charAt(0)} & ${value.charAt(0)}`
          : prev.monogram,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-black/[0.08] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-black/[0.06] bg-[#FBFBFD]">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-black/[0.04]">
                <SlidersHorizontal className="w-4 h-4 text-[#1D1D1F]" />
              </div>
              <div>
                <h3 className="font-semibold text-base text-[#1D1D1F]">
                  Той деректерін өңдеу
                </h3>
                <p className="text-xs text-[#86868B]">
                  Есімдер, уақыт, күн және мейрамхана ақпаратын тікелей жаңартыңыз
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="p-2 rounded-full hover:bg-black/[0.05] text-[#86868B] hover:text-[#1D1D1F] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* Couple names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                  Жігіттің есімі
                </label>
                <input
                  type="text"
                  required
                  value={formData.groomName}
                  onChange={(e) => handleChange('groomName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBFBFD] border border-black/[0.08] text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#1D1D1F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                  Қалыңдықтың есімі
                </label>
                <input
                  type="text"
                  required
                  value={formData.brideName}
                  onChange={(e) => handleChange('brideName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBFBFD] border border-black/[0.08] text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#1D1D1F]"
                />
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                  Той күні
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBFBFD] border border-black/[0.08] text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#1D1D1F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                  Басталу уақыты
                </label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => handleChange('time', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBFBFD] border border-black/[0.08] text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#1D1D1F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                  Қала
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBFBFD] border border-black/[0.08] text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#1D1D1F]"
                />
              </div>
            </div>

            {/* Venue info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                  Мейрамхана / Салтанат сарайының аты
                </label>
                <input
                  type="text"
                  required
                  value={formData.venueName}
                  onChange={(e) => handleChange('venueName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBFBFD] border border-black/[0.08] text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#1D1D1F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                  Мекенжайы (көше, ғимарат)
                </label>
                <input
                  type="text"
                  required
                  value={formData.venueAddress}
                  onChange={(e) => handleChange('venueAddress', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBFBFD] border border-black/[0.08] text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#1D1D1F]"
                />
              </div>
            </div>

            {/* Invitation text */}
            <div>
              <label className="block text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                Шақырту хатының мәтіні
              </label>
              <textarea
                rows={3}
                value={formData.invitationText}
                onChange={(e) => handleChange('invitationText', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBFBFD] border border-black/[0.08] text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#1D1D1F] resize-none"
              />
            </div>

            {/* Parents signoff */}
            <div>
              <label className="block text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                Той иелері (қолтаңба)
              </label>
              <input
                type="text"
                value={formData.parentsText}
                onChange={(e) => handleChange('parentsText', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBFBFD] border border-black/[0.08] text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#1D1D1F]"
              />
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between">
              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#86868B] hover:text-[#1D1D1F] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Бастапқы үлгіні қайтару</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-[#424245] hover:bg-black/[0.04] rounded-xl transition-colors"
                >
                  Жабу
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#1D1D1F] text-white text-xs md:text-sm font-medium hover:bg-black transition-all shadow-sm active:scale-98"
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Сақталды!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Өзгерістерді сақтау</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
