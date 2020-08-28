import { Model, model, Schema } from "mongoose";
import { IPhone } from "./IPhone";
import { IUser } from "./IUser";
import validator from 'validator'

const phoneSchema: Schema = new  Schema({
  number: {
    type: Number,
    required: true,
  },
  area_code: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const Phone: Model<IPhone> = model("Phone", phoneSchema);

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate:{
      validator: validator.isEmail,
      message: 'Digite um e-mail válido.',
      isAsync: false
    }
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  logged_at: {
    type: Date
  }, phones: [model("Phone").schema],
}, {
  toJSON: {
    virtuals: true,
  }
});

userSchema.methods.toJSON = function() {
  const obj = this.toObject()
  delete obj.password
  return obj
}
const User: Model<IUser> = model("User", userSchema);

export { User, Phone};
