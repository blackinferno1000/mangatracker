const models = require('../models');

const { Manga } = models;

const getManga = (req, res) => {

}

const trackerPage = (req, res) => {
  Manga.MangaModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), manga: docs });
  });
};

module.exports.trackerPage = trackerPage;
module.exports.getManga = getManga;