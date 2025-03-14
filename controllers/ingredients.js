const express = require("express");
const router = express.Router();
const Ingredient = require("../models/Ingredient.js");

// Index	/ingredients	GET
router.get("/", async (req, res) => {
  try {
    const ingredients = await Ingredient.find({});
    res.render("ingredients/index.ejs", { ingredients });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
