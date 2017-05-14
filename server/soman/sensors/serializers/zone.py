from django.http import HttpResponse
from django.views.generic import View

from .sensor import SensorSerializer
from soman.sensors.models import Zone
from rest_framework import routers, serializers, viewsets, generics
import django_filters.rest_framework


class ZoneSerializer(serializers.HyperlinkedModelSerializer):
    level = serializers.HyperlinkedRelatedField(view_name='sensors:level-detail', read_only=True, many=False)
    sensors = SensorSerializer(source='sensor_set', many=True)

    class Meta:
        model = Zone
        fields = ['id', 'name', 'level', 'color', 'width', 'height', 'x', 'y', 'sensors']
