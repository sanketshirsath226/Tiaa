const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Messages = require("../models/Messages");
const Posts = require("../models/Posts");

router.post("/addPost", async (req, res) => {
    const { userId, message, category } = req.body;
    let messageData;
    try {
        messageData = await Messages.create({
            userId,
            message,
            category
        });
        if (!messageData) {
            return res.status(400).json({
                message: "Post is not added"
            })
        }

        const posts = await Posts.create({
            messageId: messageData._id,
            upvotes: [],
            downvotes: [],
            comments: [],
        })

        if (!posts) {
            return res.status(400).json({
                message: "Post is not added"
            })
        }
        await messageData.save();
        await posts.save();

        res.status(201).json({
            message: "Successfully Added"
        })
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
})

router.get("/", async (req, res) => {
    let posts;
    try {
        posts = await Posts.aggregate([
            {
                $lookup:{
                    from: "messages",
                    localField: "messageId",
                    foreignField: "_id",
                    as: "result",
                }
            },
            {
                    $project: {
                    "result": 1,
                    "count": {$size: "$upvotes"  }
                }
            },{
                $sort:{
                "count": -1
            }
             }
        ]
        )
        if (!posts) {
            return res.status(400).json({ message: "Posts not found" })
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(200).json(error);
    }
})
router.get("/category/:name", async (req, res) => {
    let posts;
    console.log( req.params.name)
    try {
        posts = await Posts.aggregate([
            {
                $lookup:{
                    from: "messages",
                    localField: "messageId",
                    foreignField: "_id",
                    as: "result",
                }
            },
            {
                $match:{
                "result.category": req.params.name,
            }},
            {
                    $project: {
                    "result": 1,
                    "count": {$size: "$upvotes"  }
                }
            },{
                $sort:{
                "count": -1
            }
        }
            
        ]
        )
        if (!posts) {
            return res.status(400).json({ message: "Posts not found" })
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(200).json(error);
    }
})
router.get("/:id", async (req, res) => {
    let posts;
    try {
        posts = await Posts.find({ _id: req.params.id });
        if (!posts) {
            return res.status(400).json({ message: "Posts not found" })
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(200).json(error);
    }
})

router.put("/updatepost/:id", async (req, res) => {
    const { message, category } = req.body;
    let posts;
    try {
        posts = await Posts.findByIdAndUpdate({ _id: req.params.id },
            {
                $set: {
                    id: req.params.id,
                    upvotes: [],
                    downvotes: [],
                    comments: [],
                }
            });
        if (!posts) {
            return res.status(400).json({ message: "Post not found" })
        }
        const messageData = await Messages.findByIdAndUpdate(
            { _id: posts.messageId },
            {
                $set: {
                    id: posts.messageId,
                    message,
                    category,
                }
            });
        if (!messageData) {
            return res.status(400).json({ message: "Message not found" })
        }
        await messageData.save();
        res.status(201).json({
            message: "Successfully Updated Post"
        })
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
})

router.delete("/deletepost/:id", async (req, res) => {
    let posts;
    try {
        posts = await Posts.findOneAndDelete({
            _id: req.params.id,
        });
        if (!posts) {
            return res.status(400).json({ message: "Post not found" })
        }
        const messageData = await Messages.findOneAndDelete({
            _id: posts.messageId,
        })

        if (!messageData) {
            return res.status(400).json({ message: "Message not found" })
        }

        res.status(201).json({
            message: "Successfully Deleted The Post"
        })
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
})

module.exports = router;