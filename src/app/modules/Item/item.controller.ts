import { Request, Response } from 'express';
import { status } from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ItemServices } from './item.service';

const createItem = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await ItemServices.createItemIntoDB(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Items is created successfully !',
    data: result,
  });
});

const getAllItems = catchAsync(async (req: Request, res: Response) => {
  const result = await ItemServices.getAllItemsFromDB(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Items retrieved successfully !',
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

const getSingleItem = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ItemServices.getSingleItemFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Item fetched successfully',
    data: result,
  });
});

const updateItem = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ItemServices.updateItemIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Item updated successfully',
    data: result,
  });
});

const deleteItemFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ItemServices.deleteItemFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Item deleted successfully',
    data: result,
  });
});

export const ItemControllers = {
  createItem,
  getAllItems,
  getSingleItem,
  updateItem,
  deleteItemFromDB,
};
