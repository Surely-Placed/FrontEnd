import { API_URLS } from '../../../utils/constants';
import axiosInstance from '../axiosInstance';

export const getStudentStoriesAPI = async () => {
  return axiosInstance.get(API_URLS.STUDENT_STORIES, { skipAuth: true }).then((res) => res.data);
};

export const getFAQsAPI = async (category) => {
  return axiosInstance.get(`${API_URLS.FAQS}?category=${category}`, { skipAuth: true }).then((res) => res.data);
};

export const getMeetOurTeamAPI = async () => {
  return axiosInstance.get(API_URLS.MEET_OUR_TEAM, { skipAuth: true }).then((res) => res.data);
};

export const getCohortsAPI = async (params) => {
  // Send filters as query params rather than GET body
  // If interest_uuid is an array, serialize as comma-separated string
  const serializedParams = params && params.interest_uuid
    ? {
        ...params,
        interest_uuid: Array.isArray(params.interest_uuid)
          ? params.interest_uuid.join(',')
          : params.interest_uuid,
      }
    : params;

  return axiosInstance
    .get(API_URLS.COHORTS, { skipAuth: true, params: serializedParams })
    .then((res) => res.data);
};

export const getCohortDetailsAPI = async (id) => {
  return axiosInstance
    .get(`${API_URLS.COHORTS}/${id}`, { skipAuth: true })
}

export const getMeetOurCoachesAPI = async () => {
  return axiosInstance.get(API_URLS.MEET_OUR_COACHES, { skipAuth: true }).then((res) => res.data);
};

export const bookCallAPI = async (payload) => {
  return axiosInstance
    .post(API_URLS.BOOK_A_CALL, payload, { skipAuth: true })
    .then((res) => res.data);
};
