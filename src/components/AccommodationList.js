import React, { useEffect, useState } from 'react';
import { fetchAccommodationData } from '../services/api';

const AccommodationList = () => {
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAccommodationData();
      setAccommodations(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Smještaji</h1>
      <ul>
        {accommodations.map((accommodation) => (
          <li key={accommodation.id}>
            <h2>{accommodation.title}</h2>
            <img src={accommodation.image} alt={accommodation.title} />
            <p>Kapacitet: {accommodation.capacity}</p>
            {accommodation.beachDistanceInMeters && (
            <p>Udaljenost do plaže: {accommodation.beachDistanceInMeters} metara</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccommodationList;