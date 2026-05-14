import { useEffect, useState } from "react";
import API from "../api/api";

export default function Dashboard() {
  
  // const cards = [
  //   {
  //     title: "Total Organizations",
  //     value: 12,
  //   },
  //   {
  //     title: "Total Users",
  //     value: 250,
  //   },
  //   {
  //     title: "Active Plans",
  //     value: 15,
  //   },
  // ];

  const [enduserCount, setEnduserCount] = useState(0);
  const [organizationCount, setOrganizationCount] = useState(0);

  const getEnduserCount = async () => {
    try {
      const res = await API.get("/user/enduser-count/count");

      if (res.data.success) {
        setEnduserCount(res.data.total);
      }
    } catch (error) {
      console.log("End user count error:", error);
    }
  };

  const getOrganizationCount = async () => {
    try {
      const res = await API.get("/organization/count");
      console.log("Organization count response:", res);
      if (res.data.success) {
        setOrganizationCount(res.data.total);
      }
    } catch (error) {
      console.log("Organization count error:", error);
    }
  };

  useEffect(() => {
    getEnduserCount();
    getOrganizationCount();
  }, []);

  return (
    <div>
      {/* <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1> */}

      <div className="grid grid-cols-3 gap-6">
        {/* {cards.map((card, index) => ( */}
          <div
            // key={index}
            className="bg-white p-6 rounded-2xl shadow-sm"
          >
            <h3 className="text-gray-500">
               Total Organization Admin
            </h3>

            <p className="text-3xl font-bold mt-3">
              {organizationCount}
            </p>
          </div>

           <div
            // key={index}
            className="bg-white p-6 rounded-2xl shadow-sm"
          >
            <h3 className="text-gray-500">
               Total End User's
            </h3>

            <p className="text-3xl font-bold mt-3">
              {enduserCount}
            </p>
          </div>
        {/* } */}
        {/* } */}
      </div>
    </div>

  );
}