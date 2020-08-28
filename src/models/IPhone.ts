import { Document } from "mongoose";

export interface IPhone extends Document {
    area_code: string;
    number: string;
    created_at: Date;
    updated_at: Date;
  }