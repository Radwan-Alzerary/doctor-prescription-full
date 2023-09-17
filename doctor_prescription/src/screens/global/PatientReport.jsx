import { use } from "i18next";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

function PatientReport(props) {
  const componentRef = useRef();

  const [middleText, setMiddleText] = useState([]);
  const [rightText, setRightText] = useState([]);
  const [leftText, setLeftText] = useState([]);
  // const [lodding, setLodding] = useState(false);
  useEffect(() => {
    console.log("dataToPrint");
    if (props.prints) {
      handlePrint();
      props.feedback();
    }
  }, [props.prints]);

  useEffect(() => {
    setMiddleText(props.medicalReportsStype.HeaderMidleText);
    setRightText(props.medicalReportsStype.HeaderRightText);
    setLeftText(props.medicalReportsStype.HeaderLeftText);
    console.log("xx");
    console.log(middleText);
    console.log("xx");

    // setLodding(true);
  }, [props.medicalReportsStype]);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
    // onAfterPrint: () => alert("Print success"),
  });

  return (
    <div className=" ">
      <div
        ref={componentRef}
        className="p-4"
        style={{ direction: "rtl", textAlign: "right" }}
      >
        {/* Your content to be printed */}
        <div className=" h-[95vh] relative flex flex-col ">
          <div className="flex w-full  flex-col justify-center items-center">
            <h1
              className={` font-semibold mb-2`}
              style={{
                fontSize: `${props.medicalReportsStype.mainNameSize}rem`,
                color: `${props.medicalReportsStype.mainNameHeaderColor}`,
              }}
            >
              {props.medicalReportsStype.mainNameActive ? (
                <>{props.medicalReportsStype.mainNameHeader}</>
              ) : (
                ""
              )}
            </h1>
            <div className="w-full h-0.5 bg-slate-100 my-2"></div>
            <h1 className=" text-blue-500 text-sm font-semibold"> </h1>
            <div className="flex w-full justify-between">
              <div className=" text-right">
                {rightText.map((medicalText, index) => (
                  <>
                    <p
                      style={{
                        fontSize: `${medicalText.size}rem`,
                        color: `${medicalText.Color}`,
                      }}
                    >
                      {medicalText.text}
                    </p>
                  </>
                ))}
              </div>
              <div className=" text-center">
                {middleText.map((medicalText, index) => (
                  <>
                    <p
                      style={{
                        fontSize: `${medicalText.size}rem`,
                        color: `${medicalText.Color}`,
                      }}
                    >
                      {medicalText.text}
                    </p>
                  </>
                ))}
              </div>
              <div className=" text-left">
                {leftText.map((medicalText, index) => (
                  <>
                    <p
                      style={{
                        fontSize: `${medicalText.size}rem`,
                        color: `${medicalText.Color}`,
                      }}
                    >
                      {medicalText.text}
                    </p>
                  </>
                ))}
              </div>
            </div>
            <div className="w-full h-0.5 bg-slate-100 mt-2"></div>
          </div>
          <div className="flex justify-around items-center my-2 ">
            <div className="flex gap-2">
              <h2
                className=" text-red-500 font-semibold"
                style={{
                  // fontSize: `${props.medicalReportsStype.mainNameSize}rem`,
                  color: `${props.medicalReportsStype.patientsTitleColor}`,
                }}
              >
                اسم المريض :{" "}
              </h2>
              <h2
                className="font-semibold"
                style={{
                  // fontSize: `${props.medicalReportsStype.mainNameSize}rem`,
                  color: `${props.medicalReportsStype.patientsSubTitleColor}`,
                }}
              >
                {props.dataToPrint.patients.name}
              </h2>
            </div>

            <div className="flex gap-2">
              <h2
                className=" text-red-500 font-semibold"
                style={{
                  // fontSize: `${props.medicalReportsStype.mainNameSize}rem`,
                  color: `${props.medicalReportsStype.patientsTitleColor}`,
                }}
              >
                العمر :{" "}
              </h2>
              <h2
                className="font-semibold"
                style={{
                  // fontSize: `${props.medicalReportsStype.mainNameSize}rem`,
                  color: `${props.medicalReportsStype.patientsSubTitleColor}`,
                }}
              >
                {" "}
                {props.dataToPrint.patients.age}
              </h2>
            </div>

            <div className="flex gap-2">
              <h2
                className=" text-red-500 font-semibold"
                style={{
                  // fontSize: `${props.medicalReportsStype.mainNameSize}rem`,
                  color: `${props.medicalReportsStype.patientsTitleColor}`,
                }}
              >
                التاريخ :{" "}
              </h2>
              <h2
                className="font-semibold"
                style={{
                  // fontSize: `${props.medicalReportsStype.mainNameSize}rem`,
                  color: `${props.medicalReportsStype.patientsSubTitleColor}`,
                }}
              >
                {" "}
                {new Date(
                  props.dataToPrint.prescription.createdAt
                ).toLocaleDateString()}
              </h2>
            </div>
          </div>
          <div className="w-full h-0.5 bg-slate-100 mb-2"></div>

          <div className=" w-full h-1/2  ">
            <div class="relative ">
              <table class="w-full text-sm text-left text-gray-500 ">
                <thead class="text-xs text-gray-700 uppercase   ">
                  {props.medicalReportsStype.tableHeaderActive ? (
                    <tr>
                      {props.medicalReportsStype.col6Active ? (
                        <th
                          scope="col"
                          class="px-3 py-3"
                          style={{
                            fontSize: `${props.medicalReportsStype.tableHeaderTextSize}rem`,
                            color: `${props.medicalReportsStype.tableHeaderColor}`,
                          }}
                        >
                          {props.medicalReportsStype.col6}
                        </th>
                      ) : (
                        ""
                      )}

                      {props.medicalReportsStype.col5Active ? (
                        <th
                          scope="col"
                          class="px-3 py-3 "
                          style={{
                            fontSize: `${props.medicalReportsStype.tableHeaderTextSize}rem`,
                            color: `${props.medicalReportsStype.tableHeaderColor}`,
                          }}
                        >
                          {props.medicalReportsStype.col5}
                        </th>
                      ) : (
                        ""
                      )}
                      {props.medicalReportsStype.col4Active ? (
                        <th
                          scope="col"
                          class="px-3 py-3"
                          style={{
                            fontSize: `${props.medicalReportsStype.tableHeaderTextSize}rem`,
                            color: `${props.medicalReportsStype.tableHeaderColor}`,
                          }}
                        >
                          {props.medicalReportsStype.col4}
                        </th>
                      ) : (
                        ""
                      )}
                      {props.medicalReportsStype.col3Active ? (
                        <th
                          scope="col"
                          class="px-3 py-3"
                          style={{
                            fontSize: `${props.medicalReportsStype.tableHeaderTextSize}rem`,
                            color: `${props.medicalReportsStype.tableHeaderColor}`,
                          }}
                        >
                          {props.medicalReportsStype.col3}
                        </th>
                      ) : (
                        ""
                      )}

                      {props.medicalReportsStype.col2Active ? (
                        <th
                          scope="col"
                          class="px-3 py-3"
                          style={{
                            fontSize: `${props.medicalReportsStype.tableHeaderTextSize}rem`,
                            color: `${props.medicalReportsStype.tableHeaderColor}`,
                          }}
                        >
                          {props.medicalReportsStype.col2}
                        </th>
                      ) : (
                        ""
                      )}
                      {props.medicalReportsStype.col1Active ? (
                        <th
                          scope="col"
                          class="px-3 py-3"
                          style={{
                            fontSize: `${props.medicalReportsStype.tableHeaderTextSize}rem`,
                            color: `${props.medicalReportsStype.tableHeaderColor}`,
                          }}
                        >
                          {props.medicalReportsStype.col1}
                        </th>
                      ) : (
                        ""
                      )}
                    </tr>
                  ) : (
                    ""
                  )}
                </thead>

                <tbody>
                  {props.dataToPrint.prescription.pharmaceutical ? (
                    <>
                      {props.dataToPrint.prescription.pharmaceutical.map(
                        (drug, index) => (
                          <tr class="bg-white ">
                            {props.medicalReportsStype.col6Active ? (
                              <th
                                scope="row"
                                class="px-3 py-3 font-medium text-gray-900 whitespace-nowrap "
                                style={{
                                  fontSize: `${props.medicalReportsStype.tableContentTextSize}rem`,
                                  color: `${props.medicalReportsStype.tableContentColor}`,
                                }}
                              >
                                {drug.description}
                              </th>
                            ) : (
                              ""
                            )}
                            {props.medicalReportsStype.col5Active ? (
                              <td
                                class="px-3 py-3 text-center"
                                style={{
                                  fontSize: `${props.medicalReportsStype.tableContentTextSize}rem`,
                                  color: `${props.medicalReportsStype.tableContentColor}`,
                                }}
                              >
                                {drug.inTakeTime
                                  ? drug.inTakeTime.name
                                  : drug.anotherIntaketime}
                              </td>
                            ) : (
                              ""
                            )}
                            {props.medicalReportsStype.col4Active ? (
                              <td
                                class="px-3 py-3 text-center"
                                style={{
                                  fontSize: `${props.medicalReportsStype.tableContentTextSize}rem`,
                                  color: `${props.medicalReportsStype.tableContentColor}`,
                                }}
                              >
                                {drug.doseNum}
                              </td>
                            ) : (
                              ""
                            )}
                            {props.medicalReportsStype.col3Active ? (
                              <td
                                class="px-3 py-3 text-center"
                                style={{
                                  fontSize: `${props.medicalReportsStype.tableContentTextSize}rem`,
                                  color: `${props.medicalReportsStype.tableContentColor}`,
                                }}
                              >
                                {drug.dose}
                              </td>
                            ) : (
                              ""
                            )}

                            {props.medicalReportsStype.col2Active ? (
                              <td
                                class="px-3 py-3 text-center"
                                style={{
                                  fontSize: `${props.medicalReportsStype.tableContentTextSize}rem`,
                                  color: `${props.medicalReportsStype.tableContentColor}`,
                                }}
                              >
                                {drug.id.name}
                              </td>
                            ) : (
                              ""
                            )}
                            {props.medicalReportsStype.col1Active ? (
                              <td
                                class="px-3 py-3 text-center"
                                style={{
                                  fontSize: `${props.medicalReportsStype.tableContentTextSize}rem`,
                                  color: `${props.medicalReportsStype.tableContentColor}`,
                                }}
                              >
                                {index + 1}
                              </td>
                            ) : (
                              ""
                            )}
                          </tr>
                        )
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className=" w-full  absolute bottom-0 ">
            <div className="w-full h-0.5 bg-slate-100 mb-3"></div>

            <div className="flex items-cenDter justify-around">
              <div>
                <div
                  className=" text-base"
                  style={{
                    fontSize: `${props.medicalReportsStype.footerTextSize}rem`,
                    color: `${props.medicalReportsStype.footerTextColor}`,
                  }}
                >
                  {props.medicalReportsStype.addressActive ? (
                    <div> العنوان : {props.medicalReportsStype.address}</div>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className=" text-base"
                  style={{
                    fontSize: `${props.medicalReportsStype.footerTextSize}rem`,
                    color: `${props.medicalReportsStype.footerTextColor}`,
                  }}
                >
                  {props.medicalReportsStype.phoneNumberActive ? (
                    <div>
                      رقم الهاتف : {props.medicalReportsStype.phoneNumber}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div>
                {props.medicalReportsStype.dateOfRegistrationActive ? (
                  <div
                    className=" text-base "
                    style={{
                      fontSize: `${props.medicalReportsStype.footerTextSize}rem`,
                      color: `${props.medicalReportsStype.footerTextColor}`,
                    }}
                  >
                    تاريخ التسجيل :{" "}
                    {props.medicalReportsStype.dateOfRegistration}
                  </div>
                ) : (
                  ""
                )}

                {props.medicalReportsStype.numberOfRegistratonActive ? (
                  <div
                    className=" text-base "
                    style={{
                      fontSize: `${props.medicalReportsStype.footerTextSize}rem`,
                      color: `${props.medicalReportsStype.footerTextColor}`,
                    }}
                  >
                    رقم التسجيل :{" "}
                    {props.medicalReportsStype.numberOfRegistraton}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientReport;
