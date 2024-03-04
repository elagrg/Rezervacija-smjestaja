import { calculateTotalPrice } from './cijena';

export const filterAccommodations = (accommodations, filters) => {

    return accommodations.filter((accommodation) => {     
      const {
        capacityFilter,
        airConditioningFilter,
        parkingSpaceFilter,
        petsFilter,         
        poolFilter,
        wifiFilter,
        tvFilter,
        intervalStartFilter,
        intervalEndFilter,
      } = filters;
        

      if (capacityFilter && accommodation.capacity < parseInt(capacityFilter, 10)) {
        return false;
      }

      if (airConditioningFilter && !accommodation.amenities.airConditioning) {
        return false;
      }

      if (parkingSpaceFilter && !accommodation.amenities.parkingSpace) {
        return false;
      }

      if (petsFilter && !accommodation.amenities.pets) {
        return false;
      }

      if (poolFilter && !accommodation.amenities.pool) {
        return false;
      }

      if (wifiFilter && !accommodation.amenities.wifi) {
        return false;
      }

      if (tvFilter && !accommodation.amenities.tv) {
        return false;
      }

      if (intervalStartFilter && intervalEndFilter) {

        const startDate = new Date(intervalStartFilter);
        const endDate = new Date(intervalEndFilter);

        let hasAvailableDates = false;

        for (let i = 0; i < accommodation.availableDates.length; i++) {
          const intervalStart = new Date(accommodation.availableDates[i].intervalStart);
          const intervalEnd = new Date(accommodation.availableDates[i].intervalEnd);

          if (startDate >= intervalStart && endDate <= intervalEnd) {
            hasAvailableDates = true;
            //totalAccommodationPrice = calculateTotalPrice(accommodation, startDate, endDate);
            break;
          }
        }
    
        if (!hasAvailableDates) {
          return false;
        }

        accommodation.totalAccommodationPrice = calculateTotalPrice(accommodation, startDate, endDate);
      }


      return true;
    });
  };