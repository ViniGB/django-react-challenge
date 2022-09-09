import datetime
from django.db import models
from django.core.validators import MinLengthValidator, MaxLengthValidator
from django.utils.translation import gettext as _

# Create your models here.

class Communication(models.Model):
  name = models.CharField(max_length=50)
  email = models.CharField(max_length=50)
  cpf = models.CharField(max_length=11, validators=[MinLengthValidator(11)])
  latitude = models.DecimalField(max_digits=10, decimal_places=8, blank=True, null=True)
  longitude = models.DecimalField(max_digits=11, decimal_places=8, blank=True, null=True)
  croptype = models.CharField(max_length=10)
  harvestdate = models.DateField(_('Date'), default=datetime.date.today)
  lossevent = models.CharField(max_length=20)

  def _str_(self):
    return self.name
