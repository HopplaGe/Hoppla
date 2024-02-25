import {
    Building2, CarTaxiFront,
    Facebook,
    GithubIcon,
    HomeIcon,
    Instagram,
    LinkedinIcon, Rss, Settings2,
    SignpostBig,
    Twitter, UsersRound,
    YoutubeIcon
} from "lucide-react";
import {ChartPieIcon} from "@heroicons/react/16/solid";

export const navItems = [
    {name: "Carpool", href: "/carpool"},
    {name: "MiniBuses", href: "/minibuses"},
    {name: "Buses", href: "/buses"},
];

export const userMenuItems = [
    {name: "Profile", href: "/profile"},
    {name: "MyRides", href: "/my-rides"},
    {name: "MyVehicles", href: "/my-vehicles"},
    {name: "MyTickets", href: "/my-tickets"},
    {name: "MyPayments", href: "/my-payments"},
    {name: "Analytics", href: "/analytics"},
    {name: "Settings", href: "/settings"},
    {name: "LogOut", onClick: () => console.log("logout")},
];

export const footerNavItems = {
    legal: [
        {name: "PopularPlaces", href: "#"},
        {name: "PopularRoutes", href: "#"},
        {name: "HowItWorks", href: "#"},
        {name: "AboutUs", href: "#"},
        {name: "Support", href: "#"},
        {name: "Careers", href: "#"},
    ],
    social: [
        {
            name: "Facebook",
            href: "https://facebook.com/hoppla.ge",
            icon: Facebook,
        },
        {
            name: "Twitter",
            href: "#",
            icon: Twitter,
        },
        {
            name: "Instagram",
            href: "#",
            icon: Instagram,
        },
        {
            name: "LinkedIn",
            href: "#",
            icon: LinkedinIcon,
        },
        {
            name: "GitHub",
            href: "https://github.com/HopplaGe",
            icon: GithubIcon
        },
        {
            name: "Youtube",
            href: "#",
            icon: YoutubeIcon
        }
    ],
};


export const adminNavItems = [
    {name: 'მთავარი', href: '/manage', icon: HomeIcon, current: true},
    {name: 'მგზავრობები', href: '#', icon: SignpostBig, current: false},
    {name: 'დასახლებული პუნქტები', href: '/manage/populated-areas', icon: Building2, current: false},
    {name: 'კომპანიები', href: '/manage/companies', icon: CarTaxiFront, current: false},
    {name: 'მომხმარებლები', href: '#', icon: UsersRound, current: false},
    {name: 'ბლოგი', href: '/manage/articles', icon: Rss, current: false},
    {name: 'რაპორტები', href: '#', icon: ChartPieIcon, current: false},
    {name: 'პარამეტრები', href: '#', icon: Settings2, current: false},
]