import type { Icons } from "../../types/Icons";

const SideBarIcons = ({ icon: Icon, color, size }: Icons) => {
  return <Icon className={color} size={size} />;
};

export default SideBarIcons;
