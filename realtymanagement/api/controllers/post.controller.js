import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import { ObjectId } from 'mongodb';
import { sendPriceDropNotification } from "../twilio/twilioService.js";

export const getPosts = async (req, res) => {
  const query = req.query;

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
    });

    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;

  // Validate ObjectID
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid post ID format" });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: new ObjectId(id).toString() },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    const token = req.cookies?.token;

    if (token) {
      return jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                postId: id,
                userId: payload.id,
              },
            },
          });
          return res.status(200).json({ ...post, isSaved: saved ? true : false });
        }
        return res.status(200).json({ ...post, isSaved: false });
      });
    }
    res.status(200).json({ ...post, isSaved: false });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get post" });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  // Validate ObjectID
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid post ID format" });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: new ObjectId(id).toString() },
    });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await prisma.post.delete({
      where: { id: new ObjectId(id).toString() },
    });

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ message: "Failed to delete post" });
  }
};


export const updatePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { postData, postDetail } = req.body;

  // Validate ObjectID
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid post ID format" });
  }

  try {
    // Fetch the post to check ownership
    const post = await prisma.post.findUnique({
      where: { id: id.toString() },
      include: { user: true }, // Fetch the related user
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    // Check if the price has decreased
    const oldPrice = post.price;
    const newPrice = postData.price;

    if (newPrice < oldPrice) {
      // Get all users who have saved this post
      const savedPosts = await prisma.savedPost.findMany({
        where: {
          postId: id,
        },
        include: {
          user: true,
        },
      });

      // Extract phone numbers
      const phoneNumbers = savedPosts.map(savedPost => savedPost.user.phoneNumber);

      // Send notifications to all users who have saved this post
      for (const phoneNumber of phoneNumbers) {
        await sendPriceDropNotification(phoneNumber, post.title, newPrice);
        console.log(phoneNumber+" "+post.title+" "+newPrice);
      }
    }

    // Remove the id and postId fields from postDetail if they exist
    if (postDetail) {
      delete postDetail.id;
      delete postDetail.postId;
    }

    // Update the post
    const updatedPost = await prisma.post.update({
      where: { id: id.toString() },
      data: {
        ...postData,
        postDetail: postDetail
          ? {
              upsert: {
                update: postDetail,
                create: postDetail,
              },
            }
          : undefined,
      },
      include: {
        postDetail: true, // Include postDetail to return the updated details
      },
    });

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error("Update Post Error:", err);
    res.status(500).json({ message: err.message });
  }
};