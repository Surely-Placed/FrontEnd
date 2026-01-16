import { API_URLS } from '../../../utils/constants';
import axiosInstance from '../axiosInstance';

export const addCoachAPI = async (payload) => {
  return axiosInstance
    .post(API_URLS.ADD_COACH, payload, {
      skipAuth: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: [(data) => data],
    })
    .then((res) => res.data);
};

export const fetchDomainsAPI = async () => {
  return axiosInstance
    .get(API_URLS.FECTH_DOMAINS, {
      skipAuth: true,
    })
    .then((res) => res.data);
};

export const fetchCohortssAPI = async () => {
  return axiosInstance
    .get(API_URLS.FECTH_COHORTS, {
      skipAuth: true,
    })
    .then((res) => res.data);
};
