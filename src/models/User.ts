import mongoose, { Document, Schema } from "mongoose";
import { addressSchema, IAddress } from "./Address";

export interface IUser extends Document {
  nombre: string;
  email: string;
  edad: number;
  fecha_creacion: Date;
  direcciones: IAddress[];
}

const userSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  edad: { type: Number, required: false },
  fecha_creacion: { type: Date, default: Date.now() },
  direcciones: { type: [addressSchema], require: true },
});
const User = mongoose.model<IUser>("User", userSchema);
export default User;
