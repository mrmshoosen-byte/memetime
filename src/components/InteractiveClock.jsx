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
          {/* Clock Face SVG - Interactive */}
          <svg 
            width="280" 
            height="280" 
            viewBox="0 0 280 280" 
            className="drop-shadow-lg cursor-pointer hover:opacity-80 transition-opacity"
            onClick={(e) => {
              const svg = e.currentTarget;
              const rect = svg.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              
              // Convert to SVG coordinates
              const svgX = (x / rect.width) * 280;
              const svgY = (y / rect.height) * 280;
              
              // Calculate angle from center (140, 140)
              const centerX = 140;
              const centerY = 140;
              let angle = Math.atan2(svgY - centerY, svgX - centerX) * (180 / Math.PI);
              angle = angle + 90; // Adjust so 0° is at top
              if (angle < 0) angle += 360;
              
              // Determine if clicking closer to minute or hour hand
              const distance = Math.sqrt(Math.pow(svgX - centerX, 2) + Math.pow(svgY - centerY, 2));
              
              const newDate = new Date(selectedDate);
              
              if (distance > 50) {
                // Outer area = set minutes
                const minutes = Math.round((angle / 360) * 60) % 60;
                newDate.setMinutes(minutes);
              } else if (distance > 20) {
                // Inner area = set hours
                const hours = Math.round((angle / 360) * 12) % 12;
                newDate.setHours(hours);
              }
              
              setSelectedDate(newDate);
            }}
          >
            {/* Background Circle */}
            <circle cx="140" cy="140" r="135" fill="#151b3a" stroke="#00f0ff" strokeWidth="4" style={{filter: 'drop-shadow(0 0 20px rgba(0, 240, 255, 0.5))'}} />
            
            {/* Hour Numbers */}
            {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180);
              const x = 140 + 100 * Math.cos(angle);
              const y = 140 + 100 * Math.sin(angle);
              return (
                <text
                  key={num}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-display font-bold text-lg"
                  fill="#00f0ff"
                  style={{textShadow: '0 0 10px #00f0ff'}}
                >
                  {num}
                </text>
              );
            })}

            {/* Tick Marks */}
            {[...Array(60)].map((_, i) => {
              const isMajor = i % 5 === 0;
              const angle = (i * 6) * (Math.PI / 180);
              const x1 = 140 + 120 * Math.cos(angle);
              const y1 = 140 + 120 * Math.sin(angle);
              const x2 = 140 + (isMajor ? 110 : 115) * Math.cos(angle);
              const y2 = 140 + (isMajor ? 110 : 115) * Math.sin(angle);
              return (
                <line
                  key={`tick-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isMajor ? '#00f0ff' : '#2a3f6f'}
                  strokeWidth={isMajor ? 2 : 1}
                />
              );
            })}

            {/* Hour Hand */}
            <line
              x1="140"
              y1="140"
              x2={140 + 45 * Math.cos((hourAngle - 90) * (Math.PI / 180))}
              y2={140 + 45 * Math.sin((hourAngle - 90) * (Math.PI / 180))}
              stroke="#ff006e"
              strokeWidth="6"
              strokeLinecap="round"
              style={{transition: 'all 0.5s ease-in-out'}}
              filter="url(#glowPink)"
            />

            {/* Minute Hand */}
            <line
              x1="140"
              y1="140"
              x2={140 + 70 * Math.cos((minuteAngle - 90) * (Math.PI / 180))}
              y2={140 + 70 * Math.sin((minuteAngle - 90) * (Math.PI / 180))}
              stroke="#00f0ff"
              strokeWidth="4"
              strokeLinecap="round"
              style={{transition: 'all 0.5s ease-in-out'}}
              filter="url(#glowBlue)"
            />

            {/* Second Hand */}
            <line
              x1="140"
              y1="140"
              x2={140 + 80 * Math.cos((secondAngle - 90) * (Math.PI / 180))}
              y2={140 + 80 * Math.sin((secondAngle - 90) * (Math.PI / 180))}
              stroke="#ffff00"
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#glowYellow)"
            />

            {/* Center Dot */}
            <circle cx="140" cy="140" r="6" fill="#00f0ff" filter="url(#glowBlue)" />

            {/* Glow Filters */}
            <defs>
              <filter id="glowBlue">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glowPink">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glowYellow">
                <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

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
