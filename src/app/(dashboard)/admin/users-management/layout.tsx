"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, ClipboardClock, Ruler } from "lucide-react";
import Link from "next/link";
import { usePathname,useRouter } from "next/navigation";
import { ReactNode } from "react";

type LayoutProps = { children: ReactNode };
const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
    const router = useRouter()
  const activeTab = pathname.split("/").pop() || "users"

  

  

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mb-6">
        <Tabs 
        value={activeTab}
         defaultValue="users" 
        onValueChange={(value) => router.push(`/admin/users-management/${value}`)}
        
        
          >
          <TabsList  >

          <TabsTrigger  value="users" ><User/>Users</TabsTrigger> 
          <TabsTrigger  value="consulting" ><ClipboardClock/>Consulting</TabsTrigger> 
          </TabsList>
        </Tabs>
      </div>
      {children}
    </div>
  );
};

export default Layout;
