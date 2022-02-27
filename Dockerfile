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
    sed -i 's/AllowOverride None/AllowOverride All/g' /usr/local/apache2/conf/httpd.conf;

COPY --from=build-assets /app/dist/ /usr/local/apache2/htdocs