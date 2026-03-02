const { addCoachAPI, fetchDomainsAPI, fetchCohortssAPI } = require('.');

const addCoach = async (payload) => {
  try {
    const { data } = await addCoachAPI(payload);
    return {
      variant: 'success',
      msg: 'Coach Added Successfully',
      data,
    };
  } catch (error) {
    return {
      variant: 'error',
      msg: error?.response.data.message || 'Something went wrong',
    };
  }
};

const fetchDomains = async () => {
  try {
    const { data } = await fetchDomainsAPI();
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

const fetchCohorts = async () => {
  try {
    const { data } = await fetchCohortssAPI();
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

export const CoachFormAPI = {
    addCoach,
    fetchDomains,
    fetchCohorts,
}