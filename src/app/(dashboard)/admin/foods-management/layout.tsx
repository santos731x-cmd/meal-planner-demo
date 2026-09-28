"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Apple, Boxes, Ruler } from "lucide-react";
import Link from "next/link";
import { usePathname,useRouter } from "next/navigation";
import { ReactNode } from "react";

type LayoutProps = { children: ReactNode };
const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
    const router = useRouter()
  const activeTab = pathname.split("/").pop() || "foods"

  

  /* const getDefaultTab = () => {
    if (pathname.includes("/admin/foods-management/categories"))
      return "categories";
    if (pathname.includes("/admin/foods-management/serving-units"))
      return "serving-units";
    return "foods";
  }; */

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mb-6">
        <Tabs 
        value={activeTab}
         defaultValue="foods" 
        onValueChange={(value) => router.push(`/admin/foods-management/${value}`)}
        
        
          //value={getDefaultTab()}

          >
          <TabsList  >

          <TabsTrigger  value="foods" ><Apple />Foods</TabsTrigger> 
          <TabsTrigger  value="categories" ><Boxes />Categories</TabsTrigger> 
          <TabsTrigger  value="serving-units" ><Ruler />Serving Units</TabsTrigger> 

{/*              <TabsTrigger  value="foods" >             
              <Link  href="/admin/foods-management/foods">
                <Apple />
                Foods
              </Link>
              
            </TabsTrigger>  */}
            {/* <TabsTrigger value="categories" >
              <Link href="/admin/foods-management/categories">
                <Boxes />
                Categories
              </Link>
            </TabsTrigger> */}
            {/*  <TabsTrigger value="serving-units" >
              <Link href="/admin/foods-management/serving-units">
                <Ruler />
                Serving Units
              </Link>
            </TabsTrigger> */}
          </TabsList>
        </Tabs>
      </div>
      {children}
    </div>
  );
};

export default Layout;
