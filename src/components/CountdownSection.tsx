import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CalendarPlus, BellRing, Check, Heart } from 'lucide-react';
import { WeddingData } from '../types';

interface CountdownSectionProps {
  data: WeddingData;
  formattedDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ data, formattedDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });
  const [addedToCal, setAddedToCal] = useState<boolean>(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetTime = new Date(`${data.date}T${data.time || '18:00'}:00`).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [data.date, data.time]);

  // Export to Apple / Google iCal (.ics)
  const handleAddToCalendar = () => {
    const startDate = new Date(`${data.date}T${data.time || '18:00'}:00`);
    const endDate = new Date(startDate.getTime() + 6 * 60 * 60 * 1000);

    const formatICSDate = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, '');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wedding Invitation//KZ',
      'BEGIN:VEVENT',
      `SUMMARY:Үйлену тойы — ${data.groomName} & ${data.brideName}`,
      `DESCRIPTION:Салтанатты үйлену тойына шақыру!\\nМейрамхана: ${data.venueName}\\nМекенжай: ${data.venueAddress}\\nУақыты: ${data.time}`,
      `LOCATION:${data.venueName}, ${data.venueAddress}, ${data.city}`,
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `wedding-${data.groomName}-${data.brideName}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setAddedToCal(true);
    setTimeout(() => setAddedToCal(false), 4000);
  };

  const handleOpenGoogleCalendar = () => {
    const startDate = new Date(`${data.date}T${data.time || '18:00'}:00`);
    const endDate = new Date(startDate.getTime() + 6 * 60 * 60 * 1000);

    const pad = (n: number) => (n < 10 ? '0' + n : n);
    const formatGDate = (d: Date) =>
      `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

    const title = encodeURIComponent(`Үйлену тойы: ${data.groomName} & ${data.brideName}`);
    const details = encodeURIComponent(
      `Құрметті қонақ! Сізді ${data.groomName} және ${data.brideName} отау құру салтанатына шақырамыз.\nМейрамхана: ${data.venueName}`
    );
    const location = encodeURIComponent(`${data.venueName}, ${data.venueAddress}, ${data.city}`);

    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatGDate(startDate)}/${formatGDate(endDate)}&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank');
  };

  const timerUnits = [
    { label: 'КҮН', value: timeLeft.days, max: 365 },
    { label: 'САҒАТ', value: timeLeft.hours, max: 24 },
    { label: 'МИНУТ', value: timeLeft.minutes, max: 60 },
    { label: 'СЕКУНД', value: timeLeft.seconds, max: 60 },
  ];

  return (
    <section id="countdown" className="py-16 px-4 relative z-10">
      <div className="max-w-xl mx-auto text-center">
        {/* Compact Luxury Glass Capsule Container (50-65% opacity) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card rounded-2xl p-4 sm:p-5 relative overflow-hidden"
        >
          {/* Subtle top golden light glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-10 bg-gradient-to-b from-[#C5A880]/20 to-transparent blur-xl pointer-events-none" />

          {/* Section Heading */}
          <div className="mb-4 sm:mb-6">
            <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#1D1D1F] tracking-tight inline-flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 text-[#C5A880] fill-[#C5A880] shrink-0" />
              <span>Салтанатты күнге дейін</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#86868B] mt-1.5">
              {formattedDate} сағат {data.time}-де
            </p>
          </div>

          {/* Compact Circular Dial Units */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md mx-auto mb-6 items-center justify-center">
            {timerUnits.map((unit, idx) => {
              const progressRatio = Math.min(1, Math.max(0, unit.value / unit.max));
              const strokeDashoffset = 100 - progressRatio * 100;

              return (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center relative select-none"
                >
                  {/* Circular Dial Ring */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                      <path
                        className="text-black/[0.08]"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#C5A880] transition-all duration-500 ease-out"
                        strokeDasharray="100, 100"
                        strokeDashoffset={strokeDashoffset}
                        strokeWidth="2"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>

                    {/* Centered Numbers */}
                    <span className="absolute font-serif-luxury text-xl sm:text-2xl md:text-3xl font-normal text-[#1D1D1F] tabular-nums tracking-tighter">
                      {String(unit.value).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Unit Label */}
                  <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] uppercase text-[#86868B] mt-1.5">
                    {unit.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Icon-Only Calendar Action Buttons */}
          <div className="flex items-center justify-center gap-3 pt-3 border-t border-black/[0.06]">
            <button
              onClick={handleAddToCalendar}
              type="button"
              title="Apple / iCal күнтізбеге сақтау (.ics)"
              aria-label="Apple / iCal күнтізбеге сақтау"
              className="w-10 h-10 rounded-full bg-[#1D1D1F] text-white hover:bg-black transition-all flex items-center justify-center cursor-pointer shadow-sm active:scale-95"
            >
              {addedToCal ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <CalendarPlus className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={handleOpenGoogleCalendar}
              type="button"
              title="Google Calendar-ге қосу"
              aria-label="Google Calendar-ге қосу"
              className="w-10 h-10 rounded-full bg-white/90 text-[#1D1D1F] border border-black/10 hover:bg-white transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
            >
              <BellRing className="w-4 h-4 text-[#86868B]" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
