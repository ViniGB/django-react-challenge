export const getCoordinatesDistance = (lat1, lon1, lat2, lon2) => {
  const earthRadius = 6371;
  const rLat = swapDegToRad(lat2 - lat1);
  const rLon = swapDegToRad(lon2 - lon1);
  const dist = 
    Math.sin(rLat/2) * Math.sin(rLat/2) +
    Math.cos(swapDegToRad(lat1)) * Math.cos(swapDegToRad(lat2)) *
    Math.sin(rLon/2) * Math.sin(rLon/2);
  const newDist = 2 * Math.atan2(Math.sqrt(dist), Math.sqrt(1-dist));
  const distance = earthRadius * newDist;
  return distance < 10 ? true : false;
}

const swapDegToRad = (deg) => {
  return deg * (Math.PI/180)
};