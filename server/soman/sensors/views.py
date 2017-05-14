from django.http import HttpResponse
from django.http import JsonResponse
from django.views.generic import View
from django.utils import timezone
from .serializers.sensor import SensorSerializer
from .serializers.zone import ZoneSerializer
from .models import Zone, Level, Sensor, SensorEvent
from rest_framework import routers, serializers, viewsets, generics
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

@csrf_exempt
def push_sensor_view(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    sensor = Sensor.objects.get(id=body['sensorId'])

    rawvalue = body['value']
    data = {}
    if sensor.type == 'water':
        data = {
            'waterDetected': True if rawvalue == 1 else False
        }
    if sensor.type == 'smoke':
        data = {
            'pollution': rawvalue
        }
    event = SensorEvent.objects.create(
        date=timezone.now(),
        sensor=sensor,
        data=data
    )
    event.save()
    return JsonResponse('Saved sensor event', safe=False)
