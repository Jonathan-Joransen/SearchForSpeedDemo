const pages = [
        { key: "1", title: "Home", path: "/", hasSubpath: true },
        { key: "2", title: "0-60 Times", path: "/Times", hasSubpath: true },
        { key: "9", title: "Liked Times", path: "/Liked", hasSubpath: true },
        
        { key: "8", title: "Search", path: "/Search", hasSubpath: true },
        { key: "3", title: "Saved Searches", path: "/Searches", hasSubpath: true },
        {
                key: "5",
                title: "Profile",
                path: "/Profile",
                hasSubpath: false,
                subpath: [
                        {
                                key: "6",
                                title: "Info",
                                path: "/Profile/Info"
                        },
                        {
                                key: "7",
                                title: "Subscription",
                                path: "/Profile/Subscription"
                        }
                ]
        },
        { key: "4", title: "Subscribe", path: "/Subscribe", hasSubpath: true },

]

export default pages