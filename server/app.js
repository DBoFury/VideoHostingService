import express from "express";
import fs from "fs";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { GridSchema } from "./gridModel.js";

mongoose.set("strictQuery", true);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 250,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "video/mp4" ||
      file.mimetype == "video/mp3" ||
      file.mimetype == "video/mov"
    ) {
      cb(null, true);
    } else {
      return cb(new Error("Invalid mime type"));
    }
  },
});

const app = express();
const port = 5000;

app.use(cors());

app.get("/", async (req, res) => {
  res.sendFile(join(dirname(fileURLToPath(import.meta.url)), "/index.html"));
});

app.post("/upload_file", upload.single("video"), async (req, res) => {
  const fileUpload = async (file) => {
    const gridFile = new GridSchema({
      filename: file.originalname,
    });

    const fileStream = fs.createReadStream(file.path);
    await gridFile.upload(fileStream);

    fs.unlinkSync(file.path);
  };

  if (req.file) {
    await fileUpload(req.file);
    res.sendStatus(201);
  }
});

app.get("/files", async (req, res) => {
  try {
    const files = await GridSchema.find({});

    res.json(files);
  } catch (err) {
    res.status(500).send("Error");
  }
});

app.get("/initial_file", async (req, res) => {
  const range = req.headers.range;

  if (!range) {
    res.status(400).send("Requires Range header");
    return;
  }

  const video = await GridSchema.findById("63ef99f7ab926d80b7497302");

  if (!video) {
    res.status(404).send("No video uploaded!");
    return;
  }

  const videoSize = video.length;
  const start = Number(range.replace(/\D/g, ""));
  const end = videoSize - 1;

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);

  video.downloadStream(res);
});

app.get("/file/:id", async (req, res) => {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
    return;
  }

  const video = await GridSchema.findById(req.params.id);

  if (!video) {
    res.status(404).send("No video uploaded!");
    return;
  }

  const videoSize = video.length;
  const start = Number(range.replace(/\D/g, ""));
  const end = videoSize - 1;

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);

  video.downloadStream(res);
});

app.listen(port, async () => {
  console.log(`Listening at http://localhost:${port}`);

  await mongoose.connect(
    process.env.DATABASE_URL || "mongodb://localhost/videohostingservice"
  );
});
