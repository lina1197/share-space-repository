import express from 'express';
import { getArticles,createArticle,getArticleById,deleteArticle,updateArticle, getArticlesByUser } from '../controllers/ArticleCRUD.js';
import upload from '../middlewares/multerMiddleware.js';
import { filterArticles } from '../controllers/ArticleFilter.js';
const router = express.Router();
router.get('/filterArticles',filterArticles);

router.get('/',getArticles);
router.get('/getUserArticles',getArticlesByUser);
router.get('/:id',getArticleById);
router.delete('/:id',deleteArticle);
router.put('/:id',upload.single('image'),updateArticle);
router.post('/',upload.single('image'),createArticle);

export default router;