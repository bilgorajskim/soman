# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals
from django.conf.urls import url, include
from rest_framework import routers, serializers, viewsets
from . import views

router = routers.DefaultRouter()
router.register(r'announcements', views.AnnouncementViewSet)

urlpatterns = [
    url(r'^api/', include(router.urls))
]
