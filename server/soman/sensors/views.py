from django.http import HttpResponse
from django.http import JsonResponse
from django.views.generic import View
from django.utils import timezone
from .serializers.sensor import SensorSerializer
from .serializers.zone import ZoneSerializer
from .models import Zone, Level, Sensor, SensorEvent
from rest_framework import routers, serializers, viewsets, generics, filters
from rest_framework.pagination import PageNumberPagination
import django_filters.rest_framework
import datetime
import json
from django.views.decorators.csrf import csrf_exempt


class LevelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Level
        fields = ['id', 'name', 'blueprint']


class LevelViewSet(viewsets.ModelViewSet):
    queryset = Level.objects.all()
    serializer_class = LevelSerializer


class ZoneViewSet(viewsets.ModelViewSet):
    queryset = Zone.objects.all()
    serializer_class = ZoneSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filter_fields = ['level']


class ZoneList(generics.ListAPIView):
    serializer_class = ZoneSerializer

    def get_queryset(self):
        level = self.kwargs['level']
        queryset = Zone.objects.filter(level=level)
        return queryset


class SensorViewSet(viewsets.ModelViewSet):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer


class SensorEventSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = SensorEvent
        fields = ['id', 'sensor_id', 'date', 'data']


class SensorSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class SensorEventViewSet(viewsets.ModelViewSet):
    queryset = SensorEvent.objects.all()
    serializer_class = SensorEventSerializer
    pagination_class = SensorSetPagination
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ('date',)
    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = SensorEvent.objects.all()
        sensor_id = self.request.query_params.get('sensor_id', None)
        if sensor_id is not None:
            queryset = queryset.filter(sensor_id=sensor_id)
        return queryset

@csrf_exempt
def push_sensor_view(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    sensor = Sensor.objects.get(id=body['sensorId'])

    rawvalue = body['value']
    event = SensorEvent.objects.create(
        date=timezone.now(),
        sensor=sensor,
        data={
            'value': rawvalue
        }
    )
    event.save()
    return JsonResponse('Saved sensor event', safe=False)
