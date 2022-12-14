# Generated by Django 4.1.1 on 2022-09-07 18:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_alter_communication_cpf'),
    ]

    operations = [
        migrations.AlterField(
            model_name='communication',
            name='latitude',
            field=models.DecimalField(blank=True, decimal_places=8, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='communication',
            name='longitude',
            field=models.DecimalField(blank=True, decimal_places=8, max_digits=11, null=True),
        ),
    ]
