'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatNumber, formatPercent } from '@/lib/utils';

export default function MemecoinCard({ coin, index }) {
  const isPositive = coin.change24h >= 0;

  return (
    <div
      className="glow-border rounded-xl overflow-hidden backdrop-blur-sm group hover:shadow-2xl transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Header with coin info */}
      <div className="p-4 border-b border-dark-border bg-gradient-to-r from-dark-card to-transparent">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3">
            {coin.image && (
              <img
                src={coin.image}
                alt={coin.name}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div>
              <h3 className="font-display font-bold text-lg text-neon-blue group-hover:text-neon-purple transition-colors">
                {coin.name}
              </h3>
              <p className="text-xs font-display text-neon-purple uppercase tracking-wider">
                {coin.symbol}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className={`font-display font-bold text-lg ${isPositive ? 'text-neon-green' : 'text-neon-pink'}`}>
              ${coin.price.toFixed(coin.price < 0.01 ? 8 : 4)}
            </div>
          </div>
        </div>

        {/* 24h Change */}
        <div className="flex items-center gap-2">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-neon-green" />
          ) : (
            <TrendingDown className="w-4 h-4 text-neon-pink" />
          )}
          <span
            className={`font-display font-bold text-sm ${isPositive ? 'text-neon-green' : 'text-neon-pink'}`}
          >
            {formatPercent(coin.change24h)}
          </span>
          <span className="text-xs text-gray-500">24h Change</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-4 space-y-3">
        {/* Market Cap */}
        <div className="space-y-1">
          <p className="text-xs font-display text-neon-purple uppercase tracking-wider">
            Market Cap
          </p>
          <p className="text-lg font-bold text-neon-blue">
            {coin.marketCap ? formatNumber(coin.marketCap) : 'N/A'}
          </p>
        </div>

        {/* 24h Volume */}
        <div className="space-y-1 pt-2 border-t border-dark-border">
          <p className="text-xs font-display text-neon-green uppercase tracking-wider">
            24h Volume
          </p>
          <p className="text-lg font-bold text-neon-blue">
            {coin.volume24h ? formatNumber(coin.volume24h) : 'N/A'}
          </p>
        </div>

        {/* Sparkline Chart */}
        {coin.sparkline && coin.sparkline.length > 0 && (
          <div className="pt-3 border-t border-dark-border">
            <p className="text-xs font-display text-neon-pink uppercase tracking-wider mb-2">
              7-Day Chart
            </p>
            <svg
              className="w-full h-12"
              viewBox={`0 0 ${coin.sparkline.length} 50`}
              preserveAspectRatio="none"
            >
              {/* Grid lines */}
              <line
                x1="0"
                y1="25"
                x2={coin.sparkline.length}
                y2="25"
                stroke="#2a3f6f"
                strokeWidth="0.1"
              />

              {/* Price line */}
              <polyline
                points={coin.sparkline
                  .map((price, i) => {
                    const minPrice = Math.min(...coin.sparkline);
                    const maxPrice = Math.max(...coin.sparkline);
                    const range = maxPrice - minPrice || 1;
                    const normalized = (price - minPrice) / range;
                    return `${i},${50 - normalized * 50}`;
                  })
                  .join(' ')}
                fill="none"
                stroke={isPositive ? '#39ff14' : '#ff006e'}
                strokeWidth="0.3"
                vectorEffect="non-scaling-stroke"
              />

              {/* Gradient fill */}
              <defs>
                <linearGradient id={`grad-${coin.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop
                    offset="0%"
                    stopColor={isPositive ? '#39ff14' : '#ff006e'}
                    stopOpacity="0.3"
                  />
                  <stop
                    offset="100%"
                    stopColor={isPositive ? '#39ff14' : '#ff006e'}
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>
              <polygon
                points={`0,50 ${coin.sparkline
                  .map((price, i) => {
                    const minPrice = Math.min(...coin.sparkline);
                    const maxPrice = Math.max(...coin.sparkline);
                    const range = maxPrice - minPrice || 1;
                    const normalized = (price - minPrice) / range;
                    return `${i},${50 - normalized * 50}`;
                  })
                  .join(' ')} ${coin.sparkline.length},50`}
                fill={`url(#grad-${coin.id})`}
              />
            </svg>
          </div>
        )}
      </div>

      {/* Hover Effect Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />
    </div>
  );
}
