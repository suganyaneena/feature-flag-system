export default function Header() {
  return (
    <div className="h-[70px] bg-white shadow-sm px-6 flex items-center justify-between">
      <h2 className="text-2xl font-semibold">
        Feature Flag 
      </h2>

      <div className="flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="rounded-full"
        />

        {/* <span className="font-medium">
          Admin
        </span> */}
      </div>
    </div>
  );
}