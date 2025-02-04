import { Link } from "react-router-dom";
import { NavList } from "../constants";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <ul className="flex space-x-4">
        {NavList.map(item =>(
            <Link key={item.id}>
            <li>{item.title}</li>
            </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
