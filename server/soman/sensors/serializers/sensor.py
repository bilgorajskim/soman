from django.http import HttpResponse
from django.views.generic import View
from soman.sensors.models import Sensor
from rest_framework import routers, serializers, viewsets, generics
import django_filters.rest_framework


class SensorSerializer(serializers.HyperlinkedModelSerializer):
    zone = serializers.HyperlinkedRelatedField(view_name='sensors:zone-detail', read_only=True, many=False)

    class Meta:
        model = Sensor
        fields = ['id', 'name', 'zone', 'type']
