import Article from "../models/Article.js";

export const createArticle = async (req, res) => {
  try {

    
    const { title, content,category,keywords } = req.body;
    const author = req.user._id;
    const article = new Article({ title,content,category,keywords,author});
    await article.save();
    res.json(article);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};


export const getArticlesByUser = async (req, res) => {
  
  try { 

  
    const author = req.user._id;

    const articles = await Article.find({'author':author});
    res.json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
// get article by id
export const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);
    if (!article) return res.status(404).send('Article not found');
    res.json(article);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// update article by id
export const updateArticle = async (req, res) => {
  try {
    const { title, content,category,keywords } = req.body;
        console.log(title);
        console.log(content);

    const { id } = req.params;
    const author = req.user._id;
    const updateData = { title, content, author,category,keywords };
    console.log(updateData);
    if (req.file) {
      updateData.image = req.file.path;
    }
    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    if (!updatedArticle) {
      return res.status(404).json({ msg: 'Article not found' });
    }
    res.json(updatedArticle);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// delete article by id
export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    await Article.findByIdAndDelete(id);
    res.send(`Article ${id} deleted successfully`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
