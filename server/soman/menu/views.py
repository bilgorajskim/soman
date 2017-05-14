from .serializers.menu_day import MenuDaySerializer
from .models import MenuDay
from rest_framework import routers, serializers, viewsets, generics
import django_filters.rest_framework

class MenuDayViewSet(viewsets.ModelViewSet):
    queryset = MenuDay.objects.all()
    serializer_class = MenuDaySerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filter_fields = ['date']


class MenuDayList(generics.ListAPIView):
    serializer_class = MenuDaySerializer

    def get_queryset(self):
        date = self.kwargs['date']
        queryset = MenuDay.objects.filter(date=date)
        return queryset
