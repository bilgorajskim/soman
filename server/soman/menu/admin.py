# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.contrib import admin
from .models import MenuDay

@admin.register(MenuDay)
class MenuDayAdmin(admin.ModelAdmin):
    pass
