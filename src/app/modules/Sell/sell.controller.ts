import { Request, Response } from 'express';
import { status } from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SellServices } from './sell.service';

const createSell = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await SellServices.createSellIntoDB(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Sells is created successfully !',
    data: result,
  });
});

const getAllSells = catchAsync(async (req: Request, res: Response) => {
  const result = await SellServices.getAllSellsFromDB(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Sells retrieved successfully !',
    meta: result.meta,
    data: result.result,
  });
});

// const getMyOfferedCourses = catchAsync(async (req: Request, res: Response) => {
//   const userId = req.user.userId;
//   const result = await OfferedCourseServices.getMyOfferedCoursesFromDB(
//     userId,
//     req.query
//   );

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'OfferedCourses retrieved successfully !',
//     meta: result.meta,
//     data: result.result,
//   });
// });

const getSingleSell = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SellServices.getSingleSellFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Sell fetched successfully',
    data: result,
  });
});

const updateSell = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await SellServices.updateSellIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Sell updated successfully',
    data: result,
  });
});

const deleteSellFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SellServices.deleteSellFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Sell deleted successfully',
    data: result,
  });
});

export const SellControllers = {
  createSell,
  getAllSells,
  getSingleSell,
  updateSell,
  deleteSellFromDB,
};
