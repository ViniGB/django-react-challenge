import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:8000`,
});

export const requestComms = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
}

export const requestCommById = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
}

export const createComms = async (endpoint, body) => {
  await api.post(endpoint, body);
}

export const deleteComm = async (endpoint, id) => {
  const { data } = await api.delete(endpoint, id);
  return data;
}

export const updateComm = async (endpoint, body) => {
  const { data } = await api.put(endpoint, body);
  return data;
}

export const requestCommByCpf = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
}

export const requestCommByDate = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
}