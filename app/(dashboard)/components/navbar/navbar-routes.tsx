import { UserButton } from "@clerk/nextjs";

const NavbarRoutes = () => {
  return (
    <div className="ml-auto">
      <UserButton />
    </div>
  );
};

export default NavbarRoutes;
