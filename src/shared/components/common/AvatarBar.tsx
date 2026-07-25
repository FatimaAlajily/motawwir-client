import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";

const AvatarBar = () => {
  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <div className="relative">
          <Avatar
            alt="User settings"
            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            rounded
            className="ring-1 rounded-full ring-[#5C45A4]"
          />

          <span className="absolute bottom-0 right-0 w-3 h-3 bg-purple-700 border-2 border-white rounded-full"></span>
        </div>
      }
    >
      <DropdownHeader>
        <span className="block text-sm font-bold">Fatima Salih</span>

        <span className="block truncate text-sm font-medium text-gray-500">
          fatima@gmail.com
        </span>
      </DropdownHeader>

      <DropdownDivider />

      <DropdownItem className="text-red-600">تسجيل الخروج</DropdownItem>
    </Dropdown>
  );
};

export default AvatarBar;
