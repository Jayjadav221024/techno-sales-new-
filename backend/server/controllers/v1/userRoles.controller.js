import { pickPermissions } from "@demo-panel/shared/permissions";
import UserRoles from "../../models/UserRoles.js";

/**
 * Normalise an incoming permission row - either menuId or menuGroupId is set.
 */
const processRoles = (roles) =>
  roles.map((role) => ({
    menuId: role.menuId || null,
    menuGroupId: role.menuGroupId || null,
    ...pickPermissions(role),
  }));

export const createUserRoles = async (req, res) => {
  try {
    const { roleId, roles } = req.body;

    if (!Array.isArray(roles)) {
      return res.status(400).json({
        isOk: false,
        message: "Roles must be an array",
      });
    }

    const userRoles = await UserRoles.create({
      roleId,
      roles: processRoles(roles),
    });

    return res.status(200).json({
      isOk: true,
      message: "User roles created successfully",
      data: userRoles,
    });
  } catch (error) {
    console.error("Error in createUserRoles:", error);
    return res.status(500).json({ isOk: false, message: error.message });
  }
};

export const getUserRoles = async (req, res) => {
  try {
    const { roleId } = req.params;
    const userRoles = await UserRoles.find({ roleId });

    if (!userRoles || userRoles.length === 0) {
      return res.status(200).json({
        isOk: true,
        message: "No roles assigned yet",
        data: [],
      });
    }

    return res.status(200).json({ isOk: true, data: userRoles });
  } catch (error) {
    console.error("Error in getUserRoles:", error);
    return res.status(500).json({ isOk: false, message: error.message });
  }
};

export const updateUserRoles = async (req, res) => {
  try {
    // The id can be either the UserRoles document id or the roleId it belongs to
    const id = req.params.roleId || req.body.roleId;
    const { roles } = req.body;

    if (!Array.isArray(roles)) {
      return res.status(400).json({
        isOk: false,
        message: "Roles must be an array",
      });
    }

    const processedRoles = processRoles(roles);

    let userRoles = await UserRoles.findByIdAndUpdate(
      id,
      { roles: processedRoles },
      { new: true },
    );

    if (!userRoles) {
      userRoles = await UserRoles.findOneAndUpdate(
        { roleId: id },
        { roles: processedRoles },
        { new: true },
      );
    }

    if (!userRoles) {
      return res
        .status(404)
        .json({ isOk: false, message: "User roles not found" });
    }

    return res.status(200).json({
      isOk: true,
      message: "User roles updated successfully",
      data: userRoles,
    });
  } catch (error) {
    console.error("Error in updateUserRoles:", error);
    return res.status(500).json({ isOk: false, message: error.message });
  }
};
