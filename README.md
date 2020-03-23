# oneboard

a [Sails v1](https://sailsjs.com) application for controlling and visualizing IoT modules.

# Getting Started
```
npm install
cp config/local.example.js config/local.js
```
* Set the configuration params in config/local.js 
* Run `sails lift`

# Docker image building
* Run `docker build -t zgod/oneboard .` inside the project root directory.
* Run `docker save zgod/oneboard > oneboard.tar.gz` to save the docker image as tar file.

# Docker deployment
* Download the oneboard.tar.gz file.
* docker load --input oneboard.tar.gz
* Make a local copy of the config/local.js file and make the changes as instructed above.
* docker run -d --rm -p 1337:1337 -v /home/seil/Applications/oneboard/local.js:/home/node/oneboard/config/local.js zgod/oneboard
* Deploy as a service in docker swarm
`docker service create --name oneboard -p 1337:1337 --mount type=bind,source=/home/shinjan/Workspaces/oneboard/config/local.js,destination=/home/node/oneboard/config/local.js,readonly zgod/oneboard`