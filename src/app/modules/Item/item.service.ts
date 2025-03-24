import AppError from '../../errors/AppError';
import { TItem } from './item.interface';
import { status } from 'http-status';
import { Item } from './item.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { ItemsSearchableFields } from './item.constant';

const createItemIntoDB = async (payload: TItem) => {
  const result = await Item.create(payload);
  return result;
};

const getAllItemsFromDB = async (query: Record<string, unknown>) => {
  const academicSemesterQuery = new QueryBuilder(Item.find(), query)
    .search(ItemsSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicSemesterQuery.modelQuery;
  const meta = await academicSemesterQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleItemFromDB = async (id: string) => {
  const result = await Item.findById(id);
  return result;
};

const updateItemIntoDB = async (id: string, payload: Partial<TItem>) => {
  const result = await Item.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteItemFromDB = async (id: string) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the semester registration status is upcoming
   * Step 3: delete the offered course
   */
  const isItemExists = await Item.findById(id);

  if (!isItemExists) {
    throw new AppError(status.NOT_FOUND, 'Item not found');
  }

  const result = await Item.findByIdAndDelete(id);

  return result;
};

export const ItemServices = {
  createItemIntoDB,
  getAllItemsFromDB,
  getSingleItemFromDB,
  updateItemIntoDB,
  deleteItemFromDB,
};
