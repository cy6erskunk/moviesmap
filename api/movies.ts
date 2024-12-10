export default async (req: any, res: any) => {
  const movies = await fetch(
    'https://data.sfgov.org/resource/wwmu-gmzc.json?$select=title,locations'
  )
    .then((response: any) => response.json())
    .then((data: any) =>
      data
        // filter out movies without locations
        .filter((movie: any) => movie.locations)
        // flatten structure to {`title`=>[locationName,...], ...}
        .reduce((prev: any, m: any) => {
          if (!prev[m.title]) {
            prev[m.title] = [];
          }

          prev[m.title].push(m.locations);

          return prev;
        }, {})
    );

  return res.json(movies);
};
