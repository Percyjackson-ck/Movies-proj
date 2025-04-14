import React, { useState } from "react";
import { AiOutlineHome, AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link, useNavigate ,useLocation} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/feature/auth/authSlice";

const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  if (currentPath === "/") {
    return null; 
  }
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  // Close Sidebar & Dropdown when a link is clicked
  const closeAll = () => {
    setSidebarOpen(false);
    setDropdownOpen(false);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      closeAll(); // Close sidebar and dropdown after logout
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        className={`fixed top-5 left-5 z-50 bg-blue-500 text-white px-4 py-2 rounded-md transition-opacity ${
          sidebarOpen ? "opacity-0" : "opacity-100"
        }`}
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Sidebar with Overlay */}
      <div className={`fixed inset-0 z-40 ${sidebarOpen ? "block" : "hidden"}`} onClick={closeAll}>
        <div
          className={`fixed top-0 left-0 h-full w-[250px] bg-[#0f0f0f] text-white border-r shadow-lg transition-transform duration-300 ease-in-out transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()} 
        >
          <div className="p-6 relative">
            {/* Close Button */}
            <button className="absolute top-3 right-3 text-white text-xl" onClick={toggleSidebar}>
              ✖
            </button>

            {/* Username First */}
            {userInfo && <div className="text-lg font-bold mb-6 mt-6">{userInfo.username}</div>}

            <ul className="space-y-3">
              <li>
                <Link to="/" className="flex items-center gap-2 hover:text-gray-300" onClick={closeAll}>
                  <AiOutlineHome size={26} /> Home
                </Link>
              </li>
              <li>
                <Link to="/movies" className="flex items-center gap-2 hover:text-gray-300" onClick={closeAll}>
                  <MdOutlineLocalMovies size={26} /> Movies
                </Link>
              </li>
            </ul>

            {/* User Dropdown */}
            <div className="mt-6 relative">
              {userInfo ? (
                <>
                  <button
                    className="text-gray-800 flex items-center gap-2 border border-gray-500 bg-gray-500 px-3 py-1 rounded-xl focus:outline-none"
                    onClick={toggleDropdown}
                  >
                    <span className="text-white">Options</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                      />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <ul className="absolute left-0 mt-2 w-[10rem] bg-white text-gray-600 border rounded shadow-lg">
                      {userInfo.isAdmin && (
                        <li>
                          <Link to="/admin/movies/dashboard" className="block px-4 py-2 hover:bg-gray-100" onClick={closeAll}>
                            Dashboard
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100" onClick={closeAll}>
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button onClick={logoutHandler} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </>
              ) : (
                <div className="mt-4">
                  <Link to="/login" className="flex items-center gap-2 hover:text-gray-300" onClick={closeAll}>
                    <AiOutlineLogin size={26} /> Login
                  </Link>
                  <Link to="/register" className="flex items-center gap-2 mt-2 hover:text-gray-300" onClick={closeAll}>
                    <AiOutlineUserAdd size={26} /> Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
