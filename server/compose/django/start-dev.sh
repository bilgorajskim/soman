#!/bin/sh
python manage.py migrate
python manage.py loaddata auth
python manage.py runserver_plus 0.0.0.0:8000
