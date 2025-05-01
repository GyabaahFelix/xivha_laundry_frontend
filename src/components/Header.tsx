import { SignOutButton } from "../SignOutButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm p-4 flex justify-between items-center border-b">
      {/* Logo on the left */}
      <div className="flex items-center space-x-4">
        <img
          src="/images/xivhalogo.png" // Assuming your logo is named xivhalogo.png
          alt="Xivha Laundry World Logo"
          className="h-50 md:h-20" // Adjust the size of the logo
        />
        <h2 className="text-lg md:text-xl font-semibold accent-text">
          Xivha Laundry World
        </h2>
      </div>
      
      {/* SignOut Button on the right */}
      <SignOutButton />
    </header>
  );
}
