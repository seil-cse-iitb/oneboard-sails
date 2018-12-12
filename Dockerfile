FROM node:8
WORKDIR /home/node/
COPY . ./oneboard/
RUN npm -g install sails
EXPOSE 1337
WORKDIR oneboard/
ENTRYPOINT sails lift