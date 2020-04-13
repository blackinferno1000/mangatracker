const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let MangaModel = {};

const convertId = mongoose.Types.ObjectId;
const setTitle = (name) => _.escape(name).trim();
const setDescription = (personality) => _.escape(personality).trim();

const MangaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    set: setTitle,
  },
  currentChapter: {
    type: Number,
    min: 0,
    max: 9999,
    required: true,
  },
  maxChapter: {
    type: Number,
    min: 0,
    max: 9999,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    set: setDescription,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdData: {
    type: Date,
    default: Date.now,
  }
});

MangaSchema.statics.toAPI = (doc) => ({
  title: doc.title,
  currentChapter: doc.currentChapter,
  maxChapter: doc.maxChapter,
  description: doc.description
});

MangaSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return MangaModel.find(search).select('title currentChapter maxChapter description').lean().exec(callback);
};

// DomoSchema.statics.updateDomo = (domoId, callback) => {
//   const search = {
//     name: domoId
//   }

//   return Domo.DomoModel.findOneAndUpdate(search, {$set:
//     {name: req.body.name, age: req.body.age, personality: req.body.personality}},
//     (err, doc) => {
//     if(err){
//       console.log("Something wrong when updating data!");
//     }

//     console.log(doc);
//     res.json({ redirect: '/maker' });
//Manga
// };

MangaModel = mongoose.model('Manga', MangaSchema);

module.exports.MangaModel = MangaModel;
module.exports.MangaSchema = MangaSchema;