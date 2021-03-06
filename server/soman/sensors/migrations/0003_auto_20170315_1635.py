# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-15 16:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sensors', '0002_level_blueprint'),
    ]

    operations = [
        migrations.AddField(
            model_name='zone',
            name='height',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='zone',
            name='width',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='zone',
            name='x',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='zone',
            name='y',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
    ]
