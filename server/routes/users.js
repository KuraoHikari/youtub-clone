import express from 'express';
import { deleteUser, dislike, getUser, like, subscribeUser, unSubscribeUser, updateUser } from '../controllers/user.js';
const router = express.Router();

router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/find/:id', getUser);
router.put('/sub/:id', subscribeUser);
router.put('/unsub/:id', unSubscribeUser);
router.put('/like/:video', like);
router.put('/dislike/:video', dislike);

export default router;
