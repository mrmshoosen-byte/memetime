'use client';

import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function InteractiveClock({ onDateChange }) {
  const [now, setNow] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Notify parent of date change
  useEffect(() => {
    onDateChange(selectedDate);
  }, [selectedDate, onDateChange]);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  };

  const handleDateChange = (e) => {
    const [year, month, day] = e.target.value.split('-');
    const newDate = new Date(year, parseInt(month) - 1, day);
    newDate.setHours(selectedDate.getHours(), selectedDate.getMinutes());
    setSelectedDate(newDate);
  };

  const handleTimeChange = (e) => {
    const [hours, minutes] = e.target.value.split(':');
    const newDate = new Date(selectedDate);
    newDate.setHours(parseInt(hours), parseInt(minutes), 0);
    setSelectedDate(newDate);
  };

  const adjustDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const adjustTime = (minutes) => {
    const newDate = new Date(selectedDate);
    newDate.setMinutes(newDate.getMinutes() + minutes);
    setSelectedDate(newDate);
  };

  const resetToNow = () => {
    setSelectedDate(new Date());
  };

  // Calculate clock hand angles
  const hours = selectedDate.getHours() % 12;
  const minutes = selectedDate.getMinutes();
  const seconds = selectedDate.getSeconds();

  const secondAngle = (seconds * 6); // 360 / 60
  const minuteAngle = (minutes * 6) + (seconds * 0.1); // 360 / 60
  const hourAngle = (hours * 30) + (minutes * 0.5); // 360 / 12

  const dateInputValue = selectedDate.toISOString().split('T')[0];
  const timeInputValue = selectedDate.toTimeString().slice(0, 5);

  return (
    <div className="relative w-full">
      {/* Main Clock Display */}
      <div className="glow-border rounded-2xl p-8 mb-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-display font-bold text-neon-blue">
            ⏰ ANALOG CLOCK
          </h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-neon-blue hover:text-neon-purple transition-colors"
          >
            {isExpanded ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>

        {/* Analog Clock Display */}
        <div className="flex flex-col items-center gap-6 mb-6">
          {/* Clock Face */}
          <div className="relative w-64 h-64 rounded-full bg-gradient-to-b from-dark-card to-dark-bg border-4 border-neon-blue shadow-2xl" style={{boxShadow: '0 0 30px rgba(0, 240, 255, 0.5)'}}>
            {/* Center Dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-neon-blue rounded-full z-10" style={{boxShadow: '0 0 10px #00f0ff'}} />

            {/* Hour Numbers */}
            {[...Array(12)].map((_, i) => {
              const num = i === 0 ? 12 : i;
              const angle = (i * 30) * (Math.PI / 180);
              const x = 120 + 100 * Math.sin(angle);
              const y = 120 - 100 * Math.cos(angle);
              return (
                <div
                  key={i}
                  className="absolute w-full h-full flex items-center justify-center"
                  style={{
                    transform: `rotate(${i * 30}deg)`,
                  }}
                >
                  <span
                    className="absolute font-display font-bold text-neon-blue text-lg"
                    style={{
                      transform: `rotate(${-i * 30}deg) translateY(-90px)`,
                      textShadow: '0 0 10px #00f0ff',
                    }}
                  >
                    {num}
                  </span>
                </div>
              );
            })}

            {/* Hour Hand */}
            <div
              className="absolute top-1/2 left-1/2 w-2 h-16 bg-gradient-to-t from-neon-purple to-neon-pink rounded-full origin-bottom"
              style={{
                transform: `translate(-50%, -50%) rotate(${hourAngle}deg) translateY(-32px)`,
                boxShadow: '0 0 10px rgba(255, 0, 126, 0.8)',
                transition: 'transform 0.5s ease-in-out',
              }}
            />

            {/* Minute Hand */}
            <div
              className="absolute top-1/2 left-1/2 w-1.5 h-24 bg-gradient-to-t from-neon-green to-neon-blue rounded-full origin-bottom"
              style={{
                transform: `translate(-50%, -50%) rotate(${minuteAngle}deg) translateY(-48px)`,
                boxShadow: '0 0 10px rgba(0, 240, 255, 0.8)',
                transition: 'transform 0.5s ease-in-out',
              }}
            />

            {/* Second Hand */}
            <div
              className="absolute top-1/2 left-1/2 w-1 h-28 bg-neon-yellow origin-bottom"
              style={{
                transform: `translate(-50%, -50%) rotate(${secondAngle}deg) translateY(-56px)`,
                boxShadow: '0 0 8px rgba(255, 255, 0, 0.8)',
              }}
            />

            {/* Tick Marks */}
            {[...Array(60)].map((_, i) => {
              const isMajor = i % 5 === 0;
              const angle = (i * 6) * (Math.PI / 180);
              const length = isMajor ? 12 : 6;
              const y1 = 120 - 108;
              const y2 = 120 - (108 - length);
              const x1 = 120;
              const x2 = 120;
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: '2px',
                    height: length,
                    backgroundColor: isMajor ? '#00f0ff' : '#2a3f6f',
                    transformOrigin: '0 108px',
                    transform: `translateX(-50%) rotate(${i * 6}deg)`,
                  }}
                />
              );
            })}
          </div>

          {/* Date and Time Display */}
          <div className="text-center">
            <div className="text-2xl font-display font-bold neon-text mb-2">
              {formatDate(selectedDate)}
            </div>
            <div className="text-sm text-gray-400">
              {selectedDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
            </div>
          </div>
        </div>

        {/* Controls - Expandable */}
        {isExpanded && (
          <div className="space-y-4 pt-6 border-t border-dark-border animate-slide">
            {/* Date Picker */}
            <div>
              <label className="block text-xs font-display text-neon-blue mb-2 uppercase tracking-wider">
                Select Date
              </label>
              <input
                type="date"
                value={dateInputValue}
                onChange={handleDateChange}
                className="w-full px-4 py-2 rounded-lg bg-dark-card border border-dark-border focus:border-neon-blue focus:shadow-lg font-body text-center"
              />
            </div>

            {/* Time Picker */}
            <div>
              <label className="block text-xs font-display text-neon-purple mb-2 uppercase tracking-wider">
                Select Time
              </label>
              <input
                type="time"
                value={timeInputValue}
                onChange={handleTimeChange}
                className="w-full px-4 py-2 rounded-lg bg-dark-card border border-dark-border focus:border-neon-purple focus:shadow-lg font-body text-center"
              />
            </div>

            {/* Quick Adjust Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div>
                <p className="text-xs text-gray-500 mb-2">Quick Date Jump</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => adjustDate(-7)}
                    className="flex-1 px-3 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-blue hover:text-neon-blue text-xs font-display transition-all"
                  >
                    -7d
                  </button>
                  <button
                    onClick={() => adjustDate(-1)}
                    className="flex-1 px-3 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-pink hover:text-neon-pink text-xs font-display transition-all"
                  >
                    -1d
                  </button>
                  <button
                    onClick={() => adjustDate(1)}
                    className="flex-1 px-3 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-green hover:text-neon-green text-xs font-display transition-all"
                  >
                    +1d
                  </button>
                  <button
                    onClick={() => adjustDate(7)}
                    className="flex-1 px-3 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-yellow hover:text-neon-yellow text-xs font-display transition-all"
                  >
                    +7d
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-2">Quick Time Jump</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => adjustTime(-60)}
                    className="flex-1 px-3 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-blue hover:text-neon-blue text-xs font-display transition-all"
                  >
                    -1h
                  </button>
                  <button
                    onClick={() => adjustTime(-15)}
                    className="flex-1 px-3 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-purple hover:text-neon-purple text-xs font-display transition-all"
                  >
                    -15m
                  </button>
                  <button
                    onClick={() => adjustTime(15)}
                    className="flex-1 px-3 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-pink hover:text-neon-pink text-xs font-display transition-all"
                  >
                    +15m
                  </button>
                  <button
                    onClick={() => adjustTime(60)}
                    className="flex-1 px-3 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-green hover:text-neon-green text-xs font-display transition-all"
                  >
                    +1h
                  </button>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetToNow}
              className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg font-display font-bold text-dark-bg uppercase tracking-wider hover:shadow-lg transition-all"
            >
              Return to Now
            </button>
          </div>
        )}
      </div>

      {/* Status Indicator */}
      <div className="text-center text-xs text-gray-500">
        {Math.abs(selectedDate.getTime() - now.getTime()) < 1000 ? (
          <span className="text-neon-green">📡 Real-time Mode</span>
        ) : (
          <span className="text-neon-yellow">⏰ Time Travel Active</span>
        )}
      </div>
    </div>
  );
}
