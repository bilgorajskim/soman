from soman.menu.models import MenuDay
from rest_framework import routers, serializers, viewsets, generics

class MenuDaySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MenuDay
        fields = ['id', 'date', 'breakfast', 'dinner', 'supper']
