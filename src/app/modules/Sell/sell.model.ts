import mongoose, { Schema } from 'mongoose';

import { model } from 'mongoose';

import { TSell } from './sell.interface';
import { Item } from '../Item/item.model';

const sellSchema = new Schema<TSell>(
  {
    id: {
      type: String,
    },
    itemId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Item',
    },
    quantity: {
      type: Number,
      required: true,
    },
    buyerName: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    saleDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
// Item Exist before save check
sellSchema.pre('save', async function (next) {
  const item = await Item.findOne({ _id: this.itemId }); // Use itemId to find the specific item

  if (!item || item.quantity < this.quantity) {
    return next(new Error('Item is not available!'));
  }

  next();
});

export const Sell = model<TSell>('Sell', sellSchema);
