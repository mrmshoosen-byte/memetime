'use client';

import React, { useState, useEffect, useCallback } from 'react';
import InteractiveClock from '@/components/InteractiveClock';
import MemecoinCard from '@/components/MemecoinCard';
import NewsCard from '@/components/NewsCard';
import { Zap, Newspaper } from 'lucide-react';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [memecoins, setMemecoins] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data when date changes
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch memecoins data
      const coinsRes = await fetch(`/api/memecoins?date=${selectedDate.toISOString()}`);
      const coinsData = await coinsRes.json();

      if (coinsData.success) {
        setMemecoins(coinsData.data);
      }

      // Fetch news
      const newsRes = await fetch('/api/news');
      const newsData = await newsRes.json();

      if (newsData.success) {
        setNews(newsData.news);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Using cached data if available.');
    } finally {
      setLoading(false);
    }
  }, [selectedDate]);

  // Fetch data on mount and when date changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="min-h-screen px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 animate-fade-in-up">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-neon-blue animate-pulse" />
              <h1 className="text-5xl md:text-6xl font-display font-bold">
                <span className="neon-text">MEMECOIN</span>
                <span className="text-gray-400"> PORTAL</span>
              </h1>
              <Zap className="w-8 h-8 text-neon-purple animate-pulse" />
            </div>
            <p className="text-gray-400 text-lg font-body max-w-2xl mx-auto">
              Travel through time to discover memecoin market insights and breaking news at any moment in history
            </p>
          </div>

          {/* Clock Component */}
          <div className="max-w-2xl mx-auto mb-12">
            <InteractiveClock onDateChange={handleDateChange} />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-neon-pink bg-opacity-10 border border-neon-pink rounded-lg text-neon-pink text-sm font-body">
            ⚠️ {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="loading-spinner" />
            <span className="ml-4 text-neon-blue font-display">Loading portal data...</span>
          </div>
        )}

        {/* Content */}
        {!loading && (
          <>
            {/* Memecoins Section */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-neon-blue to-neon-purple rounded" />
                <h2 className="text-3xl md:text-4xl font-display font-bold text-neon-blue">
                  TOP MEMECOINS
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-neon-blue to-transparent" />
              </div>

              <p className="text-gray-400 mb-8 font-body">
                Real-time market data, prices, and 7-day performance charts
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {memecoins.length > 0 ? (
                  memecoins.map((coin, index) => (
                    <MemecoinCard key={coin.id} coin={coin} index={index} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 text-gray-500">
                    No data available
                  </div>
                )}
              </div>
            </section>

            {/* News Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-neon-purple to-neon-pink rounded" />
                <h2 className="text-3xl md:text-4xl font-display font-bold text-neon-purple flex items-center gap-3">
                  <Newspaper className="w-8 h-8" /> LATEST NEWS
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-neon-purple to-transparent" />
              </div>

              <p className="text-gray-400 mb-8 font-body">
                Breaking news and insights about memecoins and crypto markets
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.length > 0 ? (
                  news.map((article, index) => (
                    <NewsCard key={`${article.source}-${index}`} article={article} index={index} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 text-gray-500">
                    No news available
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-dark-border text-center text-gray-500 font-body text-sm">
          <p>
            Data powered by <span className="text-neon-blue">CoinGecko API</span> • News from
            <span className="text-neon-purple"> NewsAPI</span>
          </p>
          <p className="mt-2">
            ⚡ Built with Next.js • Ready to deploy on Vercel • Last updated:{' '}
            {new Date().toLocaleTimeString()}
          </p>
        </footer>
      </div>
    </div>
  );
}
