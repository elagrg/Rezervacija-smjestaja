//import fetch from 'node-fetch';

export const fetchAccommodationData = async () => {
    try {
      const response = await fetch('https://api.adriatic.hr/test/accommodation');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  