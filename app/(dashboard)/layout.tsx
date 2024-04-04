import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/sidebar/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <div className="md:pl-56">
        <Navbar />
      </div>
      <main className="md:pl-56"> {children}</main>
    </div>
  );
};

export default DashboardLayout;
