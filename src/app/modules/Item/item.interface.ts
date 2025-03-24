import { Types } from 'mongoose';

export type TCondition = 'New' | 'Old';
export type TStatus = 'Available' | 'Sold';
export type TCategory =
  | 'CPU'
  | 'Motherboard'
  | 'Ram'
  | 'SSD'
  | 'HDD'
  | 'Casing'
  | 'Keyboard'
  | 'Mouse'
  | 'Monitor'
  | 'Graphics Card'
  | 'Power Supply';

export type TItem = {
  name: string;
  category: TCategory;
  brand: string;
  compability: string;
  price: number;
  interfacez?: string;
  condition: TCondition;
  capacity?: string;
  quantity: number;
  status: TStatus;
  createdBy: Types.ObjectId;
  itemStatus: string;
};
