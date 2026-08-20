import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, LogOut01, User01 } from "@untitledui/icons";
import { Button as AriaButton } from "react-aria-components";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { AuthContext } from "../context/AuthContext";
import { logout } from "../api/auth.api";

const ProfileMenu = () => {
    const navigate = useNavigate();
    const { adminData, setAdminData, role } = useContext(AuthContext);
    const name = adminData?.adminName || adminData?.userName || "Super Admin";
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "SA";

    const handleAction = async (key) => {
        if (key === "profile") return navigate("/admin/profile");
        if (key === "logout") {
            setAdminData(null);
            await logout();
            navigate("/admin");
        }
    };

    return (
        <Dropdown.Root>
            <AriaButton
                aria-label="Account menu"
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-1 outline-focus-ring transition hover:bg-primary_hover focus-visible:outline-2 focus-visible:outline-offset-2"
            >
                <span className="flex size-8.5 items-center justify-center rounded-full bg-brand-solid text-xs font-semibold text-white">
                    {initials}
                </span>
                <span className="hidden flex-col text-left sm:flex">
                    <span className="text-[12.5px] leading-tight font-semibold text-primary">{name}</span>
                    <span className="text-[10px] leading-tight font-normal text-tertiary capitalize">
                        {role || "Super Admin"}
                    </span>
                </span>
                <ChevronDown className="size-3 text-fg-quaternary" />
            </AriaButton>

            <Dropdown.Popover>
                {name && (
                    <div className="border-b border-secondary px-3 py-2.5">
                        <p className="text-xs font-semibold text-primary">{name}</p>
                        {adminData?.email && <p className="truncate text-[11px] text-tertiary">{adminData.email}</p>}
                    </div>
                )}
                <Dropdown.Menu onAction={handleAction}>
                    <Dropdown.Item id="profile" icon={User01}>
                        Profile
                    </Dropdown.Item>
                    <Dropdown.Item id="logout" icon={LogOut01}>
                        Logout
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown.Root>
    );
};

export default ProfileMenu;
