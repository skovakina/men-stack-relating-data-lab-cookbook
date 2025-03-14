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

router.get("/new", (req, res) => {
  res.render("ingredients/new.ejs");
});

router.post("/", async (req, res) => {
  try {
    const existingIngredient = await Ingredient.findOne({
      name: req.body.name,
    });

    if (!existingIngredient) {
      const newIngredient = new Ingredient({ name: req.body.name });
      await newIngredient.save();
    }

    res.redirect("/ingredients");
  } catch (error) {
    console.error(error);
    res.redirect("/ingredients");
  }
});

module.exports = router;
