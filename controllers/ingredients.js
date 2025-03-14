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
    const ingredient = req.body.name.trim();
    if (!ingredient) {
      return res.redirect("/ingredients/new");
    }

    const existingIngredient = await Ingredient.findOne({
      name: ingredient,
    });

    if (!existingIngredient) {
      const newIngredient = new Ingredient({ name: ingredient });
      await newIngredient.save();
    }

    res.redirect("/ingredients");
  } catch (error) {
    console.error(error);
    res.redirect("/ingredients");
  }
});

module.exports = router;
