// Logic for determining the wind direction based on the windData parameter which is an array converting
// A direction (0 deg to 360 deg) into a string N,E,S, W 
export const windByDirection = (windData) => {
    if (Math.round(...windData) < 45) {
        return 'North'
        } else if (Math.round(...windData) >= 45 && Math.round(...windData) < 90) {
        return 'NE'
        } else if (Math.round(...windData) >= 90 && Math.round(...windData) < 135) {
          return 'East' 
        } else if (Math.round(...windData) >= 135 && Math.round(...windData) < 180) {
            return 'SE'
        } else if (Math.round(...windData) >= 180 && Math.round(...windData) < 225) {
          return 'South'
        } else if (Math.round(...windData) >= 225 && Math.round(...windData) < 270) {
          return 'SW'
        } else if (Math.round(...windData) >= 270 && Math.round(...windData) < 315){
          return 'West'
        } else if (Math.round(...windData) >= 315 ) {
          return 'NW'
        }
}

