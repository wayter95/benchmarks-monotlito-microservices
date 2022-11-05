import express from "express";
import cors from "cors";
import { routes } from "./routes";
import './shared/container'

const app = express();

app.use(express.json());

app.use(cors());

app.use('/manager', routes)

export { app };