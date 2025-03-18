import mongoose, { Document, Schema } from "mongoose";
export interface IAddress extends Document {
  calle: string;
  ciudad: string;
  pais: string;
  codigo_postal: string;
}

export const addressSchema: Schema = new Schema({
  calle: { type: String, required: true },
  ciudad: { type: String, required: true },
  pais: { type: String, required: true },
  codigo_postal: { type: String, required: true },
});
const Address = mongoose.model<IAddress>("Address", addressSchema);
