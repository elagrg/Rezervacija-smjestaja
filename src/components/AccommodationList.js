import React, { useEffect, useState } from 'react';
import { fetchAccommodationData } from '../services/api';

const AccommodationList = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [expandedAccommodation, setExpandedAccommodation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAccommodationData();
      setAccommodations(data);
    };

    fetchData();
  }, []);

  const handleExpandAccommodation = (id) => {
    setExpandedAccommodation((prev) => (prev === id ? null : id));          
  };

  return (
    <div>
      <h1>Smještaji</h1>
      <ul>
        {accommodations.map((accommodation) => (
          <li key={accommodation.id} >
            <div
              onClick={() => handleExpandAccommodation(accommodation.id)}
              style={{ cursor: 'pointer' }}
            >
              <h2>{accommodation.title}</h2>
              <img src={accommodation.image} alt={accommodation.title} />
            </div>
            <p>Kapacitet: {accommodation.capacity}</p>
            {accommodation.beachDistanceInMeters && (
            <p>Udaljenost do plaže: {accommodation.beachDistanceInMeters} metara</p>
            )}
            {expandedAccommodation === accommodation.id && (
                <div>
                  <h4>Dodatna ponuda:</h4>
                  <ul>
                    <li>Klimatizacija: {accommodation.amenities.airConditioning ? 'Da' : 'Ne'}</li>
                    <li>Parking mjesto: {accommodation.amenities.parkingSpace ? 'Da' : 'Ne'}</li>
                    <li>Kućni ljubimci: {accommodation.amenities.pets ? 'Da' : 'Ne'}</li>
                    <li>Bazen: {accommodation.amenities.pool ? 'Da' : 'Ne'}</li>
                    <li>Wifi: {accommodation.amenities.wifi ? 'Da' : 'Ne'}</li>
                    <li>Tv: {accommodation.amenities.tv ? 'Da' : 'Ne'}</li>
                  </ul>
                  <h4>Cijena:</h4>
                  <ul>
                    {accommodation.pricelistInEuros.map((price) => (
                      <li key={price.intervalStart}>
                        {price.intervalStart} - {price.intervalEnd}: {price.pricePerNight} € per night
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccommodationList;