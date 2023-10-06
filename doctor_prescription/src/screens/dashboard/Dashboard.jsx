import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import VisitChart from "../../components/dashboard/VisitChart";
import { FormattedMessage } from "react-intl";
import axios from "axios";

function Dashboard() {
  // Declare componentRef at the component level
  const [dashboardCount, setDashboardCount] = useState({});
  const [loading, setLoding] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:5000/dashboard/getcount")
      .then((response) => {
        setDashboardCount(response.data); // Update the categories state with the fetched data
        if (response.data) {
          setLoding(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div className="w-full p-4  h-[93%]">
      {loading ? (
        <>
          <div className="w-full grid grid-cols-1 lg:grid-cols-5 md:grid-cols-5 gap-8   ">        
            <div className="  h-28 p-2 px-4 bg-white rounded-lg shadow">
              <p className=" text-base">
                {" "}
                <FormattedMessage
                  id={"Number of patients"}
                  defaultMessage="Hello, World!"
                />
              </p>
              <h1 className=" text-6xl w-full font-medium">
                {dashboardCount.patientsCount}
              </h1>
            </div>
            <div className="  h-28 p-2 px-4 bg-white rounded-lg shadow">
              <p className=" text-base">
                {" "}
                <FormattedMessage
                  id={"Rx number"}
                  defaultMessage="Hello, World!"
                />
              </p>
              <h1 className=" text-6xl w-full font-medium">
                {dashboardCount.PrescriptionCount}
              </h1>
            </div>
            <div className=" h-28 p-2 px-4 bg-white rounded-lg shadow">
              <p className=" text-base">
                {" "}
                <FormattedMessage
                  id={"Drugs number"}
                  defaultMessage="Hello, World!"
                />
              </p>
              <h1 className=" text-6xl w-full font-medium">
                {dashboardCount.pharmaceuticalCount}
              </h1>
            </div>
            <div className="  h-28 p-2 px-4 bg-white rounded-lg shadow">
              <p className=" text-base">
                {" "}
                <FormattedMessage
                  id={"Number of visit"}
                  defaultMessage="Hello, World!"
                />
              </p>
              <h1 className=" text-6xl w-full font-medium">
                {" "}
                {dashboardCount.totalVisitDateCount}
              </h1>
            </div>
            <div className="  h-28 p-2 px-4 bg-white rounded-lg shadow">
              <p className=" text-base">
                {" "}
                <FormattedMessage
                  id={"Number of visit per day"}
                  defaultMessage="Hello, World!"
                />
              </p>
              <h1 className=" text-6xl w-full font-medium">
                {" "}
                {dashboardCount.todayCont}
              </h1>
            </div>
          </div>
          <div className="mt-8">
            <VisitChart
              dashboardVisitCount={dashboardCount.dailyVisitCounts}
            ></VisitChart>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Dashboard;
