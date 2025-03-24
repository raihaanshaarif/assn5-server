import { Types } from 'mongoose';

export type TSell = {
  itemId: Types.ObjectId;
  quantity: number;
  buyerName: string;
  createdBy: Types.ObjectId;
};
