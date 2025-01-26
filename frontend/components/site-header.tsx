'use client';
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";


export function SiteHeader() {
  const { token, logout, role } = useAuthContext();
  let pathName = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const hasPermission = (role: string, item: any) => {
    if (item?.security.includes(role)) return true;
    return false;
  };

  // Renderiza os links apenas se for público ou se o usuário tiver permissão
  const renderLinks = (item: any, role: string, index: number) => {
    if ((item.security === 'public' || hasPermission(role, item)) && token != '') {
      return (
        <Link
          key={index}
          href={item.href}
          onClick={toggleMenu}
          className={cn(
            `text-muted-foreground flex items-center rounded border-b p-2 text-sm font-medium hover:bg-gray-200 md:border-0 md:text-white  md:hover:bg-white md:hover:text-black lg:border-0${token == '' && 'hidden'}`,
          )}
        >
          {item.title}
        </Link>
      );
    }
    return null;
  };


  return (

    <header className="sticky top-0 z-40 w-full  bg-black shadow" id="noprint">
      {(token || pathName == '/login') &&
        <nav className="text-muted-foreground container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 md:text-white">
          <div className="mr-4 flex items-center gap-2">
            <Link href={token != '' ? '/' : '/login'}>
              <Icons.logo />
            </Link>
            <h1 className="hidden whitespace-nowrap font-bold lg:block">{siteConfig.name}</h1>
          </div>


          <div className="flex w-full flex-col md:flex-row">
            {/* Hamburger icon */}
            <div className="self-end  md:hidden">
              <button onClick={toggleMenu}>
                <Menu />
              </button>
            </div>

            {/* Navigation menu */}
            <div
              className={`${menuOpen ? 'absolute md:static' : 'hidden'
                }  bg-background right-0 top-12 flex-col gap-2  rounded p-4 md:top-0 md:flex  md:w-full md:flex-row md:gap-0 md:bg-transparent lg:relative lg:top-0  lg:w-full lg:bg-transparent lg:p-0`}
            >

              {siteConfig.mainNav?.map(
                (item: any, index: any) =>
                  item.href && item.links == null ?
                    renderLinks(item, role, index)
                    :
                    (
                      hasPermission(role, item) &&
                      <DropdownMenu key={index}>
                        <DropdownMenuTrigger className={cn(
                          `text-muted-foreground flex items-center rounded border-b px-2 py-4 text-sm font-medium hover:bg-white hover:text-black   md:border-0 md:text-white lg:border-0 ${token == '' && 'hidden'}`,
                        )}>Configurações</DropdownMenuTrigger>
                        <DropdownMenuContent collisionPadding={15} className="flex flex-col">
                          {item.links?.map(
                            (item: any, index: any) =>
                              <DropdownMenuItem key={index}>
                                <Link
                                  className={cn(
                                    `text-muted-foreground hover:bg-accent flex w-full items-center whitespace-nowrap rounded border-b p-3 text-sm font-medium  md:border-0 lg:border-0${token == '' && 'hidden'}`,
                                  )} href={item.href}>
                                  {item.title}
                                </Link>
                              </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )
              )}

              <div className="flex w-fit items-center justify-end gap-2 md:w-full lg:w-full">
                <ThemeToggle />
                {token !== '' ? (
                  <Link
                    className={cn("mt-1 border-white md:mt-0", buttonVariants({ variant: 'outline' }))}
                    onClick={() => {
                      logout();
                    }}
                    href="/login"
                  >
                    Sair
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </nav>
      }
    </header>
  );
}
