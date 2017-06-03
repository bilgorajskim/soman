from soman.announcements.models import Announcement
from rest_framework import routers, serializers, viewsets, generics

class AnnouncementSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Announcement
        fields = ['id', 'date', 'title', 'text']
