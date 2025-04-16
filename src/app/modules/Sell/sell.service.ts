import AppError from '../../errors/AppError';
import { status } from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { TSell } from './sell.interface';
import { Sell } from './sell.model';
import { SellsSearchableFields } from './sell.constant';
import mongoose from 'mongoose';
import { Item } from '../Item/item.model';

const createSellIntoDB = async (payload: TSell) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const { itemId, quantity } = payload;

    // Fetch the item that matches the given itemId
    const itemExist = await Item.findOne({ _id: itemId }).session(session);

    if (!itemExist) {
      throw new Error('Item not found!');
    }

    const availableQty = itemExist.quantity;

    // ❗ FIXED: Use < instead of <=
    if (availableQty < quantity) {
      throw new Error('Not enough quantity available!');
    }

    // Transaction 1: Create the Sell record
    const newSell = await Sell.create([payload], { session });

    // Transaction 2: Deduct quantity from the Item
    const updatedItem = await Item.findOneAndUpdate(
      { _id: itemId },
      { $inc: { quantity: -quantity } },
      { new: true, session }
    );

    if (!updatedItem) {
      throw new Error('Failed to update Item quantity');
    }

    await session.commitTransaction();
    return newSell;
  } catch (error) {
    await session.abortTransaction();
    console.error('Error during transaction:', error);
    throw error; // Optional: throw so caller can catch
  } finally {
    session.endSession();
  }
};

const getAllSellsFromDB = async (query: Record<string, unknown>) => {
  const sellQuery = new QueryBuilder(Sell.find(), query)
    .search(SellsSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await sellQuery.modelQuery;
  const meta = await sellQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleSellFromDB = async (id: string) => {
  const result = await Sell.findById(id);
  return result;
};

const updateSellIntoDB = async (id: string, payload: Partial<TSell>) => {
  const result = await Sell.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteSellFromDB = async (id: string) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the semester registration status is upcoming
   * Step 3: delete the offered course
   */
  const isSellExists = await Sell.findById(id);

  if (!isSellExists) {
    throw new AppError(status.NOT_FOUND, 'Sell not found');
  }

  const result = await Sell.findByIdAndDelete(id);

  return result;
};

export const SellServices = {
  createSellIntoDB,
  getAllSellsFromDB,
  getSingleSellFromDB,
  updateSellIntoDB,
  deleteSellFromDB,
};
