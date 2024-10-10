export const getUserHandler = async (req, res, next) => {
  try {
    // TODO: get userId from request after authentication token validation
  } catch (error) {
    next(error);
  }
};
