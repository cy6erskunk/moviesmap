export default (
  google: any,
  { markers, locations, movieTitle, map, infoWindow }: any
) => {
  markers.forEach((m: any, i: any, array: any) => {
    m.setMap(null);
    array[i] = null;
  });
  // markers = []
  const newMarkers = Object.keys(locations).map(
    (locationKey) =>
      new google.maps.Marker({
        position: locations[locationKey],
        map,
        title: locationKey,
        something: movieTitle
      })
  );

  newMarkers.forEach((marker) => {
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.setContent(`<h2>${marker.title}</h2><p>${movieTitle}</p>`);
      infoWindow.open(map, marker);
    });
  });
  return newMarkers;
};
