#!/bin/sh

if [ -z $GOOGLE_UA ]
then
  echo "no"
else
 sed -i'' -e "s;'%GOOGLE_UA%';'$GOOGLE_UA';g" /var/www/app/index.html
fi

if [ -z $INTERCOM_ID ]
then
  echo "no"
else
 sed -i'' -e "s;'%INTERCOM_ID%';'$INTERCOM_ID';g" /var/www/app/index.html
fi