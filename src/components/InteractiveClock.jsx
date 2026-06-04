'use client';

import React, { useState, useEffect } from 'react';

export default function InteractiveClock({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    onDateChange(selectedDate);
  }, [selectedDate, onDateChange]);

  const handleAddDays = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const handleAddHours = (hours) => {
    const newDate = new Date(selectedDate);
    newDate.setHours(newDate.getHours() + hours);
    setSelectedDate(newDate);
  };

  const handleAddMinutes = (minutes) => {
    const newDate = new Date(selectedDate);
    newDate.setMinutes(newDate.getMinutes() + minutes);
    setSelectedDate(newDate);
  };

  const handleReset = () => {
    setSelectedDate(new Date());
  };

  const handleDateInput = (e) => {
    const [year, month, day] = e.target.value.split('-');
    const newDate = new Date(year, parseInt(month) - 1, day);
    newDate.setHours(selectedDate.getHours(), selectedDate.getMinutes());
    setSelectedDate(newDate);
  };

  const handleTimeInput = (e) => {
    const [hours, minutes] = e.target.value.split(':');
    const newDate = new Date(selectedDate);
    newDate.setHours(parseInt(hours), parseInt(minutes), 0);
    setSelectedDate(newDate);
  };

  const dateValue = selectedDate.toISOString().split('T')[0];
  const timeValue = selectedDate.toTimeString().slice(0, 5);

  return (
    <div className="relative w-full">
      <div className="glow-border rounded-2xl p-8 mb-6 backdrop-blur-sm">
        <h2 className="text-lg font-display font-bold text-neon-blue mb-6">
          ⏰ TIME PORTAL
        </h2>

        {/* Display */}
        <div className="text-center mb-8 pb-8 border-b border-dark-border">
          <div className="text-4xl font-display font-bold neon-text mb-3">
            {selectedDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
          </div>
          <div className="text-2xl font-display font-bold text-neon-blue mb-3">
            {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })}
          </div>
        </div>

        {/* Date Controls */}
        <div className="mb-6">
          <div className="text-sm font-display text-neon-green mb-3 uppercase">📅 Date Controls</div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <button 
              onClick={() => handleAddDays(-30)}
              className="px-3 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-blue text-xs font-display"
            >
              -30d
            </button>
            <button 
              onClick={() => handleAddDays(-7)}
              className="px-3 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-blue text-xs font-display"
            >
              -7d
            </button>
            <button 
              onClick={() => handleAddDays(-1)}
              className="px-3 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-pink text-xs font-display"
            >
              -1d
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <button 
              onClick={() => handleAddDays(1)}
              className="px-3 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-green text-xs font-display"
            >
              +1d
            </button>
            <button 
              onClick={() => handleAddDays(7)}
              className="px-3 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-green text-xs font-display"
            >
              +7d
            </button>
            <button 
              onClick={() => handleAddDays(30)}
              className="px-3 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-yellow text-xs font-display"
            >
              +30d
            </button>
          </div>
          <input 
            type="date" 
            value={dateValue} 
            onChange={handleDateInput}
            className="w-full px-4 py-2 rounded-lg bg-dark-card border border-dark-border text-center text-sm"
          />
        </div>

        {/* Time Controls */}
        <div className="mb-6">
          <div className="text-sm font-display text-neon-blue mb-3 uppercase">⏱️ Time Controls</div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <button 
              onClick={() => handleAddHours(-12)}
              className="px-3 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-blue text-xs font-display"
            >
              -12h
            </button>
            <button 
              onClick={() => handleAddHours(-1)}
              className="px-3 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-blue text-xs font-display"
            >
              -1h
            </button>
            <button 
              onClick={() => handleAddMinutes(-30)}
              className="px-3 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-purple text-xs font-display"
            >
              -30m
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <button 
              onClick={() => handleAddMinutes(30)}
              className="px-3 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-green text-xs font-display"
            >
              +30m
            </button>
            <button 
              onClick={() => handleAddHours(1)}
              className="px-3 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-green text-xs font-display"
            >
              +1h
            </button>
            <button 
              onClick={() => handleAddHours(12)}
              className="px-3 py-2 bg-dark-card border border-dark-border rounded hover:border-neon-yellow text-xs font-display"
            >
              +12h
            </button>
          </div>
          <input 
            type="time" 
            value={timeValue} 
            onChange={handleTimeInput}
            className="w-full px-4 py-2 rounded-lg bg-dark-card border border-dark-border text-center text-sm"
          />
        </div>

        {/* Reset Button */}
        <button 
          onClick={handleReset}
          className="w-full px-4 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg font-display font-bold text-dark-bg uppercase"
        >
          ↻ Reset to Now
        </button>
      </div>
    </div>
  );
}
