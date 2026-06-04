'use client';

import React from 'react';
import { ExternalLink, Clock } from 'lucide-react';

export default function NewsCard({ article, index }) {
  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div
      className="glow-border rounded-xl overflow-hidden backdrop-blur-sm group hover:shadow-2xl transition-all duration-300 animate-fade-in-up h-full flex flex-col"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Image */}
      {article.image && (
        <div className="w-full h-48 overflow-hidden bg-dark-card relative">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=News';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Source and Date */}
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-dark-border">
          <span className="text-xs font-display bg-neon-blue bg-opacity-20 text-neon-blue px-2 py-1 rounded uppercase tracking-wider">
            {article.source}
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            {timeAgo(article.publishedAt)}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-sm leading-tight mb-2 text-neon-purple group-hover:text-neon-pink transition-colors">
          {article.title}
        </h3>

        {/* Description */}
        {article.description && (
          <p className="text-xs text-gray-400 mb-3 line-clamp-2 flex-1">
            {article.description}
          </p>
        )}

        {/* Read More Link */}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-display text-neon-green hover:text-neon-yellow transition-colors mt-auto"
        >
          Read Article <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-pink opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />
    </div>
  );
}
