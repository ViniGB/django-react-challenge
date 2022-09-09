from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import CommSerializer
from .models import Communication
import json
from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist

# Create your views here.

def front(request):
  context = { }
  return render(request, 'index.html', context)

@api_view(['GET', 'POST'])
def comm(request):

  if request.method == 'GET':
    comm = Communication.objects.all()
    serializer = CommSerializer(comm, many=True)
    return Response(serializer.data)

  elif request.method == 'POST':
    serializer = CommSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response({'Created Comm': serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def id_comm(request, pk):

  if request.method == 'GET':
    comm = Communication.objects.get(pk=pk)
    serializer = CommSerializer(comm)
    return Response(serializer.data)

@api_view(['POST'])
def cpf_comm(request):
  payload = json.loads(request.body)
  if request.method == 'POST':
    comm = Communication.objects.filter(cpf=payload['cpf'])
    serializer = CommSerializer(comm, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def data_comm(request):
  payload = json.loads(request.body)
  if request.method == 'POST':
    comm = Communication.objects.filter(harvestdate=payload['harvestdate'])
    serializer = CommSerializer(comm, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
def update_comm(request, pk):
  payload = json.loads(request.body)
  try:
    comm = Communication.objects.filter(pk=pk)
    comm.update(**payload)
    updatedComm = Communication.objects.get(pk=pk)
    serializer = CommSerializer(updatedComm)
    return Response({'Updated Comm': serializer.data}, status=status.HTTP_200_OK)
  except ObjectDoesNotExist as e:
    return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
  except Exception:
    return Response({'error': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['DELETE'])
def comm_detail(request, pk):
  try:
    comm = Communication.objects.get(pk=pk)
  except Communication.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)

  if request.method == 'DELETE':
    comm.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
