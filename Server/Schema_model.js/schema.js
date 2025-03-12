import mongoose from "mongoose";

const Schema_model = new mongoose.Schema({
  TaskName: { type: String, required: true },
  TaskStatus: { type: String, required: true },
  TaskDescription: { type: String, required: true },
  TaskDate: {
    type: String,
  },
});

const SchemaModel = mongoose.model("TaskData", Schema_model);

export default SchemaModel;
