import { Router } from "express";
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getMadeForYouSongsAll, getTrendingSongs, getTrendingSongsAll } from "../controller/song.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getAllSongs);
router.get("/featured", getFeaturedSongs);
router.get("/made-for-you", getMadeForYouSongs);
router.get("/trending", getTrendingSongs);
router.get('/made-for-you-all', getMadeForYouSongsAll)
router.get("/trending-all", getTrendingSongsAll);

export default router;
