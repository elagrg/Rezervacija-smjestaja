export const calculateTotalPrice = (accommodation, startDate, endDate) => {

    let totalAccommodationPrice = 0;

    if (startDate < endDate) {
        for (let i = 0; i < accommodation.pricelistInEuros.length; i++) {
            const intervalStart = new Date(accommodation.pricelistInEuros[i].intervalStart);
            const intervalEnd = new Date(accommodation.pricelistInEuros[i].intervalEnd);
        
            if (startDate >= intervalStart && endDate <= intervalEnd) {
              const pricePerNight = accommodation.pricelistInEuros[i].pricePerNight;
              const nightsInRange = calculateNightsInRange(startDate, endDate);
              totalAccommodationPrice += pricePerNight * nightsInRange;
              break;
            }
          }
    }
  
    return totalAccommodationPrice;
  };
  
  const calculateNightsInRange = (startDate, endDate) => {
    const timeDiff = endDate - startDate;
    const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));      
    return nights;
  };
  