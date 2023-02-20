import mongoose from "mongoose";
import schema from "gridfile";

const GridSchema = mongoose.model("GridFile", schema);

export { GridSchema };
