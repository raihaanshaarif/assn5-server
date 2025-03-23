import { Model, Types } from "mongoose";

export type TGender = "male" | "female" | "other";

export type TUserName = {
  firstName: string;
  lastName: string;
};

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  gender: TGender;
  email: string;
  contactNo: string;
  isDeleted: boolean;
};

export interface AdminModel extends Model<TAdmin> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TAdmin | null>;
}
