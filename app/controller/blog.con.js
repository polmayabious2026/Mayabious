const sequelize = require("../config/db");

const {
  blogModel,
  blogcategory,
  blognblogcategory,
} = require("../model/blog.model");

const path = require("path");
const fs = require("fs");

// =====================================================
// HELPER FUNCTIONS
// =====================================================

// Delete image from uploads folder
const deleteImage = (filename) => {
  if (!filename) return;

  const imagePath = path.join(__dirname, "../uploads", filename);

  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }
};

// Convert category_ids into an array
const getCategoryIds = (category_ids, category_id) => {
  let ids = category_ids ?? category_id;

  if (ids === undefined || ids === null || ids === "") {
    return [];
  }

  if (!Array.isArray(ids)) {
    ids = [ids];
  }

  return ids
    .map((id) => Number(id))
    .filter((id) => Number.isInteger(id) && id > 0);
};


// BLOG

const createBlog = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      date,
      heading,
      title,
      description,
      popular_blogs,
      category_ids,
      category_id,
    } = req.body;


    if (!date || !String(date).trim()) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide date",
      });
    }

    if (!heading || !String(heading).trim()) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide heading",
      });
    }

    if (!title || !String(title).trim()) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide title",
      });
    }

    if (!description || !String(description).trim()) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide description",
      });
    }

    // =====================================================
    // SMALL IMAGE
    // =====================================================

    if (
      !req.files ||
      !req.files.small_image ||
      !req.files.small_image.length
    ) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide small image",
      });
    }

    // =====================================================
    // BIG IMAGE
    // =====================================================

    if (
      !req.files ||
      !req.files.big_image ||
      !req.files.big_image.length
    ) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide big image",
      });
    }

    // =====================================================
    // POPULAR BLOG
    // =====================================================

    const popular = popular_blogs ?? "0";

    if (!["0", "1", 0, 1].includes(popular)) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "popular_blogs must be 0 or 1",
      });
    }

    // =====================================================
    // CATEGORY IDS
    // =====================================================

    let categoryIds = category_ids ?? category_id;

    console.log("RAW CATEGORY IDS:", categoryIds);

    // No category provided
    if (
      categoryIds === undefined ||
      categoryIds === null ||
      categoryIds === ""
    ) {
      categoryIds = [];
    }

    // -----------------------------------------------------
    // If category_ids comes as JSON string
    // Example: "[1,2,3]"
    // -----------------------------------------------------

    if (typeof categoryIds === "string") {
      const trimmedCategoryIds = categoryIds.trim();

      if (trimmedCategoryIds.startsWith("[")) {
        try {
          categoryIds = JSON.parse(trimmedCategoryIds);
        } catch (error) {
          await transaction.rollback();

          return res.status(400).json({
            status: false,
            message: "Invalid category_ids format",
          });
        }
      }

      // Example: "1,2,3"
      else if (trimmedCategoryIds.includes(",")) {
        categoryIds = trimmedCategoryIds.split(",");
      }

      // Example: "1"
      else {
        categoryIds = [trimmedCategoryIds];
      }
    }

    // -----------------------------------------------------
    // If only one category ID is provided
    // -----------------------------------------------------

    if (!Array.isArray(categoryIds)) {
      categoryIds = [categoryIds];
    }

    // -----------------------------------------------------
    // Convert IDs to numbers
    // -----------------------------------------------------

    categoryIds = categoryIds
      .map((id) => Number(id))
      .filter((id) => Number.isInteger(id) && id > 0);

    // Remove duplicate category IDs
    categoryIds = [...new Set(categoryIds)];

    console.log("FINAL CATEGORY IDS:", categoryIds);

    // =====================================================
    // CHECK CATEGORY EXISTS
    // =====================================================

    if (categoryIds.length > 0) {
      const categories = await blogcategory.findAll({
        where: {
          id: categoryIds,
        },
        transaction,
      });

      console.log("FOUND CATEGORIES:", categories);

      if (categories.length !== categoryIds.length) {
        await transaction.rollback();

        return res.status(400).json({
          status: false,
          message: "One or more category IDs are invalid",
          category_ids: categoryIds,
        });
      }
    }

    // =====================================================
    // GET IMAGES
    // =====================================================

    const smallImage = req.files.small_image[0];
    const bigImage = req.files.big_image[0];

    // =====================================================
    // CREATE BLOG
    // =====================================================

    const blogData = await blogModel.create(
      {
        date: String(date).trim(),

        heading: String(heading).trim().toUpperCase(),

        title: String(title).trim().toUpperCase(),

        description: String(description).trim(),

        small_image: smallImage.filename,

        big_image: bigImage.filename,

        popular_blogs: String(popular),
      },
      {
        transaction,
      },
    );

    // =====================================================
    // CREATE BLOG CATEGORY RELATIONS
    // =====================================================

    if (categoryIds.length > 0) {
      const categoryData = categoryIds.map((categoryId) => ({
        blog_id: blogData.id,
        blogcategory_id: categoryId,
      }));

      await blognblogcategory.bulkCreate(categoryData, {
        transaction,
      });
    }

    // =====================================================
    // COMMIT
    // =====================================================

    await transaction.commit();

    // =====================================================
    // RESPONSE
    // =====================================================

    return res.status(201).json({
      status: true,
      message: "Blog created successfully",
      data: blogData,
      category_ids: categoryIds,
    });
  } catch (error) {
    // =====================================================
    // ROLLBACK
    // =====================================================

    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }

    console.log("createBlog Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getallBlog = async (req, res) => {
  try {
    const allData = await blogModel.findAll({
      // order: [["id", "DESC"]],
       include: [
        {
          model: blogcategory,
          as: "blogcategories",
          attributes: ["id", "title"],

          // Hide blognblogcategory data
          through: {
            attributes: [],
          },
        },
      ],
    });
    return res.status(200).json({
      status: true,
      message: "All blogs fetched successfully",
      allData,
    });
  } catch (error) {
    console.log("getallBlog Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const getsingleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blogData = await blogModel.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: blogcategory,
          as: "blogcategories",
          attributes: ["id", "title"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!blogData) {
      return res.status(404).json({
        status: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Blog fetched successfully",
      data: blogData,
    });
  } catch (error) {
    console.log("getsingleBlog Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateBlog = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    const {
      date,
      heading,
      title,
      description,
      popular_blogs,
      category_ids,
      category_id,
    } = req.body;

    console.log("UPDATE BODY:", req.body);
    console.log("UPDATE FILES:", req.files);

    // =====================================================
    // FIND BLOG
    // =====================================================

    const blog = await blogModel.findByPk(id, {
      transaction,
    });

    if (!blog) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Blog not found",
      });
    }

    const oldSmallImage = blog.small_image;
    const oldBigImage = blog.big_image;

    // =====================================================
    // UPDATE DATA
    // =====================================================

    const updateData = {};

    // DATE
    if (date !== undefined) {
      if (!String(date).trim()) {
        await transaction.rollback();

        return res.status(400).json({
          status: false,
          message: "Date cannot be empty",
        });
      }

      updateData.date = String(date).trim();
    }

    // HEADING
    if (heading !== undefined) {
      if (!String(heading).trim()) {
        await transaction.rollback();

        return res.status(400).json({
          status: false,
          message: "Heading cannot be empty",
        });
      }

      updateData.heading = String(heading).trim().toUpperCase();
    }

    // TITLE
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

    // DESCRIPTION
    if (description !== undefined) {
      if (!String(description).trim()) {
        await transaction.rollback();

        return res.status(400).json({
          status: false,
          message: "Description cannot be empty",
        });
      }

      updateData.description = String(description).trim();
    }

    // =====================================================
    // POPULAR BLOG
    // =====================================================

    if (popular_blogs !== undefined) {
      if (!["0", "1", 0, 1].includes(popular_blogs)) {
        await transaction.rollback();

        return res.status(400).json({
          status: false,
          message: "popular_blogs must be 0 or 1",
        });
      }

      updateData.popular_blogs = String(popular_blogs);
    }

    // =====================================================
    // SMALL IMAGE
    // =====================================================

    if (
      req.files &&
      req.files.small_image &&
      req.files.small_image.length > 0
    ) {
      updateData.small_image = req.files.small_image[0].filename;
    }

    // =====================================================
    // BIG IMAGE
    // =====================================================

    if (
      req.files &&
      req.files.big_image &&
      req.files.big_image.length > 0
    ) {
      updateData.big_image = req.files.big_image[0].filename;
    }

    // =====================================================
    // CATEGORY
    // =====================================================

    const categoryWasProvided =
      category_ids !== undefined || category_id !== undefined;

    let categoryIds = [];

    if (categoryWasProvided) {
      let rawCategoryIds = category_ids ?? category_id;

      console.log("RAW CATEGORY IDS:", rawCategoryIds);

      // -----------------------------------------
      // JSON STRING
      // Example: "[1,2]"
      // -----------------------------------------

      if (typeof rawCategoryIds === "string") {
        const trimmed = rawCategoryIds.trim();

        if (trimmed.startsWith("[")) {
          try {
            rawCategoryIds = JSON.parse(trimmed);
          } catch (error) {
            await transaction.rollback();

            return res.status(400).json({
              status: false,
              message: "Invalid category_ids format",
            });
          }
        }

        // -----------------------------------------
        // Comma separated
        // Example: "1,2,3"
        // -----------------------------------------

        else if (trimmed.includes(",")) {
          rawCategoryIds = trimmed.split(",");
        }

        // -----------------------------------------
        // Single ID
        // Example: "1"
        // -----------------------------------------

        else {
          rawCategoryIds = [trimmed];
        }
      }

      // -----------------------------------------
      // Make array
      // -----------------------------------------

      if (!Array.isArray(rawCategoryIds)) {
        rawCategoryIds = [rawCategoryIds];
      }

      // -----------------------------------------
      // Convert to numbers
      // -----------------------------------------

      categoryIds = rawCategoryIds
        .map((item) => Number(item))
        .filter((item) => Number.isInteger(item) && item > 0);

      // Remove duplicates
      categoryIds = [...new Set(categoryIds)];

      console.log("FINAL CATEGORY IDS:", categoryIds);
    }

    // =====================================================
    // CHECK CATEGORIES
    // =====================================================

    if (categoryWasProvided && categoryIds.length > 0) {
      const categories = await blogcategory.findAll({
        where: {
          id: categoryIds,
        },
        transaction,
      });

      if (categories.length !== categoryIds.length) {
        await transaction.rollback();

        return res.status(400).json({
          status: false,
          message: "One or more category IDs are invalid",
          category_ids: categoryIds,
        });
      }
    }

    // =====================================================
    // NOTHING TO UPDATE
    // =====================================================

    if (!Object.keys(updateData).length && !categoryWasProvided) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide data to update",
      });
    }

    // =====================================================
    // UPDATE BLOG
    // =====================================================

    if (Object.keys(updateData).length > 0) {
      await blog.update(updateData, {
        transaction,
      });
    }

    // =====================================================
    // UPDATE CATEGORY RELATIONS
    // =====================================================

    if (categoryWasProvided) {
      // Remove old categories
      await blognblogcategory.destroy({
        where: {
          blog_id: id,
        },
        transaction,
      });

      // Add new categories
      if (categoryIds.length > 0) {
        await blognblogcategory.bulkCreate(
          categoryIds.map((categoryId) => ({
            blog_id: id,
            blogcategory_id: categoryId,
          })),
          {
            transaction,
          },
        );
      }
    }

    // =====================================================
    // COMMIT
    // =====================================================

    await transaction.commit();

    // =====================================================
    // DELETE OLD IMAGES
    // =====================================================

    if (
      updateData.small_image &&
      oldSmallImage &&
      oldSmallImage !== updateData.small_image
    ) {
      deleteImage(oldSmallImage);
    }

    if (
      updateData.big_image &&
      oldBigImage &&
      oldBigImage !== updateData.big_image
    ) {
      deleteImage(oldBigImage);
    }

    // =====================================================
    // GET UPDATED BLOG WITH CATEGORIES
    // =====================================================

    const updatedBlog = await blogModel.findOne({
      where: {
        id,
      },
      include: [
        {
          model: blogcategory,
          as: "blogcategories",
          attributes: ["id", "title"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    // =====================================================
    // RESPONSE
    // =====================================================

    return res.status(200).json({
      status: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }

    console.log("updateBlog Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const deleteBlog = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    const blog = await blogModel.findByPk(id, {
      transaction,
    });

    if (!blog) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Blog not found",
      });
    }

    const smallImage = blog.small_image;
    const bigImage = blog.big_image;

    await blognblogcategory.destroy({
      where: {
        blog_id: id,
      },
      transaction,
    });

    await blog.destroy({
      transaction,
    });

    await transaction.commit();

    deleteImage(smallImage);
    deleteImage(bigImage);

    return res.status(200).json({
      status: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }

    console.log("deleteBlog Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


// BLOG CATEGORY
const addBlogCategory = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    let { title } = req.body;

    if (!Array.isArray(title)) {
      title = title ? [title] : [];
    }

    if (!title.length) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide title",
      });
    }

    for (const item of title) {
      if (!item || !String(item).trim()) {
        await transaction.rollback();

        return res.status(400).json({
          status: false,
          message: "Title cannot be empty",
        });
      }
    }

    const blogcategoryData = await blogcategory.bulkCreate(
      title.map((item) => ({
        title: String(item).trim().toUpperCase(),
      })),
      {
        transaction,
      },
    );

    await transaction.commit();

    return res.status(201).json({
      status: true,
      message: "Blog category added successfully",
      data: blogcategoryData,
    });
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }

    console.log("addBlogCategory Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const getAllCategory = async (req, res) => {
  try {
    const data = await blogcategory.findAll({
      
    });

    return res.status(200).json({
      status: true,
      message: "Blog categories fetched successfully",
      data,
    });
  } catch (error) {
    console.log("getAllCategory Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const singleData = await blogcategory.findByPk(id);

    if (!singleData) {
      return res.status(404).json({
        status: false,
        message: "Blog category not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Blog category fetched successfully",
      data: singleData,
    });
  } catch (error) {
    console.log("getSingleCategory Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const updateBlogCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, status } = req.body;

    const category = await blogcategory.findByPk(id);

    if (!category) {
      return res.status(404).json({
        status: false,
        message: "Blog category not found",
      });
    }

    const updateData = {};

    if (title !== undefined) {
      if (!String(title).trim()) {
        return res.status(400).json({
          status: false,
          message: "Title cannot be empty",
        });
      }

      updateData.title = String(title).trim().toUpperCase();
    }

    if (status !== undefined) {
      if (!["0", "1", 0, 1].includes(status)) {
        return res.status(400).json({
          status: false,
          message: "Status must be 0 or 1",
        });
      }

      updateData.status = String(status);
    }

    if (!Object.keys(updateData).length) {
      return res.status(400).json({
        status: false,
        message: "Please provide data to update",
      });
    }

    await category.update(updateData);

    return res.status(200).json({
      status: true,
      message: "Blog category updated successfully",
      data: category,
    });
  } catch (error) {
    console.log("updateBlogCategory Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const deleteBlogCategory = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    const category = await blogcategory.findByPk(id, {
      transaction,
    });

    if (!category) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Blog category not found",
      });
    }

    // Delete category relations first
    await blognblogcategory.destroy({
      where: {
        blogcategory_id: id,
      },
      transaction,
    });

    // Delete category
    await category.destroy({
      transaction,
    });

    await transaction.commit();

    return res.status(200).json({
      status: true,
      message: "Blog category deleted successfully",
    });
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }

    console.log("deleteBlogCategory Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  // Blog
  createBlog,
  getallBlog,
  getsingleBlog,
  updateBlog,
  deleteBlog,

  // Blog Category
  addBlogCategory,
  getAllCategory,
  getSingleCategory,
  updateBlogCategory,
  deleteBlogCategory,
};
