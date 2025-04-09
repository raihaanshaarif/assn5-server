import mongoose, { Schema } from 'mongoose';
import { TItem } from './item.interface';
import { model } from 'mongoose';
import { ItemCondition, ItemStatus, ItemCategory } from './item.constant';

const itemSchema = new Schema<TItem>(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ItemCategory,
    },
    brand: {
      type: String,
      required: true,
    },
    compability: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    interfacez: {
      type: String,
    },
    condition: {
      type: String,
      required: true,
      enum: ItemCondition,
    },
    capacity: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);
// Item Exist before save check
itemSchema.pre('save', async function (next) {
  const isItemExists = await Item.findOne({
    name: this.name,
  });

  if (isItemExists) {
    throw new Error('Item is already exists !');
  }
  next();
});

export const Item = model<TItem>('Item', itemSchema);
