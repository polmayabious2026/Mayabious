const sequelize = require("../config/db");
// models
const services = require("../model/services.model");
const servicecategory = require("../model/service.categoty.model");
const serviceSubCategory = require("../model/service.subcategory.model");

const path = require("path");
const fs = require("fs");

// Delete image from uploads folder
const deleteImage = (filename) => {
  if (!filename) return;

  const imagePath = path.join(__dirname, "../uploads", filename);

  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }
};

const createServices = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      service_category_id,
      service_sub_category_id,
      title,
      description,
      youtube_link,
      status,
    } = req.body;

    // --------------------------------------------------
    // BASIC VALIDATION
    // --------------------------------------------------

    if (!service_category_id) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide service_category_id",
      });
    }

    if (!service_sub_category_id) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide service_sub_category_id",
      });
    }

    // --------------------------------------------------
    // NORMALIZE TITLE
    // --------------------------------------------------

    let titles = title;

    if (!Array.isArray(titles)) {
      titles = titles ? [titles] : [];
    }

    if (!titles.length) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide title",
      });
    }

    // Validate every title
    for (let i = 0; i < titles.length; i++) {
      if (!titles[i] || !String(titles[i]).trim()) {
        await transaction.rollback();

        return res.status(400).json({
          status: false,
          message: `Title at index ${i} cannot be empty`,
        });
      }
    }

    // --------------------------------------------------
    // NORMALIZE DESCRIPTION
    // --------------------------------------------------

    let descriptions = description;

    if (!Array.isArray(descriptions)) {
      descriptions =
        descriptions !== undefined && descriptions !== null
          ? [descriptions]
          : [];
    }

    if (
      descriptions.length !== 0 &&
      descriptions.length !== 1 &&
      descriptions.length !== titles.length
    ) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message:
          "Number of descriptions must be 1 or equal to number of titles",
        titleCount: titles.length,
        descriptionCount: descriptions.length,
      });
    }

    // --------------------------------------------------
    // NORMALIZE YOUTUBE LINKS
    // --------------------------------------------------

    let youtubeLinks = youtube_link;

    if (!Array.isArray(youtubeLinks)) {
      youtubeLinks =
        youtubeLinks !== undefined &&
        youtubeLinks !== null &&
        String(youtubeLinks).trim() !== ""
          ? [youtubeLinks]
          : [];
    }

    // Make sure array has same number of positions as titles.
    // Missing positions become null.
    const normalizedYoutubeLinks = Array.from(
      { length: titles.length },
      (_, index) => {
        const link = youtubeLinks[index];

        if (link === undefined || link === null || !String(link).trim()) {
          return null;
        }

        return String(link).trim();
      }
    );

    // --------------------------------------------------
    // STATUS
    // --------------------------------------------------

    const serviceStatus = status ?? "1";

    if (!["0", "1", 0, 1].includes(serviceStatus)) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Status must be 0 or 1",
      });
    }

    // --------------------------------------------------
    // FILE VALIDATION
    // --------------------------------------------------

    const smallImages = req.files?.small_image || [];
    const bigImages = req.files?.big_image || [];

    // Small image is required for every title
    if (!smallImages.length) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide small image",
      });
    }

    if (smallImages.length !== titles.length) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Number of small images must be equal to number of titles",
        titleCount: titles.length,
        smallImageCount: smallImages.length,
      });
    }

    // --------------------------------------------------
    // BIG IMAGE / YOUTUBE VALIDATION
    // --------------------------------------------------
    //
    // Every title MUST have:
    //      either big_image
    //      OR youtube_link
    //
    // But NOT both.
    //
    // Example:
    //
    // title[0] -> big_image[0]
    // title[1] -> youtube_link[1]
    // title[2] -> big_image[2]
    //
    // --------------------------------------------------

    if (bigImages.length > titles.length) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Too many big images provided",
        titleCount: titles.length,
        bigImageCount: bigImages.length,
      });
    }

    for (let i = 0; i < titles.length; i++) {
      const hasBigImage = !!bigImages[i];
      const hasYoutubeLink = !!normalizedYoutubeLinks[i];

      // Neither image nor youtube
      if (!hasBigImage && !hasYoutubeLink) {
        await transaction.rollback();

        return res.status(400).json({
          status: false,
          message: `Please provide either big image or youtube link for title at index ${i}`,
          title: String(titles[i]).trim(),
          index: i,
        });
      }

      // Both image and youtube provided
      if (hasBigImage && hasYoutubeLink) {
        await transaction.rollback();

        return res.status(400).json({
          status: false,
          message: `Provide either big image or youtube link, not both, for title at index ${i}`,
          title: String(titles[i]).trim(),
          index: i,
        });
      }
    }

    // --------------------------------------------------
    // CHECK CATEGORY
    // --------------------------------------------------

    const checkcategory = await servicecategory.findByPk(
      service_category_id,
      {
        transaction,
      }
    );

    if (!checkcategory) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Category not found",
      });
    }

    // --------------------------------------------------
    // CHECK SUB CATEGORY
    // --------------------------------------------------

    const checkSubCategory = await serviceSubCategory.findOne({
      where: {
        id: service_sub_category_id,
        service_category_id: service_category_id,
      },
      transaction,
    });

    if (!checkSubCategory) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Sub_category is not present in this category",
      });
    }

    // --------------------------------------------------
    // CREATE SERVICE DATA
    // --------------------------------------------------

    const serviceData = titles.map((item, index) => {
      let serviceDescription = null;

      if (descriptions.length === 1) {
        serviceDescription = descriptions[0];
      } else if (descriptions.length === titles.length) {
        serviceDescription = descriptions[index];
      }

      const hasBigImage = !!bigImages[index];
      const hasYoutubeLink = !!normalizedYoutubeLinks[index];

      return {
        service_category_id,
        service_sub_category_id,

        title: String(item).trim().toUpperCase(),

        description:
          serviceDescription !== undefined &&
          serviceDescription !== null
            ? String(serviceDescription).trim()
            : null,

        small_image: smallImages[index].filename,

        big_image: hasBigImage
          ? bigImages[index].filename
          : null,

        youtube_link: hasYoutubeLink
          ? normalizedYoutubeLinks[index]
          : null,

        status: String(serviceStatus),
      };
    });

    console.log("SERVICE DATA:", serviceData);

    // --------------------------------------------------
    // BULK CREATE
    // --------------------------------------------------

    const data = await services.bulkCreate(serviceData, {
      transaction,
    });

    // --------------------------------------------------
    // COMMIT
    // --------------------------------------------------

    await transaction.commit();

    return res.status(201).json({
      status: true,
      message:
        data.length === 1
          ? "Service created successfully"
          : "Services created successfully",
      data,
    });
  } catch (error) {
    // Don't rollback an already committed/rolled-back transaction
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }

    console.log("createServices Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getallServices = async (req, res) => {
  try {
    const data = await services.findAll({
      attributes: ["id", "title", "small_image","big_image","description","youtube_link"],
      include: [
        {
          model: servicecategory,
          as: "category",
          attributes: ["id", "name"],
        },
        {
          model: serviceSubCategory,
          as: "subcategory",
          attributes: ["id", "name"],
        },
      ],
      order: [["id", "DESC"]],
    });

    return res.status(200).json({
      status: true,
      message: "Services fetched successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const getSingleServices = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await services.findOne({
      where: {
        id,
      },
      attributes: ["id", "title", "small_image","big_image","description","youtube_link"],
      include: [
        {
          model: servicecategory,
          as: "category",
          attributes: ["id", "name"],
        },
        {
          model: serviceSubCategory,
          as: "subcategory",
          attributes: ["id", "name"],
        },
      ],
      order: [["id", "DESC"]],
    });

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Services not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Services fetched successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const updateServices = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    const {
      service_category_id,
      service_sub_category_id,
      title,
      description,
      youtube_link,
      status,
    } = req.body;

    // --------------------------------------------------
    // FIND SERVICE
    // --------------------------------------------------

    const service = await services.findByPk(id, {
      transaction,
    });

    if (!service) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Service not found",
      });
    }

    const oldSmallImage = service.small_image;
    const oldBigImage = service.big_image;

    const updateData = {};

    // --------------------------------------------------
    // CATEGORY
    // --------------------------------------------------

    if (service_category_id !== undefined) {
      if (!service_category_id) {
        await transaction.rollback();

        return res.status(400).json({
          status: false,
          message: "service_category_id cannot be empty",
        });
      }

      updateData.service_category_id = service_category_id;
    }

    // --------------------------------------------------
    // SUB CATEGORY
    // --------------------------------------------------

    if (service_sub_category_id !== undefined) {
      if (!service_sub_category_id) {
        await transaction.rollback();

        return res.status(400).json({
          status: false,
          message: "service_sub_category_id cannot be empty",
        });
      }

      updateData.service_sub_category_id = service_sub_category_id;
    }

    // --------------------------------------------------
    // TITLE
    // --------------------------------------------------

    if (title !== undefined) {
      if (!String(title).trim()) {
        await transaction.rollback();

        return res.status(400).json({
          status: false,
          message: "Title cannot be empty",
        });
      }

      updateData.title = String(title).trim().toUpperCase();
    }

    // --------------------------------------------------
    // DESCRIPTION
    // --------------------------------------------------

    if (description !== undefined) {
      updateData.description =
        description !== null
          ? String(description).trim()
          : null;
    }

    // --------------------------------------------------
    // YOUTUBE LINK
    // --------------------------------------------------

    if (youtube_link !== undefined) {
      updateData.youtube_link =
        youtube_link !== null &&
        String(youtube_link).trim() !== ""
          ? String(youtube_link).trim()
          : null;
    }

    // --------------------------------------------------
    // STATUS
    // --------------------------------------------------

    if (status !== undefined) {
      if (!["0", "1", 0, 1].includes(status)) {
        await transaction.rollback();

        return res.status(400).json({
          status: false,
          message: "Status must be 0 or 1",
        });
      }

      updateData.status = String(status);
    }

    // --------------------------------------------------
    // CATEGORY + SUB CATEGORY VALIDATION
    // --------------------------------------------------

    const finalCategoryId =
      service_category_id !== undefined
        ? service_category_id
        : service.service_category_id;

    const finalSubCategoryId =
      service_sub_category_id !== undefined
        ? service_sub_category_id
        : service.service_sub_category_id;

    if (
      service_category_id !== undefined ||
      service_sub_category_id !== undefined
    ) {
      const checkcategory = await servicecategory.findByPk(
        finalCategoryId,
        {
          transaction,
        }
      );

      if (!checkcategory) {
        await transaction.rollback();

        return res.status(400).json({
          status: false,
          message: "Category not found",
        });
      }

      const checkSubCategory = await serviceSubCategory.findOne({
        where: {
          id: finalSubCategoryId,
          service_category_id: finalCategoryId,
        },
        transaction,
      });

      if (!checkSubCategory) {
        await transaction.rollback();

        return res.status(400).json({
          status: false,
          message: "Sub_category is not present in this category",
        });
      }
    }

    // --------------------------------------------------
    // SMALL IMAGE
    // --------------------------------------------------

    if (
      req.files?.small_image &&
      req.files.small_image.length > 0
    ) {
      updateData.small_image =
        req.files.small_image[0].filename;
    }

    // --------------------------------------------------
    // BIG IMAGE
    // --------------------------------------------------

    if (
      req.files?.big_image &&
      req.files.big_image.length > 0
    ) {
      updateData.big_image =
        req.files.big_image[0].filename;
    }

    // --------------------------------------------------
    // CHECK UPDATE DATA
    // --------------------------------------------------

    if (!Object.keys(updateData).length) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide data to update",
      });
    }

    // --------------------------------------------------
    // UPDATE DATABASE
    // --------------------------------------------------

    await service.update(updateData, {
      transaction,
    });

    // --------------------------------------------------
    // COMMIT
    // --------------------------------------------------

    await transaction.commit();

    // --------------------------------------------------
    // DELETE OLD SMALL IMAGE
    // --------------------------------------------------

    if (
      updateData.small_image &&
      oldSmallImage &&
      oldSmallImage !== updateData.small_image
    ) {
      deleteImage(oldSmallImage);
    }

    // --------------------------------------------------
    // DELETE OLD BIG IMAGE
    // --------------------------------------------------

    if (
      updateData.big_image &&
      oldBigImage &&
      oldBigImage !== updateData.big_image
    ) {
      deleteImage(oldBigImage);
    }

    // --------------------------------------------------
    // GET UPDATED SERVICE
    // --------------------------------------------------

    const updatedService = await services.findByPk(id);

    return res.status(200).json({
      status: true,
      message: "Service updated successfully",
      data: updatedService,
    });
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }

    console.log("updateServices Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const deleteServices = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await services.findByPk(id);

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Services not found",
      });
    }

    await data.destroy();

    return res.status(200).json({
      status: true,
      message: "Services deleted successfully",
    });
  } catch (error) {
    console.log("Services delete:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  createServices,
  getallServices,
  getSingleServices,
  updateServices,
  deleteServices,
};
