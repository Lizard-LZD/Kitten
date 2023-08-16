import Navbar_Routes from "../Data/Navbar_Routes"

export default function Navbar() {
    return (
      <nav>
        <ul>
          {Navbar_Routes.map((menu, index) => {
            if (menu.submenu) {
              return (
                <li key={index}>
                  {menu.label}
                  <ul>
                    {menu.submenu.map((subItem, subIndex) => (
                      <li key={subIndex}>{subItem.label}</li>
                    ))}
                  </ul>
                </li>
              );
            } else {
              return <li key={index}>{menu.label}</li>;
            }
          })}
        </ul>
      </nav>
    );
  }
  