# Frontend Central Logging API
service api to get logging by day and monthly from elasticsearch central-logging

Prequirement:
- NodeJS version 10.19.0
- NPM version 6.14.4
- Docker version 20.10.12

# Running project via bash script:

* Add file credential gcp, example : centrallogging-991897-d49d7c566632.json in your project.

* Install packages:

    ```bash
    yarn install
    ```

* Running project:

    ```bash
    yarn start
    ```
* Open http://your-ip-address:3000 to check it.

# Running project via docker:

* Create docker image with command " docker build --tag <name-docker-image> . " :
    ```bash
        docker build --tag fe-central-log .
    ```

* Create docker container with command " docker run -d -p port-container:port-image --name <name-container> <name-docker-image> " :
    ```bash
        docker run -d -p 3005:3000 --name fe-central-logging fe-central-log
    ```
* Open http://your-ip-address:3005 to check it.