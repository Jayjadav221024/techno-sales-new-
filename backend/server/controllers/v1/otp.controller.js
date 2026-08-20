import { OTP } from "@demo-panel/shared/auth";
import Otp from "../../models/Otp.js";
import User from "../../models/User.js";
import AdminUser from "../../models/AdminUser.js";
import EmailTemplate from "../../models/EmailTemplate.js";
import EmailFor from "../../models/EmailFor.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const createOtp = async (req, res) => {
  try {
    const { email } = req.body;

    let user = await AdminUser.findOne({ email });

    if (!user) {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({
        isOk: false,
        message: "User not found",
      });
    }

    // Check if an OTP was recently sent (within the last minute)
    const existingOtp = await Otp.findOne({ email });
    if (existingOtp) {
      const timeDiff = Date.now() - existingOtp.createdAt.getTime();
      const cooldownPeriod = OTP.RESEND_COOLDOWN_MS;

      if (timeDiff < cooldownPeriod) {
        const remainingTime = Math.ceil((cooldownPeriod - timeDiff) / 1000);
        return res.status(429).json({
          isOk: false,
          message: `Please wait ${remainingTime} seconds before requesting a new OTP`,
          remainingTime: remainingTime,
        });
      }

      // Delete the previous OTP if it exists and cooldown has passed
      await Otp.deleteOne({ email });
    }

    // Generate OTP
    const otp = String(Math.floor(Math.random() * 10 ** OTP.LENGTH)).padStart(
      OTP.LENGTH,
      "0",
    );

    // Create new OTP
    await Otp.create({
      email,
      otp,
      createdAt: new Date(),
    });

    // Find email template for forgot password
    const forgotPasswordType = await EmailFor.findOne({
      emailFor: "Forget Password",
    });
    if (!forgotPasswordType) {
      return res.status(404).json({
        isOk: false,
        message: "Email template type not found",
      });
    }

    // Get email template
    const emailTemplate = await EmailTemplate.findOne({
      emailFor: forgotPasswordType._id,
      isActive: true,
    }).populate("emailFrom");

    if (!emailTemplate) {
      return res.status(404).json({
        isOk: false,
        message: "Email template not found",
      });
    }

    // Replace template variables in email body
    let emailBody = emailTemplate.emailSignature;
    const username = user.adminName || user.userName || "Admin";
    emailBody = emailBody.replace("{{USERNAME}}", username);
    emailBody = emailBody.replace("{{OTP_CODE}}", otp);
    emailTemplate.emailSignature = emailBody;

    // Create transporter
    let transporter;
    try {
      // Set up configuration based on email provider
      if (emailTemplate.emailFrom.host.toLowerCase().includes("gmail")) {
        transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: emailTemplate.emailFrom.email,
            pass: emailTemplate.emailFrom.appPassword,
          },
        });
      } else {
        transporter = nodemailer.createTransport({
          host: emailTemplate.emailFrom.host,
          port: emailTemplate.emailFrom.port,
          secure: emailTemplate.emailFrom.SSL,
          auth: {
            user: emailTemplate.emailFrom.email,
            pass: emailTemplate.emailFrom.appPassword,
          },
        });
      }

      // Send email
      await transporter.sendMail({
        from: `"${emailTemplate.mailerName}" <${emailTemplate.emailFrom.email}>`,
        to: email,
        cc: emailTemplate.emailCC || "",
        bcc: emailTemplate.emailBCC || "",
        subject: emailTemplate.emailSubject,
        html: emailTemplate.emailSignature,
      });

      console.log("Email sent successfully");

      return res.status(200).json({
        isOk: true,
        message: "OTP sent to your email",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        isOk: false,
        message: "Failed to send OTP email",
        error: emailError.message,
      });
    }
  } catch (error) {
    console.error("Error in createOtp:", error);
    return res.status(500).json({
      isOk: false,
      message: "Failed to send OTP",
      error: error.message,
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord) {
      return res.status(400).json({
        isOk: false,
        message: "OTP not found or expired. Please request a new OTP.",
      });
    }

    // Check if OTP is expired (older than 10 minutes)
    const otpAge = Date.now() - otpRecord.createdAt.getTime();
    if (otpAge > OTP.TTL_MS) {
      // 10 minutes in milliseconds
      // Delete expired OTP
      await Otp.deleteOne({ email });

      return res.status(400).json({
        isOk: false,
        message: "OTP has expired. Please request a new OTP.",
      });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({
        isOk: false,
        message: "Invalid OTP",
      });
    }

    // OTP is valid
    return res.status(200).json({
      isOk: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Error in verifyOtp:", error);
    return res.status(500).json({
      isOk: false,
      message: "Failed to verify OTP",
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Verify OTP again for security
    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord || otpRecord.otp !== otp) {
      return res.status(400).json({
        isOk: false,
        message: "Invalid OTP",
      });
    }

    // Admin users first, then users
    let user = await AdminUser.findOne({ email });

    if (!user) {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({
        isOk: false,
        message: "User not found",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    // Delete OTP after successful password reset
    await Otp.deleteOne({ email });

    return res.status(200).json({
      isOk: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(500).json({
      isOk: false,
      message: "Failed to reset password",
      error: error.message,
    });
  }
};
