import express from 'express';
import { addVideo, addView, deleteVideo, getVideo, randomVideo, subVideo, trenVideo, updateVideo } from '../controllers/video.js';
import { verifyToken } from '../utils/verifyToken.js';
const router = express.Router();

router.post('/', verifyToken, addVideo);
router.put('/:id', verifyToken, updateVideo);
router.delete('/:id', verifyToken, deleteVideo);
router.get('/find/:id', getVideo);
router.get('/view/:id', addView);
router.get('/trend', trenVideo);
router.get('/random', randomVideo);
router.get('/sub', verifyToken, subVideo);

export default router;
