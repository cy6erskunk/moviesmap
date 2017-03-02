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