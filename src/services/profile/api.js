const {
  fetchUserDetailsApi,
  updateUserDetailsApi,
  updateProfileApi,
  userSupportApi,
} = require('.');

const fetchUserDetails = async () => {
  try {
    const { data } = await fetchUserDetailsApi();
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

const userSupport = async (payload) => {
  try {
    const data = await userSupportApi(payload);
    return {
      variant: 'success',
      msg: data?.message,
    };
  } catch (error) {
    return {
      variant: 'error',
      msg: error?.response?.data?.data?.message?.[0] || 'Something went wrong',
    };
  }
};

const patchUserDetails = async (id, payload) => {
  try {
    const { data } = await updateUserDetailsApi(id, payload);
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

const patchUserProfileImg = async (id, payload) => {
  try {
    const { data } = await updateProfileApi(id, payload);
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

export const ProfileManager = {
  fetchUserDetails,
  patchUserDetails,
  patchUserProfileImg,
  userSupport,
};
