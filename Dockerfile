FROM node:8-alpine

COPY . /usr/src

WORKDIR /usr/src

RUN yarn install

RUN yarn run build

WORKDIR /

#nginx settings
COPY ./nginx.conf /etc/nginx/conf.d/app/

COPY ./run.sh /run.sh
RUN chmod +x run.sh


VOLUME ["/var/www/app", "/etc/nginx/conf.d/app"]

CMD ["./run.sh"]