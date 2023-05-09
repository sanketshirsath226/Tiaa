import PostModel from "../models/PostModel.js";
import UserModel from "../models/UserModel.js";

export const updatePostToHide = async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.id);
      const {hide} = req.body
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      const newPost = await post.updateOne({ $set: { ishide: !hide } });
      res.status(200).json({ message: `Post ${hide?"showen":"hidden"} successfully` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
  export const updatePostToUnHide = async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      await post.updateOne({ $set: { ishide: false } });
      res.status(200).json({ message: 'Post hidden successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
  export const updatePostToReport = async (req,res) =>{
    try {
      const post = await PostModel.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      const newPost = await post.updateOne({ $set: { isReported: true } });
      res.status(200).json({ message: 'Post hidden successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }

  export const blockUser = async (req,res) =>{
    try {
      const user = await UserModel.findById(req.params.id);
      const {block} = req.body;
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      await user.updateOne({ $set: { isBlock: !block } });
      res.status(200).json({ message: 'Blocked successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }

