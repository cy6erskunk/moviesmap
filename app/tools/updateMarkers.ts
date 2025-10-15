export default (
  google: any,
  { markers, locations, movieTitle, map, infoWindow }: any
) => {
  markers.forEach((m: any, i: any, array: any) => {
    m.map = null;
    array[i] = null;
  });
  // markers = []
  const newMarkers = Object.keys(locations).map(
    (locationKey) =>
      new google.maps.marker.AdvancedMarkerElement({
        position: locations[locationKey],
        map,
        title: locationKey
      })
  );

  newMarkers.forEach((marker) => {
    marker.addListener('click', () => {
      infoWindow.setContent(`<h2>${marker.title}</h2><p>${movieTitle}</p>`);
      infoWindow.open(map, marker);
    });
  });
  return newMarkers;
};
