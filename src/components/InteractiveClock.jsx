'use client';

import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Calendar, Clock } from 'lucide-react';

export default function InteractiveClock({ onDateChange }) {
  const [now, setNow] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(true);

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

  // Time adjustments
  const addHours = (h) => {
    const newDate = new Date(selectedDate);
    newDate.setHours(newDate.getHours() + h);
    setSelectedDate(newDate);
  };

  const addMinutes = (m) => {
    const newDate = new Date(selectedDate);
    newDate.setMinutes(newDate.getMinutes() + m);
    setSelectedDate(newDate);
  };

  const addDays = (d) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + d);
    setSelectedDate(newDate);
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

  const resetToNow = () => {
    setSelectedDate(new Date());
  };

  // Calculate clock hand angles
  const hours = selectedDate.getHours() % 12;
  const minutes = selectedDate.getMinutes();
  const seconds = selectedDate.getSeconds();

  const secondAngle = seconds * 6;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const hourAngle = hours * 30 + minutes * 0.5;

  const dateInputValue = selectedDate.toISOString().split('T')[0];
  const timeInputValue = selectedDate.toTimeString().slice(0, 5);

  return (
    <div className="relative w-full">
      {/* Main Clock Display */}
      <div className="glow-border rounded-2xl p-8 mb-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-display font-bold text-neon-blue">
            ⏰ TIME PORTAL
          </h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-neon-blue hover:text-neon-purple transition-colors"
          >
            {isExpanded ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>

        {/* Top Section: Clock Display + Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-dark-border">
          {/* Clock Face */}
          <div className="flex justify-center">
            <svg width="220" height="220" viewBox="0 0 280 280" className="drop-shadow-lg">
              <circle cx="140" cy="140" r="135" fill="#151b3a" stroke="#00f0ff" strokeWidth="3" style={{filter: 'drop-shadow(0 0 15px rgba(0, 240, 255, 0.4))'}} />
              
              {/* Hour Numbers */}
              {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
                const angle = (i * 30 - 90) * (Math.PI / 180);
                const x = 140 + 100 * Math.cos(angle);
                const y = 140 + 100 * Math.sin(angle);
                return (
                  <text key={num} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="font-display font-bold text-sm" fill="#00f0ff">
                    {num}
                  </text>
                );
              })}

              {/* Hour Hand */}
              <line x1="140" y1="140" x2={140 + 45 * Math.cos((hourAngle - 90) * (Math.PI / 180))} y2={140 + 45 * Math.sin((hourAngle - 90) * (Math.PI / 180))} stroke="#ff006e" strokeWidth="5" strokeLinecap="round" style={{transition: 'all 0.5s ease'}} />

              {/* Minute Hand */}
              <line x1="140" y1="140" x2={140 + 70 * Math.cos((minuteAngle - 90) * (Math.PI / 180))} y2={140 + 70 * Math.sin((minuteAngle - 90) * (Math.PI / 180))} stroke="#00f0ff" strokeWidth="3" strokeLinecap="round" style={{transition: 'all 0.5s ease'}} />

              {/* Center Dot */}
              <circle cx="140" cy="140" r="5" fill="#00f0ff" />
            </svg>
          </div>

          {/* Date & Time Info */}
          <div className="flex flex-col justify-center space-y-4">
            <div>
              <div className="text-xs font-display text-neon-purple mb-1 uppercase">Selected Time</div>
              <div className="text-3xl font-display font-bold neon-text">
                {selectedDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
              </div>
            </div>
            <div>
              <div className="text-xs font-display text-neon-green mb-1 uppercase">Selected Date</div>
              <div className="text-2xl font-display font-bold text-neon-blue">
                {formatDate(selectedDate)}
              </div>
            </div>
            <button
              onClick={resetToNow}
              className="px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg font-display font-bold text-dark-bg text-sm uppercase tracking-wider hover:shadow-lg transition-all"
            >
              ↻ Now
            </button>
          </div>
        </div>

        {/* Easy Controls Section */}
        {isExpanded && (
          <div className="space-y-6 animate-slide">
            {/* Date Controls */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-neon-green" />
                <label className="text-sm font-display text-neon-green uppercase tracking-wider">📅 Select Date</label>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                <button onClick={() => addDays(-30)} className="px-3 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-blue text-xs font-display transition-all">-30d</button>
                <button onClick={() => addDays(-7)} className="px-3 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-blue text-xs font-display transition-all">-7d</button>
                <button onClick={() => addDays(-1)} className="px-3 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-pink text-xs font-display transition-all">-1d</button>
                <button onClick={() => addDays(1)} className="px-3 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-green text-xs font-display transition-all">+1d</button>
                <button onClick={() => addDays(7)} className="px-3 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-green text-xs font-display transition-all">+7d</button>
                <button onClick={() => addDays(30)} className="px-3 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-yellow text-xs font-display transition-all">+30d</button>
              </div>
              <input type="date" value={dateInputValue} onChange={handleDateChange} className="w-full px-4 py-2 rounded-lg bg-dark-card border border-dark-border focus:border-neon-green font-body text-center text-sm" />
            </div>

            {/* Time Controls */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-neon-blue" />
                <label className="text-sm font-display text-neon-blue uppercase tracking-wider">⏱️ Select Time</label>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-3">
                <button onClick={() => addHours(-12)} className="px-2 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-blue text-xs font-display transition-all">-12h</button>
                <button onClick={() => addHours(-1)} className="px-2 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-blue text-xs font-display transition-all">-1h</button>
                <button onClick={() => addMinutes(-30)} className="px-2 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-purple text-xs font-display transition-all">-30m</button>
                <button onClick={() => addMinutes(30)} className="px-2 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-green text-xs font-display transition-all">+30m</button>
                <button onClick={() => addHours(1)} className="px-2 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-green text-xs font-display transition-all">+1h</button>
                <button onClick={() => addHours(12)} className="px-2 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-yellow text-xs font-display transition-all">+12h</button>
              </div>
              <input type="time" value={timeInputValue} onChange={handleTimeChange} className="w-full px-4 py-2 rounded-lg bg-dark-card border border-dark-border focus:border-neon-blue font-body text-center text-sm" />
            </div>
          </div>
        )}
      </div>

      {/* Status */}
      <div className="text-center text-xs text-gray-500">
        {Math.abs(selectedDate.getTime() - now.getTime()) < 1000 ? (
          <span className="text-neon-green">📡 Real-time Mode</span>
        ) : (
          <span className="text-neon-yellow">⏰ Time Travel: {Math.floor((selectedDate.getTime() - now.getTime()) / 86400000)} days</span>
        )}
      </div>
    </div>
  );
}
