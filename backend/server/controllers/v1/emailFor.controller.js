import { runListQuery } from "../../utils/listQuery.js";
import EmailForModels from "../../models/EmailFor.js";
import EmailTemplateModels from "../../models/EmailTemplate.js";

export const createEmailFor = async (req, res) => {
  try {
    const { emailFor, isActive } = req.body;

    const existingEmailFor = await EmailForModels.findOne({ emailFor });

    if (existingEmailFor) {
      return res.status(409).json({
        isOk: false,
        status: 409,
        message: "Email For already exists",
      });
    }

    const emailForData = new EmailForModels({
      emailFor,
      isActive,
    });

    await emailForData.save();

    return res.status(201).json({
      status: 201,
      isOk: true,
      message: "Email For created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      isOk: false,
      status: 500,
      message: "Internal server error",
      error: error,
    });
  }
};

export const updateEmailFor = async (req, res) => {
  try {
    const { emailForId } = req.params;

    const { emailFor, isActive } = req.body;

    const emailForData = await EmailForModels.findById(emailForId);

    if (!emailForData) {
      return res.status(404).json({
        isOk: false,
        status: 404,
        message: "Email For not found",
      });
    }

    const existingEmailFor = await EmailForModels.findOne({
      emailFor,
      _id: { $ne: emailForId },
    });

    if (existingEmailFor) {
      return res.status(409).json({
        isOk: false,
        status: 409,
        message: "Email For already exists",
      });
    }

    emailForData.emailFor = emailFor;
    emailForData.isActive = isActive;

    await emailForData.save();

    return res.status(200).json({
      status: 200,
      isOk: true,
      message: "Email For updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      isOk: false,
      status: 500,
      message: "Internal server error",
      error: error,
    });
  }
};

export const getEmailForById = async (req, res) => {
  try {
    const { emailForId } = req.params;

    const emailForData = await EmailForModels.findById(emailForId);

    if (!emailForData) {
      return res.status(404).json({
        isOk: false,
        status: 404,
        message: "Email For not found",
      });
    }

    return res.status(200).json({
      status: 200,
      isOk: true,
      data: emailForData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      isOk: false,
      status: 500,
      message: "Internal server error",
      error: error,
    });
  }
};

export const listAllEmailFor = async (req, res) => {
  try {
    const emailForData = await EmailForModels.find({ isActive: true });

    return res.status(200).json({
      status: 200,
      isOk: true,
      data: emailForData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      isOk: false,
      status: 500,
      message: "Internal server error",
      error: error,
    });
  }
};

export const deleteEmailFor = async (req, res) => {
  try {
    const { emailForId } = req.params;
    console.log(emailForId);

    const emailForData = await EmailForModels.findById(emailForId);

    if (!emailForData) {
      return res.status(404).json({
        isOk: false,
        status: 404,
        message: "Email For not found",
      });
    }

    const dependantTemplate = await EmailTemplateModels.find({
      emailFor: emailForData._id,
    });

    if (dependantTemplate.length > 0) {
      return res.status(400).json({
        isOk: false,
        status: 400,
        message:
          "Email for is being used in Email Template. Either Delete or change the Email For Field in the Template.",
      });
    }

    await EmailForModels.findByIdAndUpdate(emailForId, { isDeleted: true });

    return res.status(200).json({
      status: 200,
      isOk: true,
      message: "Email For deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      isOk: false,
      status: 500,
      message: "Internal server error",
      error: error,
    });
  }
};

export const listEmailForByParams = async (req, res) => {
  try {
    const list = await runListQuery(EmailForModels, req.body, {
      searchFields: ["emailFor"],
      filterable: {
        emailFor: "string",
        isActive: "boolean",
        createdAt: "date",
      },
    });

    return res.status(200).json({ isOk: true, data: list, status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ isOk: false, message: error.message, status: 500 });
  }
};
