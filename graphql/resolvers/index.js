const mongoose = require('mongoose');

require('../../models/WordSchema');

const Word = mongoose.model('Word');

module.exports = {
  words: () => {
    return Word.find()
      .then((words) => {
        return words.map((word) => {
          return word;
        });
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  createWord: async (args) => {
    const existingWord = await Word.findOne({ word: args.word });
    if (existingWord) {
      throw new Error('Word exists already.');
    }
    const word = new Word({ word: args.word });
    const result = await word.save();
    console.log(result);
    return result;
  },
  searchWords: async (args) => {
    var wrd = args.word;
    if (wrd) {
      return Word.find({ word: { $regex: '.*' + wrd + '.*' } })
        .then((result) => {
          return result.map((word) => {
            return word;
          });
        })
        .catch((err) => {
          throw new Error('No word found!');
        });
    }
  },
  searchWordById: async (args) => {
    var id = args._id;
    const result = await Word.findById(id);
    return result;
  },
};
