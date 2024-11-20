const { HomeIcon, CompassIcon, MessageCircle, BellIcon, User2Icon, SearchIcon } = require("lucide-react")


const navItems = {
    "user":[
        { "label" : "Home", "link": "/home", icon:<HomeIcon/>},
        { "label" : "Explore", "link": "/explore", icon:<CompassIcon/>},
        { "label" : "Search", "link": "/search", icon:<SearchIcon/>},
        { "label" : "Messages", "link": "/messages", icon:<MessageCircle/>},
        { "label" : "Notification", "link": "/notification", icon:<BellIcon/>},
        { "label" : "Profile", "link": "/profile", icon:<User2Icon/>},
    ]
}

export default navItems