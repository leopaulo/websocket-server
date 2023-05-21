FROM node:18-alpine as base

WORKDIR /var/www/html

#----------------
# DEV
#----------------
FROM base as dev

COPY ./docker/start.sh /scripts/start.sh 
RUN chmod +x /scripts/start.sh 
ENTRYPOINT ["sh", "-c", "/scripts/start.sh"]

#----------------
# PROD
#----------------
FROM base as prod

COPY ./ ./

RUN npm config set fetch-retry-mintimeout 100000 && \
    npm config set fetch-retry-maxtimeout 100000 && \
    npm ci

COPY ./docker/start-prod.sh /scripts/start-prod.sh 
RUN chmod +x /scripts/start-prod.sh 
ENTRYPOINT ["/scripts/start-prod.sh"]