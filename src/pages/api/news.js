import { fetchMemecoinNews } from '@/lib/utils';

export default async function handler(req, res) {
  try {
    const news = await fetchMemecoinNews();
    
    res.status(200).json({
      success: true,
      news,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch news',
    });
  }
}
