import HttpStatus from 'http-status-codes';
import * as CustomerService from '../services/customer.service';



/**
 * Controller to get a single customer
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getCustomer = async (req, res, next) => {
  try {
    const data = await CustomerService.getCustomer(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Customer fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};