# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-15 10:58
from __future__ import unicode_literals

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Level',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255, verbose_name='Level name')),
            ],
        ),
        migrations.CreateModel(
            name='Sensor',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255, verbose_name='Sensor name')),
            ],
        ),
        migrations.CreateModel(
            name='SensorEvent',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField()),
                ('data', django.contrib.postgres.fields.jsonb.JSONField()),
                ('sensor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sensors.Sensor')),
            ],
        ),
        migrations.CreateModel(
            name='Zone',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255, verbose_name='Zone name')),
                ('level', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sensors.Level')),
            ],
        ),
        migrations.AddField(
            model_name='sensor',
            name='zone',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sensors.Zone'),
        ),
    ]
