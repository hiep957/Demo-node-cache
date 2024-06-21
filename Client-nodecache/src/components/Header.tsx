import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
// s

const Header = () => {
  const { isLoggedIn, role,user } = useAppContext();
  console.log(isLoggedIn);
  return (
    <nav className="bg-white dark:bg-gray-500 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="http://localhost:5173/"
          className="flex items-center space-x-0 rtl:space-x-reverse"
        >
          <img src="/image/logo-1.png" className="h-8 me-3 rounded-2xl" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            SmartBooking.com
          </span>
        </a>
        {isLoggedIn ? (
          <>
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-sticky"
            >
              <ul className="flex p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-500 md:dark:bg-gray-500 dark:border-gray-500">
                {role === "Admin" ? (
                  <li>
                    <a
                      href="/my-hotels"
                      className=" py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      My Hotels
                    </a>
                  </li>
                ) : (
                  <li>
                    <a
                      href="/my-bookings"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                        Xin chào {user?.firstName}
                    </a>
                  </li>
                )}
              </ul>
            </div>
            {/* <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <Menu />
            </div> */}
          </>
        ) : (
          <>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <span className="flex space-x-2">
                <Link
                  to="/login"
                  className="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Signup
                </Link>
              </span>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;