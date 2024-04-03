const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex  items-center justify-center p-24">
      {children}
    </div>
  );
};

export default DashboardLayout;
