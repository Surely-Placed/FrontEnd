const {
  getStudentStoriesAPI,
  getFAQsAPI,
  getMeetOurTeamAPI,
  getCohortsAPI,
  getMeetOurCoachesAPI,
  bookCallAPI,
  getCohortDetailsAPI,
} = require('.');
// import { DEFAULT_ERROR_MSG } from '../../../utils/constants';

const getStudentStories = async (params) => {
  try {
    const { data } = await getStudentStoriesAPI(params);
    return {
      variant: 'success',
      data,
    };
  } catch (error) {
    return {
      variant: 'error',
      msg: error?.response.data.message || 'Something went wrong',
    };
  }
};

const getFAQs = async (category) => {
  try {
    const { data } = await getFAQsAPI(category);
    return {
      variant: 'success',
      data,
    };
  } catch (error) {
    return {
      variant: 'error',
      msg: error?.response.data.message || 'Something went wrong',
    };
  }
};

const getMeetOurTeam = async () => {
  try {
    const { data } = await getMeetOurTeamAPI();
    return {
      variant: 'success',
      data,
    };
  } catch (error) {
    return {
      variant: 'error',
      msg: error?.response.data.message || 'Something went wrong',
    };
  }
};

const getCohorts = async (params) => {
  try {
    const { data } = await getCohortsAPI(params);
    return {
      variant: 'success',
      data,
    };
  } catch (error) {
    return {
      variant: 'error',
      msg: error?.response?.data?.message || 'Something went wrong',
    };
  }
};

const getCohortDetail = async (id) => {
  try {
    const { data } = await getCohortDetailsAPI(id);
    return {
      variant: 'success',
      data,
    };
  } catch (error) {
    return {
      variant: 'error',
      msg: error?.response?.data?.message || 'Something went wrong',
    };
  }
};

const getMeetOurCoaches = async () => {
  try {
    const { data } = await getMeetOurCoachesAPI();
    return {
      variant: 'success',
      data,
    };
  } catch (error) {
    return {
      variant: 'error',
      msg: error?.response.data.message || 'Something went wrong',
    };
  }
};

const bookCall = async (payload) => {
  try {
    const { data } = await bookCallAPI(payload);
    return {
      variant: 'success',
      message: 'Booked A Call Successfully.',
      data,
    };
  } catch (error) {
    return {
      variant: 'error',
      message: error?.response.data.detail || 'Something went wrong',
    };
  }
};

export const HomeManager = {
  getStudentStories,
  getFAQs,
  getMeetOurTeam,
  getCohorts,
  getMeetOurCoaches,
  getCohortDetail,
  bookCall,
};
