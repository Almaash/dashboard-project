import React, { useState } from "react";
import {
  Home,
  Layers,
  BarChart2,
  ShoppingBag,
  Image,
  HelpCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Plus,
  Users,
} from "lucide-react";
import boat from "../assets/boat.jpg";
import mamaearth from "../assets/mamaearth.png";
import perfora from "../assets/perfora.png";

export default function Sidebar() {
  // State for sidebar collapse/expand
  const [collapsed, setCollapsed] = useState(false);
  const [channelsOpen, setChannelsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Small Sidebar with Brand Icons */}
      <div className={`bg-white w-13 border space-y-3 p-1 ${collapsed && "hidden"}`}>
        <div className="flex flex-col justify-between items-end h-full">
          {/* Top Section with Brand Icons */}
          <div>
            <div className="pt-3">
              <img src={perfora} alt="perfora.png" width={35} className="border rounded-xl" />
            </div>
            <div className="flex flex-col space-y-3 justify-center items-center pt-3">
              <img src={mamaearth} alt="mamaearth.png" width={35} className="border rounded-xl" />
              <img src={boat} alt="boat.png" width={35} className="border rounded-xl" />
              <button className="border rounded-xl w-9 h-9 flex justify-center items-center text-green-500 cursor-pointer">
                <Plus />
              </button>
            </div>
          </div>
          {/* Bottom Section with Users Icon */}
          <div className="flex-col justify-center items-center space-y-1 pb-1">
            <button className="rounded-xl w-9 h-9 flex justify-center items-center text-gray-500">
              <Users className="w-4 h-4" />
            </button>
            <button className="border rounded-full w-6 h-6 flex justify-center items-center bg-[#9106FF] cursor-pointer ml-2">
              <p className="text-white text-xs">SS</p>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sidebar */}
      <div className={`flex flex-col h-full border-r bg-background transition-all ${collapsed ? "w-16" : "w-[220px]"}`}>
        {/* Sidebar Header with Collapse Button */}
        <div className="p-3 border-b flex items-center gap-2">
          {!collapsed ? (
            <div className="flex justify-between items-center border w-full p-1 rounded-lg cursor-pointer">
              <div className="flex">
                <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center">
                  <span className="text-xs text-purple-700 font-semibold">JB</span>
                </div>
                <span className="ml-2 text-sm font-medium">Test_brand</span>
              </div>
              <ChevronsUpDown className="w-4" />
            </div>
          ) : (
            <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center mx-auto">
              <span className="text-xs text-purple-700 font-semibold">JB</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded cursor-pointer"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col flex-1 overflow-auto py-2">
          <NavItem icon={<Home size={16} />} label="Overview" collapsed={collapsed} />
          <NavItem icon={<Layers size={16} />} label="Channels" isDropdown collapsed={collapsed} onClick={() => setChannelsOpen(!channelsOpen)} />
          {channelsOpen && !collapsed && (
            <div className="pl-1">
              <NavItem icon={<BarChart2 size={16} />} label="Meta Ads" indent collapsed={collapsed} />
              <NavItem icon={<BarChart2 size={16} />} label="Google Ads" indent collapsed={collapsed} />
              <NavItem icon={<ShoppingBag size={16} />} label="Quick Commerce" active indent collapsed={collapsed} />
            </div>
          )}
          <NavItem icon={<Image size={16} />} label="Creatives" collapsed={collapsed} />
        </div>

        {/* Sidebar Footer */}
        <div className="mt-auto border-t">
          <NavItem icon={<HelpCircle size={16} />} label="Help" collapsed={collapsed} />
          <NavItem icon={<Settings size={16} />} label="Settings" collapsed={collapsed} />
        </div>
      </div>
    </div>
  );
}

// Reusable Navigation Item Component
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isOpen?: boolean;
  active?: boolean;
  indent?: boolean;
  isDropdown?: boolean;
  collapsed: boolean;
  onClick?: () => void;
}

function NavItem({ icon, label, indent = false, isDropdown = false, collapsed = false, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 text-sm w-full text-left text-gray-600 hover:bg-gray-100 cursor-pointer
        ${indent && !collapsed ? "pl-8" : ""} ${collapsed ? "justify-center" : ""}`}
    >
      <span className="text-gray-400">{icon}</span>
      {!collapsed && <span>{label}</span>}
      {isDropdown && !collapsed && <ChevronIcon className="ml-auto" />}
    </button>
  );
}

// Chevron Icon for Dropdown Items
function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}