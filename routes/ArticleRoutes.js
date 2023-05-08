import express from 'express';
import { getArticles,createArticle,getArticleById,deleteArticle,updateArticle } from '../controllers/ArticleCRUD.js';
import upload from '../middlewares/multerMiddleware.js';
const router = express.Router();
router.get('/',getArticles);
router.get('/:id',getArticleById);
router.delete('/:id',deleteArticle);
router.put('/',updateArticle);
router.post('/',upload.single('image'),createArticle);
export default router;