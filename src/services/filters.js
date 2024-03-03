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
  
      return true;
    });
  };