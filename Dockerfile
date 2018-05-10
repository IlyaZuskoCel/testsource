FROM node:8-alpine

COPY . /usr/src

WORKDIR /usr/src

RUN yarn install

ENV NODE_ENV=production
ENV NODE_ENV=development

RUN yarn run build

WORKDIR /

#nginx settings
COPY ./nginx.conf /etc/nginx/conf.d/app/

COPY ./run.sh /run.sh
RUN chmod +x run.sh


VOLUME ["/var/www/app", "/etc/nginx/conf.d/app"]
EXPOSE 80

#CMD ["./run.sh"]
CMD ["yarn", "run", "start:server"]