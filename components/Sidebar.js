import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import { HomeIcon } from "@heroicons/react/solid";
import { HashtagIcon } from "@heroicons/react/outline";
import { BellIcon } from "@heroicons/react/outline";
import { InboxIcon } from "@heroicons/react/outline";
import { BookmarkIcon } from "@heroicons/react/outline";
import { ClipboardIcon } from "@heroicons/react/outline";
import { UserIcon } from "@heroicons/react/outline";
import { DotsCircleHorizontalIcon } from "@heroicons/react/outline";
import { DotsHorizontalIcon } from "@heroicons/react/outline";

export default function Sidebar() {
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24">
      {/* Logo */}
      <div className="hoverEffect hover:bg-blue-100 px-3 pt-3">
        <Image
          width="35"
          height="35"
          src="https://www.edigitalagency.com.au/wp-content/uploads/Twitter-logo-png.png"
          alt="Twitter Logo"
        ></Image>
      </div>

      {/* Menu */}
      <div className="mt-4 mb-2.5 xl:items:start">
        <SidebarMenuItem text="Home" Icon={HomeIcon} active />
        <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
        <SidebarMenuItem text="Notifications" Icon={BellIcon} />
        <SidebarMenuItem text="Messages" Icon={InboxIcon} />
        <SidebarMenuItem text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
        <SidebarMenuItem text="Profile" Icon={UserIcon} />
        <SidebarMenuItem text="More" Icon={DotsCircleHorizontalIcon} />
      </div>

      {/* Button */}
      <button className="bg-blue-400 text-white text-lg rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 hidden xl:inline">
        Tweet
      </button>

      {/* Avatar */}
      <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
        <img
          src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
          alt="User Icon"
          className="h-10 w-10 rounded-full xl:mr-5"
        />
        <div className="leading-5 hidden xl:inline">
          <h4 className="font-bold">Test user</h4>
          <p className="text-gray-500">@username</p>
        </div>
        <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
      </div>
    </div>
  );
}
