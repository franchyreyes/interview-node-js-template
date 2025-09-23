// middlewares/errorHandler.js
import {apiResponse} from '../utils/apiResponse';
import {codeStatus} from '../config/codeStatus'

export const errorHandler = (err, req, res, next) => {
  const response = apiResponse(false, err.message);
  res.status(err.status || codeStatus.SERVER_ERROR).json(response);
};