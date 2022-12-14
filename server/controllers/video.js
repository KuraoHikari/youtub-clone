import { createError } from '../utils/error.js';
import Video from '../models/Video.js';
import User from '../models/User.js';

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (error) {
    next(error);
  }
};
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, 'Video not found'));
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json(updatedVideo);
    } else next(createError(403, 'action not allowed'));
  } catch (error) {
    next(error);
  }
};
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, 'Video not found'));
    if (req.user.id === video.userId) {
      const deletedVideo = await Video.findByIdAndDelete(req.params.id);
      return res.status(200).json(deletedVideo);
    } else next(createError(403, 'action not allowed'));
  } catch (error) {
    next(error);
  }
};
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    return res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};
export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    return res.status(200).json('views increase');
  } catch (error) {
    next(error);
  }
};
export const trenVideo = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 }).limit(20);
    return res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
export const randomVideo = async (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token);
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    return res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
export const subVideo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subcribeChannels = user.subscribedUsers;

    const list = await Promise.all(
      subcribeChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(error);
  }
};
export const getByTags = async (req, res, next) => {
  const tags = req.query.tags.split(',');
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    return res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
export const getBySearch = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({ title: { $regex: query, $options: 'i' } }).limit(40);
    return res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
