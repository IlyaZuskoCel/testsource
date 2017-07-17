FROM node:8-alpine as build

COPY . /usr/src

WORKDIR /usr/src

RUN yarn install

RUN yarn run build

FROM busybox

WORKDIR /var/www/app

#nginx settings
COPY ./nginx.conf /etc/nginx/conf.d/app/

COPY --from=build /var/www/app /var/www/app


VOLUME ["/var/www/app", "/etc/nginx/conf.d/app"]

CMD ["/bin/true"]