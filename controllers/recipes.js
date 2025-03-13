const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Recipe = require("../models/recipe.js");
const User = require("../models/user.js");

// Index	/recipes	GET
router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id).populate("recipes");
    console.log(user);
    res.render("recipes/index.ejs", { recipes: user.recipes || [] });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

// New	/recipes/new	GET
router.get("/new", (req, res) => {
  res.render("recipes/new.ejs");
});

// Create	/recipes	POST
router.post("/", async (req, res) => {
  try {
    const newRecipe = new Recipe({
      owner: req.session.user._id,
      ...req.body,
    });
    await newRecipe.save();

    await User.updateOne(
      { _id: req.session.user._id },
      { $push: { recipes: newRecipe._id } }
    );

    res.redirect(`/recipes`);
  } catch (error) {
    console.log(error);
    res.redirect("/recipes/new");
  }
});

// Show	/recipes/:recipeId	GET
router.get("/:recipeId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId).populate(
      "ingredients"
    );

    if (!recipe) return res.redirect("/recipes"); // If recipe not found, redirect

    res.render("recipes/show.ejs", { recipe });
  } catch (error) {
    console.error(error);
    res.redirect("/recipes");
  }
});

// Edit	/recipes/:recipeId/edit	GET
router.get("/:recipeId/edit", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe || !recipe.owner.equals(req.session.user._id)) {
      return res.redirect("/recipes");
    }
    res.render("recipes/edit.ejs", { recipe });
  } catch (error) {
    console.log(error);
    res.redirect("/recipes");
  }
});

// Update	/recipes/:recipeId	PUT
// TODO: it's not finished yet

router.put("/:recipeId", async (req, res) => {
  try {
    await Recipe.findByIdAndUpdate(req.params.recipeId, req.body);
    res.redirect("/recipes");
  } catch (error) {
    console.log(error);
    res.redirect("/recipes");
  }
});

// Delete	/recipes/:recipeId	DELETE
router.delete("/:recipeId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe || !recipe.owner.equals(req.session.user._id)) {
      return res.redirect("/recipes");
    }
    await Recipe.deleteOne({ _id: recipe._id });
    res.redirect("/recipes");
  } catch (error) {
    console.error(error);
    res.redirect("/recipes");
  }
});

module.exports = router;
