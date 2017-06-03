from .serializers.announcement import AnnouncementSerializer
from .models import Announcement
from rest_framework import routers, serializers, viewsets, generics
import django_filters.rest_framework

class AnnouncementViewSet(viewsets.ModelViewSet):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filter_fields = ['date']


class AnnouncementList(generics.ListAPIView):
    serializer_class = AnnouncementSerializer

    def get_queryset(self):
        date = self.kwargs['date']
        queryset = Announcement.objects.filter(date=date)
        return queryset
