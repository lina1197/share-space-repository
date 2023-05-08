import Article from "../models/Article";
export const filterArticles = async (req, res) => {
const filters = req.query;
const articles = await Article.find();

  const filteredArticles = articles.filter(article => {
    let isValid = true;
    for (const key in filters) {
      console.log(key, article[key], filters[key]);
      isValid = isValid && article[key] == filters[key];
    }
    return isValid;
  });
  res.send(filteredArticles);
} 

