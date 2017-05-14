# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-27 09:09
from __future__ import unicode_literals

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MenuDay',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField()),
                ('breakfast', models.TextField()),
                ('dinner', models.TextField()),
                ('supper', models.TextField()),
            ],
        ),
    ]