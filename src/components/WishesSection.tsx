import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Heart, Send, Sparkles } from 'lucide-react';
import { GuestWish } from '../types';

interface WishesSectionProps {
  wishes: GuestWish[];
  onAddWish: (wish: GuestWish) => void;
  onLikeWish: (id: string) => void;
}

export const WishesSection: React.FC<WishesSectionProps> = ({ wishes, onAddWish, onLikeWish }) => {
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    setIsSubmitting(true);
    const newWish: GuestWish = {
      id: 'wish-' + Date.now(),
      author: author.trim(),
      message: message.trim(),
      createdAt: 'Жаңа ғана',
      likes: 1,
    };

    onAddWish(newWish);
    setAuthor('');
    setMessage('');
    setIsSubmitting(false);
  };

  return (
    <section id="wishes" className="py-16 px-4 bg-transparent relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="glass-card py-2.5 px-5 rounded-xl"
          >
            <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#1D1D1F] tracking-tight flex items-center justify-center gap-2">
              <BookOpen className="w-5 h-5 text-[#C5A880]" />
              <span>Тілектер Кітабы</span>
            </h2>
          </motion.div>
        </div>

        {/* Wish Submission Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-2xl p-4 md:p-5 mb-8"
        >
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-5">
                <label className="block text-[11px] font-semibold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                  Есіміңіз
                </label>
                <input
                  type="text"
                  required
                  placeholder="Мысалы: Бауыржан дос"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBFBFD] border border-black/[0.08] focus:outline-none focus:ring-2 focus:ring-[#1D1D1F] text-xs sm:text-sm text-[#1D1D1F] placeholder:text-neutral-400 transition-all"
                />
              </div>

              <div className="sm:col-span-7">
                <label className="block text-[11px] font-semibold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                  Ізгі тілегіңіз
                </label>
                <input
                  type="text"
                  required
                  placeholder="Жастарға бақыт тілеймін..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBFBFD] border border-black/[0.08] focus:outline-none focus:ring-2 focus:ring-[#1D1D1F] text-xs sm:text-sm text-[#1D1D1F] placeholder:text-neutral-400 transition-all"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-full bg-[#1D1D1F] hover:bg-black text-white text-xs font-medium transition-all shadow-sm cursor-pointer flex items-center gap-1.5 active:scale-98"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Тілек қосу</span>
              </button>
            </div>
          </form>
        </motion.div>

        {/* Wishes List (Apple Style Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {wishes.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="glass-card rounded-xl p-4 flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#F5F5F7] border border-black/[0.06] flex items-center justify-center font-serif-luxury font-semibold text-xs text-[#1D1D1F]">
                      {item.author.charAt(0)}
                    </div>
                    <span className="font-semibold text-xs sm:text-sm text-[#1D1D1F]">
                      {item.author}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#A1A1A6] font-mono tabular-nums">
                    {item.createdAt}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#424245] leading-snug italic font-serif-luxury">
                  «{item.message}»
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-black/[0.04] flex items-center justify-between text-xs text-[#86868B]">
                <span className="inline-flex items-center gap-1 text-[11px] text-[#C5A880]">
                  <Sparkles className="w-3 h-3" />
                  <span>Шын жүректен</span>
                </span>
                <button
                  type="button"
                  onClick={() => onLikeWish(item.id)}
                  aria-label="Тілекті ұнату"
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs hover:bg-[#F5F5F7] text-[#6E6E73] hover:text-rose-500 transition-colors cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
                  <span className="tabular-nums font-mono">{item.likes}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
