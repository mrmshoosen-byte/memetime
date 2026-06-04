import { fetchMemecoinData } from '@/lib/utils';

export default async function handler(req, res) {
  try {
    const { date } = req.query;
    const selectedDate = date ? new Date(date) : new Date();
    
    const data = await fetchMemecoinData(selectedDate);
    
    res.status(200).json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch memecoin data',
    });
  }
}
