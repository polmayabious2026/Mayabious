const fs = require("fs");
const path = require("path");

const homeVideo = require("../model/homevideo.model");

const addVideo = async (req, res) => {
  try {
    const files = req.files || [];
    const { position } = req.body;
    if (position === "") {
      return res.status(400).json({
        status: false,
        message: "Please Provide Position",
      });
    }

    if (files.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Please upload at least one video file",
      });
    }
    const videos = await homeVideo.bulkCreate(
      files.map((file) => ({
        video: file.filename,
        position: position,
        status: "1",
      })),
    );

    return res.status(200).json({
      status: true,
      message: "Video(s) uploaded successfully",
      data: videos,
    });
  } catch (error) {
    console.log("addVideo Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const getallVideo = async (req, res) => {
  try {
    const videos = await homeVideo.findAll();
    return res.status(200).json({
      status: true,
      message: "All videos fetched successfully",
      data: videos,
    });
  } catch (error) {
    console.log("getallVideo Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const getSingleVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await homeVideo.findByPk(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Video fetched successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch Video",
      error: error.message,
    });
  }
};
const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { position } = req.body;

    const videoData = await homeVideo.findByPk(id);

    if (!videoData) {
      return res.status(404).json({
        status: false,
        message: "Video not found",
      });
    }

    if (position === "") {
      return res.status(400).json({
        status: false,
        message: "Please provide position",
      });
    }

    const updateData = {};

    if (req.file) {
      updateData.video = req.file.filename;
    }

    if (position !== undefined) {
      updateData.position = position;
    }

    await videoData.update(updateData);

    return res.status(200).json({
      status: true,
      message: "Video updated successfully",
      data: videoData,
    });
  } catch (error) {
    console.log("updateVideo Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const videoData = await homeVideo.findByPk(id);

    if (!videoData) {
      return res.status(404).json({
        status: false,
        message: "Video not found",
      });
    }

    const filePath = path.join(__dirname, "../uploads", videoData.video);

    fs.unlink(filePath, (error) => {
      if (error) {
        console.log("File delete error:", error);
      }
    });

    await videoData.destroy();

    return res.status(200).json({
      status: true,
      message: "Video deleted successfully",
    });
  } catch (error) {
    console.log("deleteVideo Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
module.exports = {
  addVideo,
  getallVideo,
  getSingleVideo,
  updateVideo,
  deleteVideo,
};
