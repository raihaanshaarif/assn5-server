import { z } from 'zod';
import { ItemCategory } from './item.constant';

const itemConditionEnum = z.enum(['New', 'Old']);
const itemStatusEnum = z.enum(['Available', 'Sold']);
const itemCategoryEnum = z.enum([
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
]);

export const createItem = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    category: itemCategoryEnum,
    brand: z.string().min(1, 'Brand is required'),
    compability: z.string().min(1, 'Compatibility is required'),
    price: z.number().min(0, 'Price must be a positive number'),
    interfacez: z.string().optional(),
    condition: itemConditionEnum,
    capacity: z.string().optional(),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    status: itemStatusEnum,
    createdBy: z.string().min(1, 'CreatedBy is required'),
    itemStatus: z.string().min(1, 'Item status is required'),
  }),
});

export const patchItem = z.object({
  body: z
    .object({
      name: z.string().min(1, 'Name is required').optional(),
      category: itemCategoryEnum.optional(),
      brand: z.string().min(1, 'Brand is required').optional(),
      compability: z.string().min(1, 'Compatibility is required').optional(),
      price: z.number().min(0, 'Price must be a positive number').optional(),
      interfacez: z.string().optional(),
      condition: itemConditionEnum.optional(),
      capacity: z.string().optional(),
      quantity: z.number().min(1, 'Quantity must be at least 1').optional(),
      status: itemStatusEnum.optional(),
      createdBy: z.string().min(1, 'CreatedBy is required').optional(),
      itemStatus: z.string().min(1, 'Item status is required').optional(),
    })
    .partial(), // Allows partial updates
});

export const ItemsValidations = {
  createItem,
  patchItem,
};
