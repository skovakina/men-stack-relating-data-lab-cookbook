const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Recipe = require("../models/recipe.js");

// Index	/recipes	GET
router.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.render("recipes/index.ejs", { recipes });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// New	/recipes/new	GET
router.get("/recipes/new", (req, res) => {
  res.render("recipes/new.ejs");
});

// Create	/recipes	POST
router.post("/recipes", async (req, res) => {
  try {
    await Recipe.create(req.body);
    res.redirect("/recipes");
  } catch (error) {
    console.log(error);
    res.redirect("/recipes/new");
  }
});

// Show	/recipes/:recipeId	GET
router.get("/recipes/:recipeId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    res.render("recipes/show.ejs", { recipe });
  } catch (error) {
    console.log(error);
    res.redirect("/recipes");
  }
});

// Edit	/recipes/:recipeId/edit	GET
router.get("/recipes/:recipeId/edit", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    res.render("recipes/edit.ejs", { recipe });
  } catch (error) {
    console.log(error);
    res.redirect("/recipes");
  }
});

// Update	/recipes/:recipeId	PUT
router.put("/recipes/:recipeId", async (req, res) => {
  try {
    await Recipe.findByIdAndUpdate(req.params.recipeId, req.body);
    res.redirect("/recipes");
  } catch (error) {
    console.log(error);
    res.redirect("/recipes");
  }
});

// Delete	/recipes/:recipeId	DELETE
router.delete("/recipes/:recipeId", async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.recipeId);
    res.redirect("/recipes");
  } catch (error) {
    console.log(error);
    res.redirect("/recipes");
  }
});

module.exports = router;
