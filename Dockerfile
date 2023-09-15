# build image
FROM node:18 AS build

# TODO! FAIL install google-chrome-stable
# chrome webdriver setup for angular unit testing
# RUN apt-get update && \
#     apt-get install -y gnupg wget curl unzip --no-install-recommends && \
#     wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
#     echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list && \
#     apt-get update -y && \
#     apt-get install -y google-chrome-stable && \
#     CHROMEVER=$(google-chrome --product-version | grep -o "[^\.]*\.[^\.]*\.[^\.]*") && \
#     DRIVERVER=$(curl -s "https://chromedriver.storage.googleapis.com/LATEST_RELEASE_$CHROMEVER") && \
#     wget -q --continue -P /chromedriver "http://chromedriver.storage.googleapis.com/$DRIVERVER/chromedriver_linux64.zip" && \
#     unzip /chromedriver/chromedriver* -d /chromedriver

# set working directory
WORKDIR /usr/shortly

# install and cache app dependencies
COPY package.json package-lock.json ./
RUN npm clean-install

# add app
COPY / .

# TODO! Enable once success install google-chrome-stable
# run test
# RUN npm run test

# generate build
RUN npm run build

# server image
FROM nginx:stable

# copy artifact build from the 'build environment'
COPY --from=build /usr/shortly/dist/shortly /usr/share/nginx/html

# copy nginx config
COPY docker-nginx.conf /etc/nginx/conf.d/
