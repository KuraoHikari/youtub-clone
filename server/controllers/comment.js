import { response } from 'express';
import Comment from '../models/Comment.js';
import Video from '../models/Video.js';
import { createError } from '../utils/error.js';

export const addComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const savedComment = await newComment.save();
    return res.status(200).send(savedComment);
  } catch (error) {
    next(error);
  }
};
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      return res.status(200).json('comment has been deleted');
    } else return next(createError(403, 'acction not allowed'));
  } catch (error) {
    next(error);
  }
};
export const getComment = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    return res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
