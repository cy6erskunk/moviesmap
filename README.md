# SF Bay Area Movies Locations on the Map
The application to explore the data from [SF Open Data site](https://data.sfgov.org/Culture-and-Recreation/Film-Locations-in-San-Francisco/yitu-d5am)
on the Google Map.

## Usage/Development/Deployment
### DEV

Dev env uses vercel under the hood

    npm install
    npm start

### VS Code configuration

- install [Officical Rome extension](https://marketplace.visualstudio.com/items?itemName=rome.rome)
- update worksapace `settings.json` file:
    ```
    "editor.defaultFormatter": "rome.rome",
    "editor.formatOnSave": true
    ```

## API Key
- unlike `geocode` lib which uses `process.env.MAPS_KEY`


