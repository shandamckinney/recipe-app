var express = require('express');
var Recipes = require('../models/recipes');

var router = express.Router();

router.get('/', (req, res) => {
  Recipes.retrieveAll((err, recipes) => {
    if (err)
      return res.json(err);
    return res.json(recipes);
  });
});

router.post('/', (req, res) => {
  var recipe = req.body.recipe;

  Recipes.insert(recipe, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;