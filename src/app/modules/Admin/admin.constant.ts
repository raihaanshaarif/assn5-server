import { TGender } from "./admin.interface";

export const Gender: TGender[] = ["male", "female", "other"];

export const AdminSearchableFields = [
  "email",
  "id",
  "contactNo",

  "name.firstName",
  "name.lastName",
];
