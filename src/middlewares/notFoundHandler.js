import createHttpError from 'http-errors';

export const notFoundHandler = (req, res, next) => {
  throw createHttpError(404, 'Not found');
};
