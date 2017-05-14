# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import

import uuid
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.contrib.postgres.fields import JSONField


class Level(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(_('Level name'), max_length=255)
    blueprint = models.FileField(upload_to='blueprints', null=True)

    def __str__(self):
        return self.name


class Zone(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(_('Zone name'), max_length=255)
    color = models.CharField(_('Zone color'), max_length=255)
    level = models.ForeignKey(Level, on_delete=models.CASCADE)
    x = models.FloatField()
    y = models.FloatField()
    width = models.FloatField()
    height = models.FloatField()

    def __str__(self):
        return self.name + ' (' + self.level.name + ')'


class Sensor(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(_('Sensor name'), max_length=255)
    type = models.CharField(_('Sensor type'), max_length=255)
    zone = models.ForeignKey(Zone, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class SensorEvent(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateTimeField()
    data = JSONField()
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
