const Navbar_Routes = [
    {
        label: "Home",
        path: "/"
    },
    {
        label: "Diary",
        path: "/diary"
    },
    {
        label: "Adoption",
        path: "/adoption"
    },
    {
        label: "Game",
        path: "/game"
    },
    {
        label: "My Kitten",
        submenu: [
            {
                label: "Kitten",
                path: "/kitten"
            },
            {
                label: "Health tracker",
                path: "/healthTracker"
            },
            {
                label: "Profile",
                path: "/profile"
            }
        ]
    }
];

export default Navbar_Routes;