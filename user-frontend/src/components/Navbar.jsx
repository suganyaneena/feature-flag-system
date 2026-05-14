export default function Navbar() {
  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between">

      <h1 className="text-xl font-bold">
        Admin Panel
      </h1>

      {/* <button
        className="bg-red-500 px-4 py-1 rounded"
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        Logout
      </button> */}
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

//    return (
//     <div className="h-[70px] bg-white shadow-sm px-6 flex items-center justify-between">
//       <h2 className="text-2xl font-semibold">
//         Super Admin Panel
//       </h2>

//       <div className="flex items-center gap-3">
//         <img
//           src="https://i.pravatar.cc/40"
//           alt="profile"
//           className="rounded-full"
//         />

//         <span className="font-medium">
//           Admin
//         </span>
//       </div>
//     </div>
//   );
 }