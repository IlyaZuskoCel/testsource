#!/bin/sh

if [ -z $GOOGLE_UA ]
then
  echo "no"
else
 sed -i'' -e "s;'%GOOGLE_UA%';'$GOOGLE_UA';g" /var/www/app/index.html
fi
