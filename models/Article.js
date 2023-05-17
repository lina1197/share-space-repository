import mongoose from 'mongoose';
const {Schema, model} =mongoose;

const articleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: {
   type: String,
  //  required: true,
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  category: { type: String, required: true },
  keywords: { type: [String], required: true },
},{
      timestamps: true 

});


const Article=model('Article', articleSchema);


export default Article;
