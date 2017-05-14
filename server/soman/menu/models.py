# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import

import uuid
from django.db import models

class MenuDay(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateField()
    breakfast = models.TextField()
    dinner = models.TextField()
    supper = models.TextField()

    def __str__(self):
        return str(self.date)
