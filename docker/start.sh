#!/usr/bin/env sh

# npm install if /package-lock.json is not yet existing
[ ! -f "./package-lock.json" ] && \
echo -e "\033[1;35m Installing NPM package via npm install... \033[0m" && \
npm install --verbose

# npm ci if /node_modules is not yet existing
[ ! -d "./node_modules" ] && \
echo -e "\033[1;35m Installing NPM package via npm ci... \033[0m" && \
npm ci --verbose


echo -e "\033[1;35m WS service start \033[0m"  
npm run start-dev