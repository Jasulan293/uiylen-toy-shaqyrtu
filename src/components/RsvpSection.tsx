import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { HeartHandshake, CheckCircle2, Users, Send, UserCheck, Heart } from 'lucide-react';
import { RSVPRecord, RSVPStatus, WeddingData } from '../types';

interface RsvpSectionProps {
  data: WeddingData;
  onAddRSVP: (record: RSVPRecord) => void;
  rsvpList: RSVPRecord[];
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ data, onAddRSVP, rsvpList }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<RSVPStatus>('attending');
  const [partnerName, setPartnerName] = useState('');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newRecord: RSVPRecord = {
      id: 'rsvp-' + Date.now(),
      guestName: name.trim(),
      status,
      partnerName: status === 'with_partner' ? partnerName.trim() : undefined,
      guestCount: status === 'cannot_attend' ? 0 : guestCount,
      note: note.trim() || undefined,
      createdAt: new Date().toLocaleDateString('kk-KZ', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    onAddRSVP(newRecord);

    if (status !== 'cannot_attend') {
      // Trigger festive celebration confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#C5A880', '#EADBCE', '#1D1D1F', '#F5F5F7'],
      });
    }

    setSubmitted(true);
  };

  const attendingTotal = rsvpList.reduce((acc, curr) => (curr.status !== 'cannot_attend' ? acc + (curr.guestCount || 1) : acc), 0);

  return (
    <section id="rsvp" className="py-16 px-4 bg-transparent relative z-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="glass-card py-2.5 px-5 rounded-xl"
          >
            <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#1D1D1F]">
              Қатысуыңызды растау
            </h2>
          </motion.div>
        </div>

        {/* RSVP Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-2xl p-4 md:p-6"
        >
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/50 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif-luxury text-2xl md:text-3xl text-[#1D1D1F] mb-2">
                Рақмет, {name}!
              </h3>
              <p className="text-xs md:text-sm text-[#6E6E73] max-w-md mx-auto mb-6 leading-relaxed">
                {status === 'cannot_attend'
                  ? 'Жауабыңызды қабылдадық. Тілегіңіз бен жылы лебізіңізге алғыс білдіреміз!'
                  : 'Сіздің қатысу туралы жауабыңыз тіркелді. Біздің бақытты күніміздің қадірлі қонағы болуыңызды асыға күтеміз!'}
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setPartnerName('');
                  setNote('');
                }}
                className="px-5 py-2 text-xs font-medium text-[#1D1D1F] border border-black/[0.1] rounded-full hover:bg-white transition-colors"
              >
                Басқа қонақтың атынан жауап беру
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-2">
                  Аты-жөніңіз <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Мысалы: Арман Серікұлы"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-black/[0.08] focus:outline-none focus:ring-2 focus:ring-[#1D1D1F] text-sm text-[#1D1D1F] placeholder:text-neutral-400 transition-all"
                />
              </div>

              {/* Status Radio Buttons */}
              <div>
                <label className="block text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-2.5">
                  Тойға қатысуыңызды белгілеңіз
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { key: 'attending', label: 'Әрине, келемін' },
                    { key: 'with_partner', label: 'Жұбайыммен бірге' },
                    { key: 'cannot_attend', label: 'Өкінішке орай, бара алмаймын' },
                  ].map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => {
                        setStatus(option.key as RSVPStatus);
                        if (option.key === 'with_partner') setGuestCount(2);
                        if (option.key === 'attending') setGuestCount(1);
                      }}
                      className={`px-4 py-3 rounded-2xl text-xs md:text-sm font-medium border text-left transition-all cursor-pointer ${
                        status === option.key
                          ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-sm'
                          : 'bg-white text-[#424245] border-black/[0.08] hover:border-black/[0.2]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option.label}</span>
                        {status === option.key && <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Partner Name if with_partner */}
              {status === 'with_partner' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2"
                >
                  <label className="block text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider">
                    Жұбайыңыздың / Серігіңіздің аты-жөні
                  </label>
                  <input
                    type="text"
                    placeholder="Мысалы: Әйгерім"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-black/[0.08] focus:outline-none focus:ring-2 focus:ring-[#1D1D1F] text-sm text-[#1D1D1F] placeholder:text-neutral-400 transition-all"
                  />
                </motion.div>
              )}

              {/* Guest Count (if attending) */}
              {status !== 'cannot_attend' && (
                <div>
                  <label className="block text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-2">
                    Барлығы қанша адам боласыздар?
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setGuestCount(count)}
                        className={`w-11 h-11 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                          guestCount === count
                            ? 'bg-[#1D1D1F] text-white shadow-sm'
                            : 'bg-white text-[#424245] border border-black/[0.08] hover:border-black/[0.2]'
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                    <span className="text-xs text-[#86868B] ml-2">адам</span>
                  </div>
                </div>
              )}

              {/* Note / Special request */}
              <div>
                <label className="block text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-2">
                  Жас жұбайларға лебіз немесе ескерту (міндетті емес)
                </label>
                <textarea
                  rows={2}
                  placeholder="Тілек немесе ерекше сұрақтарыңыз болса..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-black/[0.08] focus:outline-none focus:ring-2 focus:ring-[#1D1D1F] text-sm text-[#1D1D1F] placeholder:text-neutral-400 transition-all resize-none"
                />
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#1D1D1F] hover:bg-black text-white text-sm font-medium transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2 active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Жауапты жіберу</span>
              </button>
            </form>
          )}

          {/* Quick guest attendance counter for organizers */}
          <div className="mt-8 pt-6 border-t border-black/[0.06] flex items-center justify-between text-xs text-[#86868B]">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#C5A880]" />
              <span>Расталған қонақтар: <strong className="text-[#1D1D1F]">{attendingTotal} адам</strong></span>
            </div>
            <button
              onClick={() => setShowSummary(!showSummary)}
              className="text-[#1D1D1F] hover:underline font-medium cursor-pointer"
            >
              {showSummary ? 'Тізімді жабу' : 'Тіркелгендер тізімі'}
            </button>
          </div>

          {/* Organizer dropdown view of recorded guests */}
          {showSummary && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-black/[0.06] space-y-2 max-h-60 overflow-y-auto"
            >
              {rsvpList.length === 0 ? (
                <p className="text-xs text-[#86868B] italic">Әзірге ешкім жауап қалдырмады.</p>
              ) : (
                rsvpList.map((item) => (
                  <div key={item.id} className="text-xs flex items-center justify-between py-1.5 border-b border-black/[0.04]">
                    <div>
                      <span className="font-medium text-[#1D1D1F]">{item.guestName}</span>
                      {item.partnerName && <span className="text-[#86868B]"> + {item.partnerName}</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={item.status === 'cannot_attend' ? 'text-rose-500' : 'text-emerald-600 font-medium'}>
                        {item.status === 'cannot_attend' ? 'Келмейді' : `${item.guestCount} адам`}
                      </span>
                      <span className="text-[#A1A1A6]">{item.createdAt}</span>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
