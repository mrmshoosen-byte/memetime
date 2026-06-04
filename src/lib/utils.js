// Top memecoins to track
export const MEMECOINS = {
  'dogecoin': 'doge',
  'shiba-inu': 'shib',
  'pepe': 'pepe',
  'floki': 'floki',
  'bonk': 'bonk',
  'baby-doge-coin': 'babydoge',
  'kabosu': 'kabosu',
  'brett': 'brett',
};

// Fetch memecoin data from CoinGecko API (client-side only)
export async function fetchMemecoinData(date = new Date()) {
  try {
    const formattedDate = date.toISOString().split('T')[0];
    
    // CoinGecko API - history endpoint
    const coinIds = Object.keys(MEMECOINS);
    const params = new URLSearchParams({
      vs_currency: 'usd',
      ids: coinIds.join(','),
      order: 'market_cap_desc',
      per_page: 100,
      sparkline: true,
    });

    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?${params}`,
      { signal: AbortSignal.timeout(5000) }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    return data.map((coin) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol?.toUpperCase(),
      price: coin.current_price || 0,
      marketCap: coin.market_cap || 0,
      volume24h: coin.total_volume || 0,
      change24h: coin.price_change_percentage_24h || 0,
      image: coin.image,
      sparkline: coin.sparkline_in_7d?.price || [],
    }));
  } catch (error) {
    console.error('Error fetching memecoin data:', error);
    return [];
  }
}

// Fetch news about memecoins (client-side only)
export async function fetchMemecoinNews() {
  try {
    // Using mock data by default to avoid build-time API calls
    return getMockNews();
  } catch (error) {
    console.error('Error fetching news:', error);
    return getMockNews();
  }
}

// Mock news data for demo purposes
function getMockNews() {
  return [
    {
      title: 'Shiba Inu Burns Hit New Milestone This Quarter',
      description: 'The Shiba Inu community continues aggressive burn strategy as SHIB price finds support.',
      source: 'Crypto News Daily',
      publishedAt: new Date(),
      url: '#',
      image: 'https://via.placeholder.com/300x200?text=Shiba+Inu',
    },
    {
      title: 'Dogecoin Community Celebrates Major Exchange Listing',
      description: 'Following strong community support, DOGE gains listing on major cryptocurrency exchange.',
      source: 'The Block',
      publishedAt: new Date(Date.now() - 3600000),
      url: '#',
      image: 'https://via.placeholder.com/300x200?text=Dogecoin',
    },
    {
      title: 'Memecoin Market Sentiment Shifts Positive',
      description: 'Trading volume and open interest in memecoins surge as retail investors return to market.',
      source: 'CryptoSlate',
      publishedAt: new Date(Date.now() - 7200000),
      url: '#',
      image: 'https://via.placeholder.com/300x200?text=Memecoins',
    },
    {
      title: 'Floki Development Team Announces Q4 Roadmap',
      description: 'New features and blockchain upgrades planned to enhance ecosystem functionality.',
      source: 'Coin Telegraph',
      publishedAt: new Date(Date.now() - 10800000),
      url: '#',
      image: 'https://via.placeholder.com/300x200?text=Floki',
    },
    {
      title: 'Pepe Community Reaches Major Milestone',
      description: 'Recent developments suggest growing institutional interest in community-driven projects.',
      source: 'Dune Analytics',
      publishedAt: new Date(Date.now() - 14400000),
      url: '#',
      image: 'https://via.placeholder.com/300x200?text=Pepe',
    },
  ];
}

// Format large numbers for display
export function formatNumber(num) {
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  return `$${num.toFixed(2)}`;
}

// Format percentage change
export function formatPercent(num) {
  if (num === null || num === undefined) return '0.00%';
  const sign = num >= 0 ? '+' : '';
  return `${sign}${num.toFixed(2)}%`;
}

// Get color based on value
export function getPriceColor(change) {
  if (change > 0) return '#39ff14'; // green
  if (change < 0) return '#ff006e'; // pink
  return '#00f0ff'; // blue
}
