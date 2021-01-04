const db = require('../database');

class Recipes {
  static retrieveAll (callback) {
    db.query('SELECT name from recipes', (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static insert (recipe, callback) {
    db.query('INSERT INTO recipes (name) VALUES ($1)', [recipe], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = Recipes;