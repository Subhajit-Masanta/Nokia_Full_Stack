import express from 'express';
import { getWeeklyChart, getMonthlyChart } from '../Pages/Chart_Back.js';
import { getComparision } from '../Pages/Comparision_Back.js';
import { getSessionWeights } from '../Pages/Weightlist_Back.js';
import { getCurrentMonthWaste } from '../Pages/Monthly_Back.js';

const router = express.Router();

// Food waste analytics routes
router.get('/comparision', getComparision);
router.get('/weights', getSessionWeights);
router.get('/weekly-chart', getWeeklyChart);
router.get('/monthly-chart', getMonthlyChart);
router.get('/monthly-waste', getCurrentMonthWaste);

export default router;