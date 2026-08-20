import mongoose from "mongoose";
import { PERMISSION_KEYS } from "@demo-panel/shared/permissions";

/** { read: {type: Boolean, default: false}, write: {...}, ... } */
const permissionFields = Object.fromEntries(
  PERMISSION_KEYS.map((key) => [key, { type: Boolean, default: false }]),
);

const UserRolesSchema = new mongoose.Schema(
  {
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoleMaster",
      required: true,
    },
    roles: {
      type: [
        {
          menuId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MenuMaster",
            required: false,
            default: null,
          },
          menuGroupId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MenuGroupMaster",
            required: false,
            default: null,
          },
          ...permissionFields,
        },
      ],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("UserRoles", UserRolesSchema);
