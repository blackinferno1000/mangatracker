const mongoose = require("mongoose");
const models = require("../models");

const { Manga } = models;

const getManga = (req, res) => {
  Manga.MangaModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: "an error occurred" });
    }
    return res.json({ manga: docs });
  });
};

const deleteManga = (req, res) => {
  console.log(req.body);
  if (!mongoose.Types.ObjectId.isValid(`${req.body.id}`)) {
    console.log("invalid id");
    return res.json({ message: "invalid id" });
  }
  Manga.MangaModel.deleteOne(
    { _id: mongoose.Types.ObjectId.createFromHexString(`${req.body.id}`) },
    (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: "an error ocuurred" });
      }
      return res.json({ message: "successful deletion" });
    }
  );
};

const addManga = (req, res) => {
  if (!req.body.title || !req.body.currentChapter) {
    return res
      .status(400)
      .json({ error: "current chapter needs to be added." });
  }

  const mangaData = {
    title: req.body.title,
    currentChapter: req.body.currentChapter,
    maxChapter: req.body.maxChapter,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    owner: req.session.account._id,
  };

  const newManga = new Manga.MangaModel(mangaData);

  const mangaPromise = newManga.save();

  mangaPromise.then(() => res.json({ [newManga.title]: newManga }));

  mangaPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: "manga already added" });
    }

    return res.status(400).json({ error: "an error occurred" });
  });

  return mangaPromise;
};

const updateManga = (req, res) => {
  if (!req.body.title || !req.body.currentChapter || !req.body.maxChapter) {
    return res
      .status(400)
      .json({ error: "current chapter needs to be added." });
  }

  const mangaData = {
    title: req.body.title,
    currentChapter: req.body.currentChapter,
    maxChapter: req.body.maxChapter,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    owner: req.session.account._id,
  };

  let mangaPromise;

  Manga.MangaModel.findOneAndUpdate(
    { title: `${mangaData.title}` },
    mangaData,
    (err, manga) => {
      if (err || !manga) {
        return res.status(400).json({ error: "Manga doesn't exist" });
      }

      mangaPromise = manga.save();

      mangaPromise.then(() => {
        // manga = Manga.MangaModel.toAPI(manga);
        res.json({ redirect: "/tracker" });
      });

      mangaPromise.catch((err) => {
        console.log(err);
        // if (err.code === 11000) {
        //   return res.status(400).json({ error: "manga already added" });
        // }

        return res.status(400).json({ error: "an error occurred" });
      });
    }
  );

  return mangaPromise;
};

const trackerPage = (req, res) =>
  res.render("app", { csrfToken: req.csrfToken() });

module.exports.trackerPage = trackerPage;
module.exports.getManga = getManga;
module.exports.addManga = addManga;
module.exports.deleteManga = deleteManga;
module.exports.updateManga = updateManga;
