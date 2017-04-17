# SF Bay Area Movies Locations on the Map
The application to explore the data from [SF Open Data site](https://data.sfgov.org/Culture-and-Recreation/Film-Locations-in-San-Francisco/yitu-d5am)
on the Google Map.

## Usage/Development/Deployment
### DEV
    npm install
    npm run serve
    open http://localhost:8080/

### production
    npm install
    PORT=80 npm start

## Deployment
- babel and webpack are installed in production to let build happen - overhead

## API Key
- in the main app it is hardcoded into `index.html`
- unlike `geocode` lib which uses `process.env.MAPS_KEY`

## Static server selection resoning
### `connect`
- last version of the package published 5 months ago
- 77,438 downloads in the last day
- 1,313,454 downloads in the last week
- 5,348,044 downloads in the last month

- 3 open issues on GitHub
- One open pull request on GitHub

### `express`

- last version of the package published  a week ago
- 175,422 downloads in the last day
- 2,364,346 downloads in the last week
- 8,668,198 downloads in the last month

- 99 open issues on GitHub
- 38 open pull requests on GitHub

## Docker support
to build image:

    docker build -t cy6erskunk/moviesmap .

PORT and/or MAPS_KEY might be passed as build-args:

    docker build -t cy6erskunk/moviesmap --build-arg PORT=8888 .

to run image:

    docker run -p 8080:8080 -d cy6erskunk/moviesmap

to get cintainer id:

    docker ps

to print app output

    docker logs <container id>  

to enter the container:

    docker exec -it <container id> /bin/sh