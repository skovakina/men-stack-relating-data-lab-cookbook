const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Ingridient = require("../models/ingridient.js");

// Index	/ingredients	GET
router.get("/ingredients", async (req, res) => {
  try {
    const ingridients = await Ingridient.find({});
    res.render("ingridients/index.ejs", { ingridients });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// New	/ingredients/new	GET
router.get("/ingridients/new", (req, res) => {
  res.render("ingridients/new.ejs");
});

// Create	/ingredients	POST
router.post("/ingridients", async (req, res) => {
  try {
    await Ingridient.create(req.body);
    res.redirect("/ingridients");
  } catch (error) {
    console.log(error);
    res.redirect("/ingridients/new");
  }
});

// Show	/ingredients/:ingredientId	GET
router.get("/ingridients/:ingridientId", async (req, res) => {
  try {
    const ingridient = await Ingridient.findById(req.params.ingridientId);
    res.render("ingridients/show.ejs", { ingridient });
  } catch (error) {
    console.log(error);
    res.redirect("/ingridients");
  }
});

// Edit	/ingredients/:ingredientId/edit	GET
router.get("/ingridients/:ingridientId/edit", async (req, res) => {
  try {
    const ingridient = await Ingridient.findById(req.params.ingridientId);
    res.render("ingridients/edit.ejs", { ingridient });
  } catch (error) {
    console.log(error);
    res.redirect("/ingridients");
  }
});

// Update	/ingredients/:ingredientId	PUT
router.put("/ingridients/:ingridientId", async (req, res) => {
  try {
    await Ingridient.findByIdAndUpdate(req.params.ingridientId, req.body);
    res.redirect("/ingridients");
  } catch (error) {
    console.log(error);
    res.redirect("/ingridients");
  }
});

// Delete	/ingredients/:ingredientId	DELETE
router.delete("/ingridients/:ingridientId", async (req, res) => {
  try {
    await Ingridient.findByIdAndDelete(req.params.ingridientId);
    res.redirect("/ingridients");
  } catch (error) {
    console.log(error);
    res.redirect("/ingridients");
  }
});

module.exports = router;
