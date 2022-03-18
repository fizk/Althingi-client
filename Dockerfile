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

ARG ENV

ARG API_URL=/graphql
ARG API_HOST=http://server:3000
ARG IMG_URL=/myndir
ARG IMG_HOST=http://thumbor:80
ARG DOMAIN=loggjafarthing.einarvalur.co

RUN sed -i 's/#LoadModule proxy_module/LoadModule proxy_module/g' /usr/local/apache2/conf/httpd.conf; \
    sed -i 's/#LoadModule proxy_http_module/LoadModule proxy_http_module/g' /usr/local/apache2/conf/httpd.conf; \
    sed -i 's/#LoadModule rewrite_module/LoadModule rewrite_module/g' /usr/local/apache2/conf/httpd.conf; \
    sed -i 's/#LoadModule deflate_module/LoadModule deflate_module/g' /usr/local/apache2/conf/httpd.conf; \
    sed -i 's/#LoadModule negotiation_module/LoadModule negotiation_module/g' /usr/local/apache2/conf/httpd.conf; \
    sed -i 's/#LoadModule socache_shmcb_module/LoadModule socache_shmcb_module/g' /usr/local/apache2/conf/httpd.conf; \
    sed -i 's/#LoadModule ssl_module/LoadModule ssl_module/g' /usr/local/apache2/conf/httpd.conf; \
    sed -i 's/#LoadModule http2_module/LoadModule http2_module/g' /usr/local/apache2/conf/httpd.conf; \
    sed -i 's/AllowOverride None/AllowOverride All/g' /usr/local/apache2/conf/httpd.conf; \
    echo " <Location /server-status>\n \
SetHandler server-status\n \
</Location>\n\
ProxyPass ${API_URL} ${API_HOST} \nProxyPass ${IMG_URL} ${IMG_HOST} \n \
AddOutputFilterByType DEFLATE text/plain \n\
AddOutputFilterByType DEFLATE text/html \n\
AddOutputFilterByType DEFLATE text/xml \n\
AddOutputFilterByType DEFLATE text/css \n\
AddOutputFilterByType DEFLATE application/xml \n\
AddOutputFilterByType DEFLATE application/xhtml+xml \n\
AddOutputFilterByType DEFLATE application/rss+xml \n\
AddOutputFilterByType DEFLATE application/json \n\
AddOutputFilterByType DEFLATE application/javascript \n\
AddOutputFilterByType DEFLATE application/x-javascript\n\n" >> /usr/local/apache2/conf/httpd.conf;

RUN if [ "$ENV" != "production" ] ; then \
    echo "<VirtualHost *:80> \n\
    ServerAdmin fizk78@gmail.com \n\
    DocumentRoot /usr/local/apache2/htdocs \n\
    \n\
    <Directory /usr/local/apache2/htdocs/> \n\
        Options Indexes FollowSymLinks \n\
        AllowOverride None \n\
        Require all granted \n\n\
        \
        RewriteEngine on \n\
        RewriteCond %{REQUEST_FILENAME} !-d \n\
        RewriteCond %{REQUEST_FILENAME} !-f \n\
        RewriteRule . /index.html [L] \n\
    </Directory> \n\
    \n\
</VirtualHost>" >> /usr/local/apache2/conf/httpd.conf;\
fi ;

RUN if [ "$ENV" = "production" ] ; then \
    echo "Listen 443\n \
<VirtualHost *:80> \n\
    ServerAdmin fizk78@gmail.com \n\
    DocumentRoot /usr/local/apache2/htdocs \n\
    \n\
    <Directory /usr/local/apache2/htdocs/> \n\
        Options Indexes FollowSymLinks \n\
        AllowOverride None \n\
        Require all granted \n\n\
        \
        RewriteEngine on \n\
        RewriteCond %{SERVER_NAME} =${DOMAIN} \n\
        RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent] \n\
    </Directory> \n\
</VirtualHost> \n\
<IfModule mod_ssl.c> \n\
    <VirtualHost *:443> \n\
        ServerAdmin fizk78@gmail.com \n\
        DocumentRoot /usr/local/apache2/htdocs \n\
        Protocols h2 h2c http/1.1 \n\
        \n\
        <Directory /usr/local/apache2/htdocs/> \n\
            Options Indexes FollowSymLinks \n\
            AllowOverride None \n\
            Require all granted \n\n\
            RewriteEngine on \n\
            RewriteCond %{REQUEST_FILENAME} !-d \n\
            RewriteCond %{REQUEST_FILENAME} !-f \n\
            RewriteRule . /index.html [L] \n\
        </Directory> \n\
        \n\
        ServerName ${DOMAIN} \n\
        SSLCertificateFile /etc/letsencrypt/live/${DOMAIN}/fullchain.pem \n\
        SSLCertificateKeyFile /etc/letsencrypt/live/${DOMAIN}/privkey.pem \n\
        Include /etc/letsencrypt/options-ssl-apache.conf \n\
    </VirtualHost> \n\
</IfModule> \n\
<Location /> \n\
    Header add Link \"</bundle.js>;rel=preload\" \n\
    Header add Link \"</main.css>;rel=preload\" \n\
</Location>" >> /usr/local/apache2/conf/httpd.conf;\
fi ;

COPY --from=build-assets /app/dist/ /usr/local/apache2/htdocs
