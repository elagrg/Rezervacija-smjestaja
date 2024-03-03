import React, { useEffect, useState } from 'react';
import { fetchAccommodationData } from '../services/api';
import { filterAccommodations } from '../services/filters';

const AccommodationList = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [expandedAccommodation, setExpandedAccommodation] = useState(null);

  const [filters, setFilters] = useState({
    capacityFilter: '',
    airConditioningFilter: false,
    parkingSpaceFilter: false,
    petsFilter: false,
    poolFilter: false,
    wifiFilter: false,
    tvFilter: false,
  });
  
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

  const handleFilterChange = (filter, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filter]: value }));
  };

  const filteredAccommodations = filterAccommodations(accommodations, filters);

  return (
    <div>
      <h2>Filtriraj smještaje:</h2>
      <div>
        <label>
          Kapacitet:
          <input
            type="number"
            value={filters.capacityFilter}
            onChange={(e) => handleFilterChange('capacityFilter', e.target.value)}
          />
        </label>

        <div>
          <label>Klimatizacija:</label>
          <input
            type="checkbox"
            checked={filters.airConditioningFilter}
            onChange={() => handleFilterChange('airConditioningFilter', !filters.airConditioningFilter)}
          />
        </div>

        <div>
          <label>Parking:</label>
          <input
            type="checkbox"
            checked={filters.parkingSpaceFilter}
            onChange={() => handleFilterChange('parkingSpaceFilter', !filters.parkingSpaceFilter)}
          />
        </div>

        <div>
          <label>Kućni ljubimci:</label>
          <input
            type="checkbox"
            checked={filters.petsFilter}
            onChange={() => handleFilterChange('petsFilter', !filters.petsFilter)}
          />
        </div>

        <div>
          <label>Bazen:</label>
          <input
            type="checkbox"
            checked={filters.poolFilter}
            onChange={() => handleFilterChange('poolFilter', !filters.poolFilter)}
          />
        </div>

        <div>
          <label>Wifi:</label>
          <input
            type="checkbox"
            checked={filters.wifiFilter}
            onChange={() => handleFilterChange('wifiFilter', !filters.wifiFilter)}
          />
        </div>

        <div>
          <label>Tv:</label>
          <input
            type="checkbox"
            checked={filters.tvFilter}
            onChange={() => handleFilterChange('tvFilter', !filters.tvFilter)}
          />
        </div>
      </div>
      <ul>
        {filteredAccommodations.map((accommodation) => (
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
                        {price.intervalStart} - {price.intervalEnd}: {price.pricePerNight} €
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