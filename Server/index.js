import exprees from "express";
import SchemaModel from "./Schema_model.js/schema.js";
import db from "./db/Connet_Database.js";
import bodyparser from "body-parser";
import dotenv from "dotenv";

import cors from "cors";

dotenv.config();

const app = exprees();
app.use(exprees.json());
app.use(bodyparser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const Port = process.env.Port;

app.get("/GetTask", async (req, res) => {
  try {
    const response = await SchemaModel.find();
    if (!response || response.length === 0) {
      return res.status(404).json({ message: "Data Not Found" });
    }

    res.status(200).json({ data: response });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/Put/:_id", async (req, res) => {
  try {
    const id = req.params._id;
    const { TaskName, TaskDescription, TaskStatus } = req.body;

    if (!TaskName || !TaskStatus || !TaskDescription)
      return res.status(400).json({ message: "Req body Data not found" });

    const respone = await SchemaModel.findByIdAndUpdate(
      id,
      { TaskDescription, TaskName, TaskStatus },
      { new: true }
    );

    res.status(200).json({
      message: `succesfully data Updated id:${id} UpdatedData :${respone}`,
    });
  } catch (error) {
    res.status(500).json({ message: `Server Error ${error}` });
  }
});

app.post("/Post", async (req, res) => {
  try {
    const { TaskName, TaskDescription, TaskStatus } = req.body;
    if (!TaskName || !TaskDescription || !TaskStatus) {
      res.status(400).json({ message: "req error" });
    }
    // const data = {
    //   TaskName,
    //   TaskDescription,
    //   TaskStatus,
    //   TaskDate: new Date(),
    // };

    const saved = new SchemaModel({
      TaskName,
      TaskDescription,
      TaskStatus,
      TaskDate: new Date(),
    });
    await saved.save();

    res.status(201).json({ message: "Succesfully data stored in Database" });
  } catch (err) {
    res.status(500).json({ message: "server error" });
    console.log(err);
  }
});

app.delete("/Deletetask/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(404).json({ message: "Id not Found" });
      console.log("notfound id");
    }

    const deleteData = await SchemaModel.findByIdAndDelete(id);

    if (!deleteData) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully", deleteData });
  } catch (err) {
    res.status(500).json({ message: "error" });
  }
});

app.listen(Port, () => {
  console.log(`succefully running your ${Port}`);
});
