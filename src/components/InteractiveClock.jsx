'use client';

import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Clock } from 'lucide-react';

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

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

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

  const dateInputValue = selectedDate.toISOString().split('T')[0];
  const timeInputValue = selectedDate.toTimeString().slice(0, 5);

  return (
    <div className="relative w-full">
      {/* Main Clock Display */}
      <div className="glow-border rounded-2xl p-8 mb-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-neon-blue animate-pulse" />
            <h2 className="text-lg font-display font-bold text-neon-blue">
              TIME PORTAL
            </h2>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-neon-blue hover:text-neon-purple transition-colors"
          >
            {isExpanded ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>

        {/* Current Time */}
        <div className="text-center mb-6 border-b border-dark-border pb-6">
          <div className="text-xs font-display text-neon-purple mb-2 uppercase tracking-wider">
            Current Time
          </div>
          <div className="text-4xl font-display font-bold neon-text mb-2">
            {formatTime(now)}
          </div>
          <div className="text-sm text-gray-400">{formatDate(now)}</div>
        </div>

        {/* Selected Time */}
        <div className="text-center">
          <div className="text-xs font-display text-neon-green mb-2 uppercase tracking-wider">
            Portal Date
          </div>
          <div className="text-3xl font-display font-bold neon-text green mb-3">
            {formatTime(selectedDate)}
          </div>
          <div className="text-sm text-gray-400 mb-6">{formatDate(selectedDate)}</div>

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
      </div>

      {/* Status Indicator */}
      <div className="text-center text-xs text-gray-500">
        {Math.abs(selectedDate.getTime() - now.getTime()) === 0 ? (
          <span className="text-neon-green">📡 Real-time Mode</span>
        ) : (
          <span className="text-neon-yellow">⏰ Time Travel Active</span>
        )}
      </div>
    </div>
  );
}
