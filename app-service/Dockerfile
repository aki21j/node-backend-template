FROM keymetrics/pm2:18-alpine

ENV HOME=/home/node

# set timezone
RUN apk update
RUN apk upgrade
RUN apk add ca-certificates && update-ca-certificates
RUN apk add --update tzdata
ENV TZ=Asia/Calcutta
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Clean APK cache
RUN rm -rf /var/cache/apk/*

USER root

# set working dir
WORKDIR $HOME/app

# copy dep files to tmp folder
COPY package.json $HOME/tmp/
COPY yarn.lock $HOME/tmp/
RUN cd $HOME/tmp/ && yarn install --pure-lockfile


# copy stuff required for npm build to working dir
COPY src $HOME/app/src
COPY run.sh $HOME/app
RUN cp $HOME/tmp/package.json $HOME/app/package.json
RUN cp $HOME/tmp/yarn.lock $HOME/app/yarn.lock

# link node_modules installed in tmp folder to working dir
RUN cd $HOME/app && ln -s $HOME/tmp/node_modules

# build project
# RUN cd $HOME/app && yarn build

# copy pm2 config 
COPY pm2.json ./

# need to copy this to ensure correct env is used in the app
COPY .env ./

EXPOSE 3001
EXPOSE 9001