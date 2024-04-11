import Navbar from "./_components/navbar/navbar";
import Sidebar from "./_components/sidebar/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="md:pl-56 h-[80px] w-full  fixed inset-y-0 z-30">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>

      <main className="md:pl-56 pt-[80px] h-full "> {children}</main>
    </div>
  );
};

export default DashboardLayout;
