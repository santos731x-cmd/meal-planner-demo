import {ReactNode} from "react";
import { DashboardLayout } from "../../../../(dashboard)/_components/dashboard-layout"
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
type LayoutProps = { children: ReactNode };
export default async function ProductPage({ params }: { params: { id: string } }) {
    
    const { id } = await params;
    const session = await auth();
      if (!session) redirect("/sign-in");
  return (
    <div>
      {/* <DashboardLayout session={session}>{children}</DashboardLayout> */}
      <h1>Product ID: {id}</h1>
    </div>
  )
}

/* // Optional: Add metadata for the dynamic route
export async function generateMetadata({ params }) {
return { title: `Product ${params.id}` };
} */