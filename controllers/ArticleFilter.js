import Article from "../models/Article.js";

export const filterArticles = async (req, res) => {
  const filters = req.query;
  const articles = await Article.find();

  const filteredArticles = articles.filter(article => {
    let isValid = true;
    for (const key in filters) {
      if (key === 'keywords') {
        // Split the search term into individual keywords
        const keywords = filters[key].split(',');
        let hasKeyword = false;
        // Check if any of the individual keywords match the document's keywords
        for (const keyword of keywords) {
          if (article[key].some(articleKeyword => articleKeyword.includes(keyword.trim()))) {
            hasKeyword = true;
            break;
          }
        }
        isValid = isValid && hasKeyword;
      } else {
        // For other fields, check for an exact match
        isValid = isValid && article[key] == filters[key];
      }
    }
    return isValid;
  });

  res.send(filteredArticles);
};
