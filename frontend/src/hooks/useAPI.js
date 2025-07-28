import { useState, useCallback } from 'react';
import { mockOutline, mockInsights } from '../constants/mockData';

const API_BASE_URL = 'http://localhost:5000/api/pdf';

const useAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadPDF = useCallback(async (file) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file); // Important: match Flask key

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');
      return await response.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getOutline = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/outline`);
      if (!response.ok) throw new Error('Outline fetch failed');
      const data = await response.json();
      return data.outline || [];
    } catch (err) {
      return [];
    }
  }, []);

  const getInsights = useCallback(async (persona = 'Student') => {
    try {
      const response = await fetch(`${API_BASE_URL}/insights`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ persona }),
      });

      if (!response.ok) return mockInsights[persona] || [];
      const data = await response.json();
      return data.insights || [];
    } catch (err) {
      return mockInsights[persona] || [];
    }
  }, []);

  return { uploadPDF, getOutline, getInsights, loading, error };
};

export default useAPI;
