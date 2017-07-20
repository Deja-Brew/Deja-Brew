const express = require('express');
const breweryRatingsRouter = express.Router();

const breweryRatingsController = require('../controller/breweryRatingsController.js');

breweryRatingsRouter.get('/:id/:breweryId', breweryRatingsController.getBreweryRating);
breweryRatingsRouter.put('/:id', breweryRatingsController.updateBreweryRating);

module.exports = breweryRatingsRouter;
