const { HomeIcon, CompassIcon, MessageCircle, BellIcon, User2Icon } = require("lucide-react")


const navItems = {
    "user":[
        { "label" : "Home", "link": "/home", icon:<HomeIcon/>},
        { "label" : "Explore", "link": "/explore", icon:<CompassIcon/>},
        { "label" : "Messages", "link": "/messages", icon:<MessageCircle/>},
        { "label" : "Notification", "link": "/notification", icon:<BellIcon/>},
        { "label" : "Profile", "link": "/profile", icon:<User2Icon/>},
    ]
}

export default navItems