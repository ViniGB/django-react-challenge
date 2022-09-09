import email
from rest_framework import serializers
from .models import Communication

class CommSerializer(serializers.ModelSerializer):
  class Meta:
    model = Communication
    fields = '__all__'