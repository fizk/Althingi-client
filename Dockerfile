FROM node:17-alpine3.14 AS build-assets

WORKDIR /app

COPY ./src /app/src
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./tsconfig.json /app/tsconfig.json
COPY ./webpack.config.js /app/webpack.config.js
COPY ./babel.config.js /app/babel.config.js

RUN npm i; \
    npm run build.prod


FROM httpd:2.4.52-bullseye

EXPOSE 80

ARG API_URL=/graphql
ARG API_HOST=http://server:3000
ARG IMG_URL=/myndir
ARG IMG_HOST=http://thumbor:80

RUN echo "\
RewriteEngine On\n\
RewriteBase /\n\
RewriteRule ^index\.html$ - [L]\n\
RewriteCond %{REQUEST_FILENAME} !-f\n\
RewriteCond %{REQUEST_FILENAME} !-d\n\
RewriteRule . /index.html [L]\
" > /usr/local/apache2/htdocs/.htaccess

RUN sed -i 's/#LoadModule proxy_module/LoadModule proxy_module/g' /usr/local/apache2/conf/httpd.conf; \
    sed -i 's/#LoadModule proxy_http_module/LoadModule proxy_http_module/g' /usr/local/apache2/conf/httpd.conf; \
    sed -i 's/#LoadModule rewrite_module/LoadModule rewrite_module/g' /usr/local/apache2/conf/httpd.conf; \
    sed -i 's/#LoadModule deflate_module/LoadModule deflate_module/g' /usr/local/apache2/conf/httpd.conf; \
    sed -i 's/AllowOverride None/AllowOverride All/g' /usr/local/apache2/conf/httpd.conf; \
    echo " <Location /server-status>\n \
SetHandler server-status\n \
</Location>\n\
ProxyPass ${API_URL} ${API_HOST} \nProxyPass ${IMG_URL} ${IMG_HOST} \n \
AddOutputFilterByType DEFLATE text/plain \n \
AddOutputFilterByType DEFLATE text/html \n \
AddOutputFilterByType DEFLATE text/xml \n \
AddOutputFilterByType DEFLATE text/css \n \
AddOutputFilterByType DEFLATE application/xml \n \
AddOutputFilterByType DEFLATE application/xhtml+xml \n \
AddOutputFilterByType DEFLATE application/rss+xml \n \
AddOutputFilterByType DEFLATE application/json \n \
AddOutputFilterByType DEFLATE application/javascript \n \
AddOutputFilterByType DEFLATE application/x-javascript " >> /usr/local/apache2/conf/httpd.conf;

COPY --from=build-assets /app/dist/ /usr/local/apache2/htdocs