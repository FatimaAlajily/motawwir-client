"use client";

import SearchBar from "./SearchBar";
import CreateButton from "./CreateButton";
import { Navbar } from "flowbite-react";
import NotificationBar from "./NotificationBar";
import AvatarBar from "./AvatarBar";
// import SideBarIcons from "../common/SideBarIcons";

export function NavBar() {
  return (
    <Navbar
      fluid
      rounded
      className="bg-white px-6 py-3 shadow-sm border-b border-gray-100"
    >
      {/* -------- Middle Sectuion Search ---------- */}
      <SearchBar />

      {/* ------- Actions ----------- */}
      <div className="flex items-center gap-4 md:order-2">
        <CreateButton />
        <NotificationBar />
        <AvatarBar />
      </div>
    </Navbar>
  );
}
