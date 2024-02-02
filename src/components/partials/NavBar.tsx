import React from 'react';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

const navitems = [
    {name: "მსუბუქი ავტომობილები", href: "/carpool"},
    {name: "მინიბუსები", href: "/minibuses"},
    {name: "ავტობუსები", href: "/buses"},
];

const NavBar = () => {
    return (
        <Navbar>
            <NavbarBrand>
                <p className="font-bold text-inherit">HOPPLA</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {navitems.map((item, index) => (
                    <NavbarItem key={index}>
                        <Link href={item.href}>{item.name}</Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat" startContent={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path
                                d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10zm0 16v-4"
                            />
                            <path d="M12 6h.01"/>
                        </svg>
                    }>
                        ავტორიზაცია
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default NavBar;
