import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import Link from "next/link"

const links = [{
    name: 'Home',
    href: '/'
}, {
    name: 'Films',
    href: '/films'
}, {
    name: 'Spaceships',
    href: '/spaceships'
}, {
    name: 'Characters',
    href: '/characters'
}, {
    name: 'Planets',
    href: '/planets'
}]

const NavBarContent = ({ isMobile }: { isMobile?: boolean }) => (
    <NavigationMenu
        className={
            cn(
                isMobile ? "w-full h-fit child:w-full mt-8" : "hidden md:flex py-2",
                "max-w-none w-full bg-gray-900 text-white"
            )
        } orientation="vertical">
        <NavigationMenuList
            className={
                cn(
                    isMobile ? "flex-col" : "",
                    "gap-4"
                )
            }
            aria-orientation="vertical"
        >
            {links.map(({ name, href }, index) => (
                <NavigationMenuItem className="flex-1 w-full" key={index}>
                    <Link href={href} legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'bg-gray-900 hover:bg-gray-950 hover:text-white w-full')}>
                            {name}
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            ))}
        </NavigationMenuList>
    </NavigationMenu>
)

export const NavBar = () => {
    return (
        <>
            <Sheet>
                <SheetTrigger className="md:hidden dark:text-white py-4">Categories</SheetTrigger>
                <SheetContent className="flex justify-center bg-gray-900 text-white">
                    <NavBarContent isMobile />
                </SheetContent>
            </Sheet>
            <NavBarContent />
        </>
    );
}
