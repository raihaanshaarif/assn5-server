import { TCategory, TCondition, TStatus } from './item.interface';

export const ItemCondition: TCondition[] = ['New', 'Old'];
export const ItemStatus: TStatus[] = ['Available', 'Sold'];
export const ItemCategory: TCategory[] = [
  'CPU',
  'Motherboard',
  'Ram',
  'SSD',
  'HDD',
  'Casing',
  'Keyboard',
  'Mouse',
  'Monitor',
  'Graphics Card',
  'Power Supply',
];

//Searchable Fields
export const ItemsSearchableFields = ['name', 'category'];
