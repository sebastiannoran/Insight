import classNames from "classnames";
import { FaHome } from "react-icons/fa";
// import { useContext } from "react";
import { Link, Outlet, useNavigation } from "react-router-dom";

const Root = () => {
  // const { currentUser, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  // const handleLogout = (e) => {
  //     e.preventDefault();
  //     logout();
  //     redirect("/login");
  //   }

  // const outletClasses = classNames(
  //   "mx-auto max-w-4xl sm:px-12 px-4 transition-opacity",
  //   {
  //     "opacity-100": navigation.state !== "loading",
  //     "opacity-50": navigation.state === "loading",
  //   }
  // );

  return (
    <div>
      <nav className="bg-[#1C1C1C] py-1 flex justify-items-center justify-between">
        <p className="text-white flex items-center">
          <Link
            className="text-2xl font-bold flex items-center gap-1 px-3"
            to="/"
          >
            INSIGHT
          </Link>
        </p>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;