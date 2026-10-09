const {
  homeImageGallery,
  homeGalleryBigImg,
} = require("../model/home.image.galary.model");
const servicecategory = require("../model/service.categoty.model");
const serviceSubCategory = require("../model/service.subcategory.model");

const sequelize = require("../config/db");

const createHomeImageGallery = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      // service_category_id,
      // service_sub_category_id,
      title,
      title_second,
      description,
      stack,
      position,
      status,
    } = req.body;

    // =========================================================
    // BASIC VALIDATION
    // =========================================================

    // if (!service_category_id) {
    //   await transaction.rollback();

    //   return res.status(400).json({
    //     status: false,
    //     message: "service_category_id is required",
    //   });
    // }

    // if (!service_sub_category_id) {
    //   await transaction.rollback();

    //   return res.status(400).json({
    //     status: false,
    //     message: "service_sub_category_id is required",
    //   });
    // }

    if (!title || !String(title).trim()) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "title is required",
      });
    }

    // if (!description || !String(description).trim()) {
    //   await transaction.rollback();

    //   return res.status(400).json({
    //     status: false,
    //     message: "description is required",
    //   });
    // }

    // if (!stack || !String(stack).trim()) {
    //   await transaction.rollback();

    //   return res.status(400).json({
    //     status: false,
    //     message: "stack is required",
    //   });
    // }

    const small_image = req.files?.small_image?.[0];
    const content_image = req.files?.content_image?.[0];

    // Multiple big images
    const bigImages = req.files?.big_image || [];

    if (!small_image) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "small_image is required",
      });
    }

    if (!content_image) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "content_image is required",
      });
    }

    if (!bigImages.length) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "At least one big_image is required",
      });
    }

    // const checkCategory = await servicecategory.findByPk(service_category_id, {
    //   transaction,
    // });

    // if (!checkCategory) {
    //   await transaction.rollback();

    //   return res.status(400).json({
    //     status: false,
    //     message: "Category not found",
    //   });
    // }

    // const checkSubCategory = await serviceSubCategory.findOne({
    //   where: {
    //     id: service_sub_category_id,
    //     service_category_id: service_category_id,
    //   },
    //   transaction,
    // });

    // if (!checkSubCategory) {
    //   await transaction.rollback();

    //   return res.status(400).json({
    //     status: false,
    //     message: "Sub_category is not present in this category",
    //   });
    // }

    const galleryStatus = status ?? "1";

    if (!["0", "1", 0, 1].includes(galleryStatus)) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Status must be 0 or 1",
      });
    }

    const galleryData = await homeImageGallery.create(
      {
        // service_category_id:service_category_id ?? null,
        // service_sub_category_id :service_sub_category_id ?? null,

        title: String(title).trim().toUpperCase(),

        description: String(description).trim() ?? null,

        stack: String(stack).trim()?? null,

        title_second:title_second.trim().toUpperCase() ?? null,

        position:position ?? null,

        small_image: small_image.filename,
        content_image: content_image.filename,

        status: String(galleryStatus),
      },
      {
        transaction,
      },
    );

    const bigImageData = bigImages.map((file) => {
      return {
        homeimagegallery_id: galleryData.id,

        big_image: file.filename,

        status: String(galleryStatus),
      };
    });

    const createdBigImages = await homeGalleryBigImg.bulkCreate(bigImageData, {
      transaction,
    });
    await transaction.commit();

    return res.status(201).json({
      status: true,
      message: "Home image gallery created successfully",

      data: {
        ...galleryData.toJSON(),

        big_images: createdBigImages,
      },
    });
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }

    console.log("Home image gallery create:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getHomeImageGallery = async (req, res) => {
  try {
    const data = await homeImageGallery.findAll({
      attributes: [
        "id",
        // "service_category_id",
        // "service_sub_category_id",
        "title",
        "title_second",
        "small_image",
        "content_image",
        "position",
        "stack"
      ],
      order: [["position", "ASC"]],

      // include: [
      //   {
      //     model: servicecategory,
      //     as: "category",
      //     attributes: ["id", "name"],
      //   },

      //   {
      //     model: serviceSubCategory,
      //     as: "subcategory",
      //     attributes: ["id", "name"],
      //   },

        // {
        //   model: homeGalleryBigImg,
        //   as: "big_images",
        //   attributes: [
        //     "id",
        //     "homeimagegallery_id",
        //     "big_image",
        //     "status",
        //     "created_at",
        //     "updated_at",
        //   ],
        // },
      // ],
    });

    return res.status(200).json({
      status: true,
      message: "Home image gallery fetched successfully",
      data,
    });
  } catch (error) {
    console.log("Get home image gallery error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getSingleHomeImageGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await homeImageGallery.findOne({
      where: {
        id,
      },

      attributes: [
        "id",
        // "service_category_id",
        // "service_sub_category_id",
        "title",
        "title_second",
        "content_image",
        "description",
        "small_image",
        "stack",
        "status",
        "position"
      ],

      include: [
        // {
        //   model: servicecategory,
        //   as: "category",
        //   attributes: ["id", "name"],
        // },

        // {
        //   model: serviceSubCategory,
        //   as: "subcategory",
        //   attributes: ["id", "name"],
        // },

        {
          model: homeGalleryBigImg,
          as: "big_images",
          attributes: ["id", 
            // "homeimagegallery_id", 
            "big_image"],
          // order: [["id", "ASC"]],
        },
      ],
    });

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Home image gallery not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Home image gallery fetched successfully",
      data,
    });
  } catch (error) {
    console.log("Get single home image gallery error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateHomeImageGallery = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    const {
      // service_category_id,
      // service_sub_category_id,
      title,
      title_second,
      description,
      stack,
      position,
      status,
    } = req.body;

    console.log("BODY:",req.body)

    const data = await homeImageGallery.findOne({
      where: {
        id,
      },
      transaction,
    });

    if (!data) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Home image gallery not found",
      });
    }

    // const categoryId =
    //   service_category_id !== undefined
    //     ? service_category_id
    //     : data.service_category_id;

    // const subCategoryId =
    //   service_sub_category_id !== undefined
    //     ? service_sub_category_id
    //     : data.service_sub_category_id;

    // const checkCategory = await servicecategory.findByPk(categoryId, {
    //   transaction,
    // });

    // if (!checkCategory) {
    //   await transaction.rollback();

    //   return res.status(400).json({
    //     status: false,
    //     message: "Category not found",
    //   });
    // }

    // const checkSubCategory = await serviceSubCategory.findOne({
    //   where: {
    //     id: subCategoryId,
    //     service_category_id: categoryId,
    //   },
    //   transaction,
    // });

    // if (!checkSubCategory) {
    //   await transaction.rollback();

    //   return res.status(400).json({
    //     status: false,
    //     message: "Sub-category is not present in this category",
    //   });
    // }

    const updateData = {
      // service_category_id: categoryId,
      // service_sub_category_id: subCategoryId,
    };

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
    if ( title_second !== undefined) {
      updateData.title_second =title_second.toUpperCase();
    }

    if (description !== undefined) {
      updateData.description = String(description).trim();
    }

    if (stack !== undefined) {
      updateData.stack = String(stack).trim();
    }
    if ( position !== undefined) {
      updateData.position =position;
    }

    if (status !== undefined) {
      if (!["0", "1", 0, 1].includes(status)) {
        await transaction.rollback();

        return res.status(400).json({
          status: false,
          message: "Status must be either 0 or 1",
        });
      }

      updateData.status = String(status);
    }

    const small_image = req.files?.small_image?.[0];
    const content_image = req.files?.content_image?.[0];

    const bigImages = req.files?.big_image || [];

    if (small_image) {
      updateData.small_image = small_image.filename;
    }
    if (content_image) {
      updateData.content_image = content_image.filename;
    }

    await data.update(updateData, {
      transaction,
    });

    // if (bigImages.length > 0) {
    //   // Delete old big images

    //   await homeGalleryBigImg.destroy({
    //     where: {
    //       homeimagegallery_id: data.id,
    //     },
    //     transaction,
    //   });

    //   // Create new big images

    //   const bigImageData = bigImages.map((file) => {
    //     return {
    //       homeimagegallery_id: data.id,
    //       big_image: file.filename,
    //       status: String(status ?? data.status ?? "1"),
    //     };
    //   });

    //   await homeGalleryBigImg.bulkCreate(bigImageData, {
    //     transaction,
    //   });
    // }
    

    if (bigImages.length > 0) {
      // Keep existing big images and add new ones
      const bigImageData = bigImages.map((file) => ({
        homeimagegallery_id: data.id,
        big_image: file.filename,
        status: String(status ?? data.status ?? "1"),
      }));
    
      await homeGalleryBigImg.bulkCreate(bigImageData, {
        transaction,
      });
    }



    const updatedBigImages = await homeGalleryBigImg.findAll({
      where: {
        homeimagegallery_id: data.id,
      },
      transaction,
      order: [["id", "ASC"]],
    });

    await transaction.commit();

    return res.status(200).json({
      status: true,
      message: "Home image gallery updated successfully",

      data: {
        ...data.toJSON(),

        big_images: updatedBigImages,
      },
    });
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }

    console.log("Home image gallery update:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const deleteHomeImageGallery = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    // =========================================================
    // FIND GALLERY
    // =========================================================

    const data = await homeImageGallery.findOne({
      where: {
        id,
      },
      transaction,
    });

    if (!data) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Home image gallery not found",
      });
    }

    // =========================================================
    // DELETE BIG IMAGES
    // =========================================================

    await homeGalleryBigImg.destroy({
      where: {
        homeimagegallery_id: id,
      },
      transaction,
    });

    // =========================================================
    // DELETE MAIN GALLERY
    // =========================================================

    await data.destroy({
      transaction,
    });

    // =========================================================
    // COMMIT
    // =========================================================

    await transaction.commit();

    return res.status(200).json({
      status: true,
      message: "Home image gallery deleted successfully",
    });
  } catch (error) {
    // =========================================================
    // ROLLBACK
    // =========================================================

    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }

    console.log("Delete home image gallery error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


const deleteHomeImageGalleryBigImage = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    // Find only the selected big image
    const image = await homeGalleryBigImg.findByPk(id, {
      transaction,
    });

    if (!image) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Big image not found",
      });
    }

    // Delete only this image record
    await image.destroy({ transaction });

    await transaction.commit();

    return res.status(200).json({
      status: true,
      message: "Big image deleted successfully",
      data: {
        id: image.id,
        homeimagegallery_id: image.homeimagegallery_id,
        big_image: image.big_image,
      },
    });
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }

    console.error("Delete single big image error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


module.exports = {
  createHomeImageGallery,
  getHomeImageGallery,
  getSingleHomeImageGallery,
  updateHomeImageGallery,
  deleteHomeImageGallery,
  deleteHomeImageGalleryBigImage,
};
