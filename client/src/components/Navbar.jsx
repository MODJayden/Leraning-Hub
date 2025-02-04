// src/components/Navbar.jsx
import { NavLink, Link } from "react-router-dom";
import { Menu } from "lucide-react";
import {
  FaHome,
  FaBook,
  FaChartLine,
  FaTasks,
  FaUserGraduate,
  FaAddressBook,
  FaPortrait,
  FaAssistiveListeningSystems,
  FaPenSquare,
} from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MenuItem = ({ icon, label }) => {
  return (
    <div className="flex items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200">
      <span className="mr-3 text-lg">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

import { useDispatch, useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import { logout } from "@/store/user-slice";
import { useState } from "react";

const Navbar = () => {
  const { isAuth, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [openSheet, setOnOpenSheet] = useState(false);

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      setOnOpenSheet(false);
    });
  };

  return (
    <header className="bg-[#1c1d1f] text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="w-full flex justify-between items-center md:w-8 ">
          <NavLink to="/">
            <h2 className="text-2xl font-bold">Apex</h2>
          </NavLink>
          {isAuth ? (
            user?.role === "student" ? (
              <Sheet open={openSheet} onOpenChange={setOnOpenSheet}>
                <SheetTrigger>
                  <Menu className=" md:hidden cursor-pointer" />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>
                      <h1 className="text-2xl font-bold">Apex</h1>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="space-y-2 flex flex-col justify-between">
                    <div>
                      <Link to={"/"} onClick={() => setOnOpenSheet(false)}>
                        {" "}
                        <MenuItem icon={<FaHome />} label="Home" />
                      </Link>
                      <Link
                        to={"/courses"}
                        onClick={() => setOnOpenSheet(false)}
                      >
                        {" "}
                        <MenuItem icon={<FaBook />} label="Courses" />
                      </Link>
                      <Link
                        to={"/student/performance"}
                        onClick={() => setOnOpenSheet(false)}
                      >
                        {" "}
                        <MenuItem icon={<FaChartLine />} label="Performance" />
                      </Link>

                      <Link
                        to={"/student/enrolled-courses"}
                        onClick={() => setOnOpenSheet(false)}
                      >
                        <MenuItem
                          icon={<FaUserGraduate />}
                          label="Enrolled Course"
                        />
                      </Link>
                      <Link
                        to={"/profile"}
                        onClick={() => setOnOpenSheet(false)}
                      >
                        <MenuItem icon={<FaPortrait />} label="Profile" />
                      </Link>
                    </div>
                    <Link to="/">
                      <div
                        className="bg-[#a435f0] text-white px-4 py-2 rounded hover:bg-[#4a1fb8] w-full mb-4 text-center"
                        onClick={handleLogout}
                      >
                        Sign Out
                      </div>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <Sheet open={openSheet} onOpenChange={setOnOpenSheet}>
                <SheetTrigger>
                  <Menu className=" md:hidden cursor-pointer" />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>
                      <h1 className="text-2xl font-bold">Apex</h1>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="space-y-2 flex flex-col justify-between">
                    <div>
                      <Link to={"/"} onClick={() => setOnOpenSheet(false)}>
                        {" "}
                        <MenuItem icon={<FaHome />} label="Home" />
                      </Link>
                      <Link
                        to={"/courses"}
                        onClick={() => setOnOpenSheet(false)}
                      >
                        {" "}
                        <MenuItem icon={<FaBook />} label="Courses" />
                      </Link>
                      <Link
                        to={"/tutor/upload"}
                        onClick={() => setOnOpenSheet(false)}
                      >
                        {" "}
                        <MenuItem icon={<FaChartLine />} label="Uploads" />
                      </Link>
                      <Link
                        to={"/tutor/assignment"}
                        onClick={() => setOnOpenSheet(false)}
                      >
                        {" "}
                        <MenuItem icon={<FaTasks />} label="Assignment" />
                      </Link>

                      <Link
                        to={"/profile"}
                        onClick={() => setOnOpenSheet(false)}
                      >
                        <MenuItem icon={<FaPortrait />} label="Profile" />
                      </Link>
                    </div>
                    <Link to="/">
                      <div
                        className="bg-[#a435f0] text-white px-4 py-2 rounded hover:bg-[#4a1fb8] w-full mb-4 text-center"
                        onClick={handleLogout}
                      >
                        Sign Out
                      </div>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            )
          ) : (
            <Sheet open={openSheet} onOpenChange={setOnOpenSheet}>
              <SheetTrigger>
                <Menu className=" md:hidden cursor-pointer" />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>
                    <h1 className="text-2xl font-bold">Apex</h1>
                  </SheetTitle>
                </SheetHeader>
                <div className="space-y-2 w-full flex flex-col justify-between h-full">
                  <div>
                    <Link to={"/"} onClick={() => setOnOpenSheet(false)}>
                      <MenuItem icon={<FaHome />} label="Home" />
                    </Link>
                    <Link to={"/courses"} onClick={() => setOnOpenSheet(false)}>
                      {" "}
                      <MenuItem icon={<FaBook />} label="Courses" />
                    </Link>
                    <Link to={"/about"} onClick={() => setOnOpenSheet(false)}>
                      <MenuItem icon={<FaAddressBook />} label="About" />
                    </Link>
                    <Link to={"/contact"} onClick={() => setOnOpenSheet(false)}>
                      <MenuItem icon={<FaTasks />} label="Contact" />
                    </Link>
                  </div>

                  <Link to="/auth/register">
                    <div
                      className="bg-[#a435f0] text-white px-4 py-2 rounded hover:bg-[#4a1fb8] w-full mb-4 text-center"
                      onClick={() => setOnOpenSheet(false)}
                    >
                      Sign Up
                    </div>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>

        {isAuth ? (
          user?.role === "student" ? (
            <nav className="hidden md:block">
              <ul className="flex space-x-4">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "text-[#a435f0]" : "hover:text-[#a435f0]"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/courses"
                    className={({ isActive }) =>
                      isActive ? "text-[#a435f0]" : "hover:text-[#a435f0]"
                    }
                  >
                    Courses
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/student/enrolled-courses"
                    className={({ isActive }) =>
                      isActive ? "text-[#a435f0]" : "hover:text-[#a435f0]"
                    }
                  >
                    Enrolled courses
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/student/performance"
                    className={({ isActive }) =>
                      isActive ? "text-[#a435f0]" : "hover:text-[#a435f0]"
                    }
                  >
                    Performance
                  </NavLink>
                </li>
              </ul>
            </nav>
          ) : (
            <nav className="hidden md:block">
              <ul className="flex space-x-4">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "text-[#a435f0]" : "hover:text-[#a435f0]"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/courses"
                    className={({ isActive }) =>
                      isActive ? "text-[#a435f0]" : "hover:text-[#a435f0]"
                    }
                  >
                    Courses
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/tutor/upload"
                    className={({ isActive }) =>
                      isActive ? "text-[#a435f0]" : "hover:text-[#a435f0]"
                    }
                  >
                    Uploads
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/tutor/assignment"
                    className={({ isActive }) =>
                      isActive ? "text-[#a435f0]" : "hover:text-[#a435f0]"
                    }
                  >
                    Assignments
                  </NavLink>
                </li>
              </ul>
            </nav>
          )
        ) : (
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-[#a435f0]" : "hover:text-[#a435f0]"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/courses"
                  className={({ isActive }) =>
                    isActive ? "text-[#a435f0]" : "hover:text-[#a435f0]"
                  }
                >
                  Courses
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "text-[#a435f0]" : "hover:text-[#a435f0]"
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "text-[#a435f0]" : "hover:text-[#a435f0]"
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
        {isAuth ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Badge
                variant={"secondary"}
                className={
                  "w-10 h-10 bg-[#a435f0] rounded-full cursor-pointer hidden md:flex justify-center items-center "
                }
              >
                {user?.firstName[0]}
                {user?.lastName[0]}
              </Badge>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Link to={"/profile"}>Profile</Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer">
                <button onClick={handleLogout}>Logout</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link
              to="/auth/register"
              className="bg-[#a435f0] text-white px-4 py-2 rounded hover:bg-[#4a1fb8] hidden md:flex"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
