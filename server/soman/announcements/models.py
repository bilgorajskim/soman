# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import

import uuid
from django.db import models

class Announcement(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateField()
    text = models.TextField()
    title = models.CharField(max_length=255, null=True)

    def __str__(self):
        return str(self.title)
