import Logo from '../image/logo.png';
import { FaSearch } from "react-icons/fa";
import { Outlet, Link } from "react-router-dom";

function Menu() {
    return (
        <div>
            <div className="flex justify-between items-center py-4 bg-blue-900">
                <div className="ml-10 cursor-pointer flex-shrink-0">
                    <Link to="/">
                        <img
                            src={Logo}
                            className="max-h-32 rounded transition-all duration-500 hover:rounded-full"
                            alt="Tiệm mèo vui vẻ"
                        />
                    </Link>
                </div>
                <div className="flex items-center">
                    <i className="fas fa-bars fa-2x text-blue-200 cursor-pointer md:hidden mr-10"></i>
                    <ul className="hidden md:flex items-center space-x-6 mr-10 font-semibold">
                        <Link to="/">
                            <li className="transition-all ease-in-out hover:border-b-2 hover:border-orange-500">
                                <a className="text-white hover:text-blue-300 transition" href="#">Trang chủ</a>
                            </li>
                        </Link>
                        <Link to="Pet">
                            <li className="transition-all ease-in-out hover:border-b-2 hover:border-orange-500">
                                <a className="text-white hover:text-blue-300 transition" href="#">Thú cưng</a>
                            </li>
                        </Link>
                        <Link to="Accessories">
                            <li className="transition-all ease-in-out hover:border-b-2 hover:border-orange-500">
                                <a className="text-white hover:text-blue-300 transition" href="#">Phụ kiện</a>
                            </li>
                        </Link>
                        <Link to="Food">
                            <li className="transition-all ease-in-out hover:border-b-2 hover:border-orange-500">
                                <a className="text-white hover:text-blue-300 transition" href="#">Thức ăn</a>
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="flex items-center mr-10">
                    <input
                        className="p-2 rounded-lg border-none focus:outline-none max-w-64 min-w-60"
                        type="text"
                        placeholder="Tìm kiếm..."
                    />
                    <button className="p-2 text-white rounded-r-lg border-none  hover:text-gray-500">
                        <FaSearch />
                    </button>
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default Menu;
