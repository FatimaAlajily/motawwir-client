"use client";

import SearchBar from "./SearchBar";
import CreateButton from "./CreateButton";
import { Navbar, NavbarBrand } from "flowbite-react";
import NotificationBar from "./NotificationBar";
import AvatarBar from "./AvatarBar";

import motawwerLogo from "../../../assets/images/Logo.png";

export function NavBar() {
  return (
    <Navbar
      fluid
      rounded
      className="bg-white px-6 py-3 shadow-sm border-b border-gray-100"
    >
      <NavbarBrand>
        <img
          src={motawwerLogo}
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span
          className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white"
          style={{ fontFamily: '"Reem Kufi", sans-serif' }}
        >
          مطور
        </span>
      </NavbarBrand>
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
