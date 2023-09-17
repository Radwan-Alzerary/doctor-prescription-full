import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import VisitChart from "../../components/dashboard/VisitChart";

function Dashboard() {
  // Declare componentRef at the component level

  return (
    <div className="w-full p-4  h-[93%]">
      <div className="w-full gap-8 flex justify-center items-center ">
        <div className=" w-1/5 h-28 p-2 px-4 bg-white rounded-lg shadow">
          <p className=" text-base">مجموع المرضى</p>
          <h1 className=" text-6xl w-full font-medium">3000</h1>
        </div>
        <div className=" w-1/5 h-28 p-2 px-4 bg-white rounded-lg shadow">
          <p className=" text-base">مجموع الوصفات</p>
          <h1 className=" text-6xl w-full font-medium">3000</h1>
        </div>
        <div className=" w-1/5 h-28 p-2 px-4 bg-white rounded-lg shadow">
          <p className=" text-base">مجموع الادوية</p>
          <h1 className=" text-6xl w-full font-medium">3000</h1>
        </div>
        <div className=" w-1/5 h-28 p-2 px-4 bg-white rounded-lg shadow">
          <p className=" text-base">مجموع الزيارات اليوم</p>
          <h1 className=" text-6xl w-full font-medium">3000</h1>
        </div>
      </div>
      <div className="mt-8">
      <VisitChart></VisitChart>

      </div>
    </div>
  );
}

export default Dashboard;
