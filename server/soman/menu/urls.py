# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals
from django.conf.urls import url, include
from rest_framework import routers, serializers, viewsets
from . import views

router = routers.DefaultRouter()
router.register(r'menu-days', views.MenuDayViewSet)
# router.register('^levels/(?P<level>.+)/zones/$', views.ZoneList.as_view())

urlpatterns = [
    url(r'^api/', include(router.urls))
]
