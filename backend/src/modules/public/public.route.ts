import express from "express";
import { getPublicArticles, getPublicCategories, getPublicArticleById } from "./public.controller.js";

const router = express.Router();

router.get("/articles", getPublicArticles);
router.get("/articles/:id", getPublicArticleById);
router.get("/categories", getPublicCategories);

export default router;
