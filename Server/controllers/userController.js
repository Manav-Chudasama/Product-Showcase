import mongoose from "mongoose";
import userModel from "../models/userModel.js";

import { Webhook } from "svix";

export const createUser = async (req, res) => {
  console.log("createUser");
  try {
    const payloadString = req.body.toString();
    const svixHeaders = req.headers;

    const wh = new Webhook(
      process.env.CREATE_USER || "whsec_vp+oSW2imKmkP8Z4LpNPL0tEq/tTbLQO"
    );
    const evt = wh.verify(payloadString, svixHeaders);

    const { id, ...attributes } = evt.data;

    const eventType = evt.type;

    if (eventType === "user.created") {
      console.log("user.created");
      const user = await userModel.create({
        userId: id,
        email: attributes.email_addresses[0].email_address,
        firstName: attributes.first_name,
        lastName: attributes.last_name,
        profileImage: attributes.image_url,
      });
    }

    res.status(200).json({
      success: true,
      message: "user creatred successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find(); // Fetch all users from the database
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  console.log("updateUser");
  try {
    // Parse the webhook payload and headers
    const payloadString = req.body.toString();
    const svixHeaders = req.headers;

    // Initialize the webhook with your secret key
    const wh = new Webhook("whsec_qRza9ctyPYohMzdc46IFi0PCCvwX90lv");
    const evt = wh.verify(payloadString, svixHeaders);

    const { id, ...attributes } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.updated") {
      console.log("user.updated");

      // Find the user by userId and update their information
      const updatedUser = await userModel.findOneAndUpdate(
        { userId: id },
        {
          email: attributes.email_addresses[0].email_address,
          firstName: attributes.first_name,
          lastName: attributes.last_name,
          profileImage: attributes.image_url,
        },
        { new: true } // Return the updated document
      );

      res.status(200).json({
        success: true,
        message: "User updated successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Event type not supported",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  console.log("deleteUser");
  try {
    // Parse the webhook payload and headers
    const payloadString = req.body.toString();
    const svixHeaders = req.headers;

    // Initialize the webhook with your secret key
    const wh = new Webhook("whsec_OwGcV3d30bTYqcp1LI5q47K/0ns5MowF");
    const evt = wh.verify(payloadString, svixHeaders);

    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.deleted") {
      console.log("user.deleted");

      // Find the user by userId and delete them
      const deletedUser = await userModel.findOneAndDelete({ userId: id });

      if (deletedUser) {
        res.status(200).json({
          success: true,
          message: "User deleted successfully",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Event type not supported",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message,
    });
  }
};
