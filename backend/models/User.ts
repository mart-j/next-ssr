import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface UserType extends Document {
  username: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User: Model<UserType> =
  mongoose.models.User || model("User", UserSchema);
