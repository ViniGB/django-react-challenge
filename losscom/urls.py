"""losscom URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from core.views import data_comm, front, comm, id_comm, cpf_comm, comm_detail, update_comm

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', front, name='front'),
    path('communication/', comm, name='comm'),
    path('communication/<int:pk>', id_comm, name='id_comm'),
    path('communication/cpf', cpf_comm, name ='cpf_comm'),
    path('communication/date', data_comm, name ='data_comm'),
    path('communication/update/<int:pk>', update_comm, name='update'),
    path('communication/delete/<int:pk>', comm_detail, name='detail'),
]
