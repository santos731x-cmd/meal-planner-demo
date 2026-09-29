"use client";
import { useSignOut } from "@/app/(auth)/sign-in/_services/use-sign-in-mutations";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {motion} from "motion/react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { User,ClipboardClock, Apple, Boxes, ChevronDown, ChevronLeft, LogOut, Menu, Ruler,Utensils} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {ReactNode,useState} from "react";
import { DropdownMenu ,DropdownMenuContent,DropdownMenuGroup,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import z from "zod";
import { customErrorMap } from "@/lib/customErrorMap";
import { Session } from "next-auth";
z.setErrorMap(customErrorMap);
import Image from "next/image";

type RouteGroupType = {
  group: string;
  items: {
    href : string; 
    label : string;
    icon : ReactNode;
  }[];
};

const ROUTE_GROUPS: RouteGroupType[] = [
  {
    group: "Foods Management",
    items: [
      { href: "/admin/foods-management/foods", label: "Foods", icon: <Apple className="mr-2 size-3" /> },
      { href: "/admin/foods-management/categories", label: "Categories", icon: <Boxes className="mr-2 size-3" /> },
      { href: "/admin/foods-management/serving-units", label: "Serving Units", icon: <Ruler className="mr-2 size-3" /> },
    ],
  },
  {
    group: "Users Management",
    items: [
      { href: "/admin/users-management/users", label: "Users", icon: <User className="mr-2 size-3" /> },
      { href: "/admin/users-management/consulting", label: "Consulting", icon: <ClipboardClock className="mr-2 size-3" /> },

    ],
  },  
  {
    group: "Meals Management",
    items: [
      { href: "/client", label: "Meals", icon: <Utensils className="mr-2 size-3" /> },
    ],
  }
];

type RouteGroupProps = RouteGroupType;

const RouteGroup = ({ group, items }: RouteGroupProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger asChild>
        <Button className="text-foreground/80 w-full font-normal flex justify-between" variant="ghost">
          {group}
          <div className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <ChevronDown></ChevronDown>
          </div>
        </Button>
      </Collapsible.Trigger>
       <Collapsible.Content forceMount>
      <motion.div className={`flex flex-col gap-2 ${!open ? "pointer-events-none" : ""} `}
        initial={{height: 0, opacity: 0}}
        animate={{height: open ? "auto" : 0, opacity: open ? 1 : 0}}
        transition={{duration: 0.2, ease: "easeInOut"}}
      >
        
      {items.map((item) => (
          <Button
          key={item.href}
          variant="link"
          className="w-full justify-start font-normal"
          
          >
            <Link className={`flex items-center rounded-md px-5 py-1 transition-all ${
                  pathname === item.href
                    ? "bg-foreground/10 hover:bg-foreground/5"
                    : "hover:bg-foreground/10"
                }`} href={item.href}>
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </Link>
            
          </Button>
        ))}  

      </motion.div>
      </Collapsible.Content> 
    </Collapsible.Root>
  );
}

type DashLayoutProps = {
  children: ReactNode;
  session:Session
};

const DashboardLayout = ({children,session}: DashLayoutProps) => {   
    const [open, setOpen] = useState(false); 

  const signOutMutation = useSignOut();
  const userRole = session.user?.role || "user";

  const filteredRouteGroups = ROUTE_GROUPS.filter((group) => {
    if (userRole === "ADMIN") {
      return group.group === "Foods Management" || group.group === "Meals Management" || group.group === "Users Management";
    } else {
      return group.group === "Meals Management";
    }
  });  

  const handleLogout = () => {
    signOutMutation.mutate();
  };

  return (
    <div className="flex">
    <div className="bg-background fixed z-10 flex h-13 w-screen items-center justify-between border px-2">
       <Collapsible.Root className="h-full" open={open} onOpenChange={setOpen}>
           <Collapsible.Trigger className="m-2" asChild>
             <Button size='icon' variant="outline">
               <Menu></Menu>
             </Button>
           </Collapsible.Trigger>
        </Collapsible.Root>

        <div className="flex">
          <ThemeToggle/>

          {session && (
          <DropdownMenu>
             <DropdownMenuTrigger render={
              <Button className="flex h-9 items-center gap-2 px-2 " variant="ghost" >
                <Avatar className="size-8">
                  <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline">{session.user.name}</span>
              </Button>}>               
                  
              </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator/>
              
              <div className="flex items-center gap-3 px-2 py-1.5">
                <Avatar className="size-10">
                  <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{session.user.name}</p>
                  <p className="text-muted-foreground text-xs">{session.user.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator/>
              <DropdownMenuItem onClick={handleLogout} variant="destructive"><LogOut className="size-4" />LogOut</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          )}


        </div>
      </div>


         <Collapsible.Root  className="fixed top-0 left-0 z-20 h-dvh" open={open} onOpenChange={setOpen}>
         <Collapsible.Content forceMount>
         <div className={`bg-background fixed top-0 left-0 h-screen w-64 border p-4  transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex items-center justify-between">
            {/* <h1 className="font-semibold">Dashboard</h1> */}
                      <Image
                        src="/hero.png"
                        alt="Meal planning illustration"
                        width={500}
                        height={400}
                        className="rounded-xl shadow-lg"
                      />
            <Collapsible.Trigger asChild>
            <Button variant="outline" size='icon'>
              <ChevronLeft></ChevronLeft>
            </Button> 

            </Collapsible.Trigger>
          </div>
          <Separator className="my-2" />
          <div className="mt-4">
            {filteredRouteGroups.map((routeGroup) => (
              <RouteGroup {...routeGroup} key={routeGroup.group} />
            ))}
          </div>
        </div> 
        </Collapsible.Content> 
        </Collapsible.Root> 
        <main className={`transition-margin mt-13 flex-1 p-4 duration-300  ${open ? "ml-64" : "ml-0"}`}>
                 {children}
        </main>        
    
    </div>
  );
};
export {DashboardLayout};