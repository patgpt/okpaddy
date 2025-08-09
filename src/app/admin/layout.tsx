import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NavSidebar } from "./NavSidebar";
import AdminTopbar from "./components/AdminTopbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) redirect("/sign-in?redirect_url=/admin");
  return (
    <div className="mx-auto flex max-w-6xl gap-6 px-4 md:px-6">
      {/* Sidebar */}
      <NavSidebar />
      {/* Main */}
      <section className="flex-1 py-6">
        <AdminTopbar title="Admin" />
        {children}
      </section>
    </div>
  );
}
