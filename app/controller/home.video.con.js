const fs = require("fs");
const path = require("path");
const sequelize = require("../config/db");

const { homeVideo, homeVideoSet, homeVideo_nhomeVideoSet } = require("../model/homevideo.model");
const { where } = require("sequelize");
const { array } = require("../middleware/fileupload_video");

const deleteVideoFile = (filename) => {
  try {
    if (!filename) return;

    const filePath = path.join(
      __dirname,
      "../uploads",
      filename
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error("Video file delete error:", error);
  }
};

// home-video
const addVideo = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { homevideoset_id } = req.params;
    const { position } = req.body;

    if (!homevideoset_id) {
      await t.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide homevideoset_id",
      });
    }

    if (
      position === undefined ||
      position === null ||
      String(position).trim() === ""
    ) {
      await t.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide position",
      });
    }
    const files = req.files || [];

    if (files.length !== 9) {
      await t.rollback();

      return res.status(400).json({
        status: false,
        message: "Please upload exactly 9 video files",
        data: `${files.length} videos provided, need total 9`,
      });
    }


    const homeVideoSets = await homeVideoSet.findByPk(
      homevideoset_id,
      {
        transaction: t,
      }
    );

    if (!homeVideoSets) {
      await t.rollback();

      return res.status(404).json({
        status: false,
        message: "Home Video Set not found",
      });
    }



    const videoData = files.map((file,index) => ({
      video: file.filename,
      position: position[index],
      status: "1",
    }));

    const homeVideos = await homeVideo.bulkCreate(videoData, {
      transaction: t,
    });


    const homeVideoSetMappings = homeVideos.map((video) => ({
      homevideo_id: video.id,
      homevideoset_id: Number(homevideoset_id),
    }));

    await homeVideo_nhomeVideoSet.bulkCreate(
      homeVideoSetMappings,
      {
        transaction: t,
      }
    );



    await t.commit();



    const result = await homeVideoSet.findByPk(
      homevideoset_id,
      {
        include: [
          {
            model: homeVideo,
            as: "homevideos",
            through: {
              attributes: [],
            },
          },
        ],
      }
    );

    return res.status(201).json({
      status: true,
      message: "Videos uploaded successfully",
      data: result,
    });
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    console.log("addVideo Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const getallVideo = async (req, res) => {
  try {
    const videos = await homeVideo.findAll({
      include:{
        model:homeVideoSet,
        as:"homevideosets",
         through: {
            attributes: [],
          },
      }
    });
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

    const data = await homeVideo.findOne({
      where:{
        id:id,
      },include:{
        model:homeVideoSet,
        as:"homevideosets",
         through: {
            attributes: [],
          },
      }
    });

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
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    const { position } = req.body;

    // --------------------------------------------------
    // FIND VIDEO
    // --------------------------------------------------

    const videoData = await homeVideo.findByPk(id, {
      transaction,
    });

    if (!videoData) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Video not found",
      });
    }

    const oldVideo = videoData.video;

    const updateData = {};

    // --------------------------------------------------
    // VALIDATE POSITION
    // --------------------------------------------------

    if (position !== undefined) {
      if (
        position === null ||
        String(position).trim() === ""
      ) {
        await transaction.rollback();

        return res.status(400).json({
          status: false,
          message: "Please provide position",
        });
      }

      if (!Number.isInteger(Number(position))) {
        await transaction.rollback();

        return res.status(400).json({
          status: false,
          message: "Position must be a valid number",
        });
      }

      updateData.position = Number(position);
    }

    // --------------------------------------------------
    // NEW VIDEO
    // --------------------------------------------------

    if (req.file) {
      updateData.video = req.file.filename;
    }

    // --------------------------------------------------
    // NOTHING TO UPDATE
    // --------------------------------------------------

    if (!Object.keys(updateData).length) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide data to update",
      });
    }

    // --------------------------------------------------
    // UPDATE
    // --------------------------------------------------

    await videoData.update(updateData, {
      transaction,
    });

    // --------------------------------------------------
    // COMMIT
    // --------------------------------------------------

    await transaction.commit();

    // --------------------------------------------------
    // DELETE OLD VIDEO AFTER SUCCESSFUL DB UPDATE
    // --------------------------------------------------

    if (
      updateData.video &&
      oldVideo &&
      oldVideo !== updateData.video
    ) {
      deleteVideoFile(oldVideo);
    }

    // --------------------------------------------------
    // GET UPDATED DATA
    // --------------------------------------------------

    const updatedVideo = await homeVideo.findByPk(id);

    return res.status(200).json({
      status: true,
      message: "Video updated successfully",
      data: updatedVideo,
    });
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }

    console.log("updateVideo Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const deleteVideo = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    const videoData = await homeVideo.findByPk(id, {
      transaction,
    });

    if (!videoData) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Video not found",
      });
    }

    const videoFile = videoData.video;

    await videoData.destroy({
      transaction,
    });

    await transaction.commit();

    if (videoFile) {
      deleteVideoFile(videoFile);
    }

    return res.status(200).json({
      status: true,
      message: "Video deleted successfully",
    });
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }

    console.log("deleteVideo Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};




// homevideoSet
const addhomeVideoSet = async (req, res) => {
  try {
    let { name } = req.body;

    if (!Array.isArray(name)) {
      name = name ? [name] : [];
    }

  
    if (!name.length) {
      return res.status(400).json({
        status: false,
        message: "Please provide name",
      });
    }

   
    for (let i = 0; i < name.length; i++) {
      if (!name[i] || !String(name[i]).trim()) {
        return res.status(400).json({
          status: false,
          message: `Name at index ${i} cannot be empty`,
        });
      }
    }

    
    const addData = name.map((item) => ({
      name: String(item).trim(),
    }));

   
    const data = await homeVideoSet.bulkCreate(addData);

    return res.status(201).json({
      status: true,
      message:
        data.length === 1
          ? "Home Video Set created successfully"
          : "Home Video Sets created successfully",
      data,
    });
  } catch (error) {
    console.log("addhomeVideoSet Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const gethomeVideoSet = async(req,res)=>{
  try{
  const allData = await homeVideoSet.findAll({
    include:{
      model:homeVideo,
      as:"homevideos",
      through:{
        attributes:[]
      }
    }
  })
  return res.status(200).json({
    status:true,
    message:"Home video set fetched successfully",
    data:allData,
  })
  }catch (error) {
    console.log("gethomeVideoSet Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
}
const getSingleHomeVideoSet = async(req,res)=>{
  try{
    const {id}= req.params;
  const Data = await homeVideoSet.findOne({
    where:{
      id:id,
    },include:{
      model:homeVideo,
      as:"homevideos",
      through:{
        attributes:[]
      }
    }
  })
  if(!Data ){
    return res.status(404).json({
      status:false,
      message:"No Home video set found"
    })
  }
  return res.status(200).json({
    status:true,
    message:"Home video set fetched successfully",
    data:Data,
  })
  }catch (error) {
    console.log("getSingleHomeVideoSet Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
}
const updatehomeVideoSet = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedRows = await homeVideoSet.update(
      {
        name: String(name).trim(),
      },
      {
        where: {
          id: id,
        },
      },
    );
    const findData = await homeVideoSet.findByPk(id);

    if (updatedRows === 0) {
      return res.status(404).json({
        status: false,
        message: "No Home video set found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Home video set updated successfully",
      data: findData,
    });
  } catch (error) {
    console.log("updatehomeVideoSet Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const deletehomeVideoSet = async (req, res) => {
  try {
    const { id } = req.params;

    const Data = await homeVideoSet.findByPk(id);

    if (!Data) {
      return res.status(404).json({
        status: false,
        message: "No Home video set found",
      });
    }

    await Data.destroy();

    return res.status(200).json({
      status: true,
      message: "Home video set deleted successfully",
    });
  } catch (error) {
    console.log("deletehomeVideoSet Error:", error);

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

  // homevideoSet
  addhomeVideoSet,
  gethomeVideoSet,
  getSingleHomeVideoSet,
  updatehomeVideoSet,
  deletehomeVideoSet ,
};
