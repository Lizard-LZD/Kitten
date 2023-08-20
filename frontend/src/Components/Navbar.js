import Navbar_Routes from "../Data/Navbar_Routes";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  let ref = useRef();
  
  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
     // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);
  return (
    <nav>
      <ul>
        {Navbar_Routes.map((menu, index) => {
          if (menu.submenu) {
            return (
              <li key={index} ref={ref}>
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={dropdown ? "true" : "false"}
                  onClick={() => setDropdown((prev) => !prev)}
                >
                  {menu.label}
                </button>
                <ul>
                  {dropdown &&
                    menu.submenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link to={menu.path}>{subItem.label}</Link>
                      </li>
                    ))}
                </ul>
              </li>
            );
          } else {
            return (
              <li key={index}>
                <Link to={menu.path}>{menu.label}</Link>
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
}
