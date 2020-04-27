const models = require('../models');

const { Manga } = models;

const getManga = (req, res) => {
  Manga.MangaModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'an error occurred' });
    }
    return res.json({ manga: docs });
  });
};

const deleteManga = (req, res) => {
  Manga.MangaModel.deleteOne({ title: req.body.id }, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'an error ocuurred' });
    }
    return res.json({ message: 'successful deletion' });
  });
};

const addManga = (req, res) => {
  if (!req.body.title || !req.body.currentChapter) {
    return res
      .status(400)
      .json({ error: 'current chapter needs to be added.' });
  }

  const mangaData = {
    title: req.body.title,
    currentChapter: req.body.currentChapter,
    maxChapter: req.body.maxChapter,
    description: req.body.description,
    owner: req.session.account._id,
  };

  const newManga = new Manga.MangaModel(mangaData);

  const mangaPromise = newManga.save();

  mangaPromise.then(() => res.json({ [newManga.title]: newManga }));

  mangaPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'manga already added' });
    }

    return res.status(400).json({ error: 'an error occurred' });
  });

  return mangaPromise;
};

const trackerPage = (req, res) => res.render('app', { csrfToken: req.csrfToken() });
// Manga.MangaModel.findByOwner(req.session.account._id, (err, docs) => {
//   if (err) {
//     console.log(err);
//     return res.status(400).json({ error: 'An error occurred' });
//   }


// });

module.exports.trackerPage = trackerPage;
module.exports.getManga = getManga;
module.exports.addManga = addManga;
module.exports.deleteManga = deleteManga;
