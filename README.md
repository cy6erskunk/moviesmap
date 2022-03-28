# SF Bay Area Movies Locations on the Map
The application to explore the data from [SF Open Data site](https://data.sfgov.org/Culture-and-Recreation/Film-Locations-in-San-Francisco/yitu-d5am)
on the Google Map.

## Usage/Development/Deployment
### DEV
    npm install
    npm i -g vercel
    vercel dev

### production
    npm install
    PORT=80 npm start

## Deployment
- babel and webpack are installed in production to let build happen - overhead

## API Key
- in the main app it is hardcoded into `index.html`
- unlike `geocode` lib which uses `process.env.MAPS_KEY`
