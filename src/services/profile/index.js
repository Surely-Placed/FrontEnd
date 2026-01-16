import { API_URLS } from '../../../utils/constants';
import axiosInstance from '../axiosInstance';

export const fetchUserDetailsApi = async () => {
  return axiosInstance.get(API_URLS.FETCH_USER_DETAILS).then((res) => res.data);
};

export const userSupportApi = async (payload) => {
  return axiosInstance.post(API_URLS.USER_SUPPORT, payload).then((res) => res.data);
};

export const updateUserDetailsApi = async (id, payload) => {
  return axiosInstance
    .patch(`${API_URLS.UPDATE_USER_DETAILS}${id}/`, payload)
    .then((res) => res.data);
};
export const updateProfileApi = async (id, payload) => {
  return axiosInstance
    .patch(`${API_URLS.UPDATE_USER_DETAILS}${id}/`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data);
};
