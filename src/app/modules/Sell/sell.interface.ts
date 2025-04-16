import { Types } from 'mongoose';

export type TSell = {
  id?: string;
  itemId: Types.ObjectId;
  quantity: number;
  buyerName: string;
  createdBy: Types.ObjectId;
  saleDate: Date;
};
