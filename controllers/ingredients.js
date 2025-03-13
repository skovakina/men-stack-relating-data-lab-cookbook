const express = require("express");
const router = express.Router();
const Ingredient = require("../models/Ingredient.js");

// Index	/ingredients	GET
router.get("/ingredients", async (req, res) => {
  try {
    const ingredients = await Ingredient.find({});
    res.render("ingredients/index.ejs", { ingredients });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// New	/ingredients/new	GET
router.get("/ingredients/new", (req, res) => {
  res.render("ingredients/new.ejs");
});

// Create	/ingredients	POST
router.post("/ingredients", async (req, res) => {
  try {
    await Ingredient.create(req.body);
    res.redirect("/ingredients");
  } catch (error) {
    console.log(error);
    res.redirect("/ingredients/new");
  }
});

// Show	/ingredients/:ingredientId	GET
router.get("/ingredients/:IngredientId", async (req, res) => {
  try {
    const Ingredient = await Ingredient.findById(req.params.IngredientId);
    res.render("ingredients/show.ejs", { Ingredient });
  } catch (error) {
    console.log(error);
    res.redirect("/ingredients");
  }
});

// Edit	/ingredients/:ingredientId/edit	GET
router.get("/ingredients/:IngredientId/edit", async (req, res) => {
  try {
    const Ingredient = await Ingredient.findById(req.params.IngredientId);
    res.render("ingredients/edit.ejs", { Ingredient });
  } catch (error) {
    console.log(error);
    res.redirect("/ingredients");
  }
});

// Update	/ingredients/:ingredientId	PUT
router.put("/ingredients/:IngredientId", async (req, res) => {
  try {
    await Ingredient.findByIdAndUpdate(req.params.IngredientId, req.body);
    res.redirect("/ingredients");
  } catch (error) {
    console.log(error);
    res.redirect("/ingredients");
  }
});

// Delete	/ingredients/:ingredientId	DELETE
router.delete("/ingredients/:IngredientId", async (req, res) => {
  try {
    await Ingredient.findByIdAndDelete(req.params.IngredientId);
    res.redirect("/ingredients");
  } catch (error) {
    console.log(error);
    res.redirect("/ingredients");
  }
});

module.exports = router;
