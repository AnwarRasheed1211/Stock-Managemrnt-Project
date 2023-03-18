import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    supplier_name: String,
    adderess: String,
    phoneNumber: String
  },
  { strict: false }
);

module.exports = mongoose.models.supplier || mongoose.model("supplier", supplierSchema);