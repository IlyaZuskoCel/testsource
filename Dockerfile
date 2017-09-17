FROM node:8-alpine

COPY . /usr/src

WORKDIR /usr/src

RUN yarn install

RUN yarn run build

WORKDIR /var/www/app

#nginx settings
COPY ./nginx.conf /etc/nginx/conf.d/app/

VOLUME ["/var/www/app", "/etc/nginx/conf.d/app"]

CMD ["/bin/true"]