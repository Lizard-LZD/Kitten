import Navbar_Routes from "../Data/Navbar_Routes"

export default function Navbar () {
    return (
        <nav>
            <ul>
            {Navbar_Routes.map((menu,index)=>{
                <li>{menu}</li>
            })}
            </ul>
        </nav>
    )
}