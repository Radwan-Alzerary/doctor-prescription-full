import { use } from "i18next";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

function PatientReport(props) {
  const componentRef = useRef();
  const [middleText, setMiddleText] = useState([]);
  const [rightText, setRightText] = useState([]);
  const [leftText, setLeftText] = useState([]);
  const [randomText, setRandomText] = useState([]);
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000      // Fetch dashboard data first

  useEffect(() => {
    console.log("dataToPrint");
    async function updateTextAndPrint() {
      if (props.prints) {
        setMiddleText(props.medicalReportsStype.HeaderMidleText);
        setRightText(props.medicalReportsStype.HeaderRightText);
        setLeftText(props.medicalReportsStype.HeaderLeftText);
        setRandomText(props.medicalReportsStype.textRandom);
        // Introduce a 1-second delay
        await new Promise((resolve) => setTimeout(resolve, 300));
        await handlePrint(); // Wait for handlePrint() to finish
        props.feedback(); // After handlePrint() has finished, call feedback()
      }
    }
    updateTextAndPrint();
  }, [props.prints]);

  useEffect(() => {
    setMiddleText(props.medicalReportsStype.HeaderMidleText);
    setRightText(props.medicalReportsStype.HeaderRightText);
    setLeftText(props.medicalReportsStype.HeaderLeftText);
    setRandomText(props.medicalReportsStype.textRandom);
  }, [props.medicalReportsStype]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
  });

  return (
    <div className="h-full ">
      <div
        className="h-full p-4 relative"
        ref={componentRef}
        style={{
          direction: "rtl",
          textAlign: "right",

          paddingLeft: `${
            props.medicalReportsStype.leftPading +
            props.medicalReportsStype.xPading
          }px`,
          paddingRight: `${
            props.medicalReportsStype.rightPading +
            props.medicalReportsStype.xPading
          }px`,
        }}
      >
        <img
          className="z-0 opacity-30 absolute flex flex-col justify-center left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center w-3/5  rounded-xl "
          src={`${serverAddress}` + props.medicalReportsStype.backgroundImg}
          alt=""
        ></img>
        <div
          className={`z-20 h-0 w-40 absolute text-center flex flex-col justify-center transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center  rounded-xl `}
          style={{
            fontFamily: "signfont",
            left: `${props.medicalReportsStype.signatureX}%`,
            top: `${props.medicalReportsStype.signatureY}%`,
            fontSize: `${props.medicalReportsStype.signatureSize}rem`,
            color: `${props.medicalReportsStype.signatureColor}`,
          }}
        >
          <p className="h-0"> {props.medicalReportsStype.mainNameHeaderknia}</p>
          {props.medicalReportsStype.signature}
        </div>
        {randomText.map((textData, index) => (
          <div
            className={`z-20 h-0 w-40 absolute text-center flex flex-col justify-center transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center  rounded-xl `}
            style={{
              left: `${textData.x}%`,
              top: `${textData.y}%`,
              fontSize: `${textData.size}rem`,
              color: `${textData.color}`,
            }}
          >
            {textData.title}
          </div>
        ))}

        {props.medicalReportsStype.nameActive && props.medicalReportsStype.nameAbsoulateActive ? (
          <div
            className={`flex gap-2 ${
              props.medicalReportsStype.nameAbsoulateActive ? "absolute" : ""
            }`}
            style={{
              top: `${props.medicalReportsStype.nameY}%`,
              left: `${props.medicalReportsStype.nameX}%`,
            }}
          >
            <h2
              className=" text-red-500 font-semibold"
              style={{
                fontSize: `${props.medicalReportsStype.nameSize}rem`,
                color: `${props.medicalReportsStype.nameMainTitleColor}`,
              }}
            >
              {props.medicalReportsStype.patientsTitleActive &&
              props.medicalReportsStype.nameMainTitleActive
                ? "اسم المريض : "
                : ""}
            </h2>
            <h2
              className="font-semibold"
              style={{
                fontSize: `${props.medicalReportsStype.nameSize}rem`,
                color: `${props.medicalReportsStype.nameColor}`,
              }}
            >
              {props.dataToPrint.patients.name}
            </h2>
          </div>
        ) : (
          ""
        )}
        {props.medicalReportsStype.ageActive && props.medicalReportsStype.ageAbsoulateActive ? (
          <div
            className={`flex gap-2 ${
              props.medicalReportsStype.ageAbsoulateActive ? "absolute" : ""
            }`}
            style={{
              top: `${props.medicalReportsStype.ageY}%`,
              left: `${props.medicalReportsStype.ageX}%`,
            }}
          >
            <h2
              className=" text-red-500 font-semibold"
              style={{
                fontSize: `${props.medicalReportsStype.ageSize}rem`,
                color: `${props.medicalReportsStype.ageMainTitleColor}`,
              }}
            >
              {props.medicalReportsStype.patientsTitleActive &&
              props.medicalReportsStype.ageMainTitleActive
                ? "العمر : "
                : ""}
            </h2>
            <h2
              className="font-semibold"
              style={{
                fontSize: `${props.medicalReportsStype.ageSize}rem`,
                color: `${props.medicalReportsStype.ageColor}`,
              }}
            >
              {" "}
              {props.dataToPrint.patients.age}
            </h2>
          </div>
        ) : (
          ""
        )}
        {props.medicalReportsStype.dateActive && props.medicalReportsStype.dateAbsoulateActive ? (
          <div
            className={`flex gap-2 ${
              props.medicalReportsStype.dateAbsoulateActive ? "absolute" : ""
            }`}
            style={{
              top: `${props.medicalReportsStype.dateY}%`,
              left: `${props.medicalReportsStype.dateX}%`,
            }}
          >
            <h2
              className=" text-red-500 font-semibold"
              style={{
                fontSize: `${props.medicalReportsStype.dateSize}rem`,
                color: `${props.medicalReportsStype.dateMainTitleColor}`,
              }}
            >
              {props.medicalReportsStype.patientsTitleActive &&
              props.medicalReportsStype.dateMainTitleActive
                ? "التاريخ : "
                : ""}
            </h2>
            <h2
              className="font-semibold"
              style={{
                fontSize: `${props.medicalReportsStype.dateSize}rem`,
                color: `${props.medicalReportsStype.dateColor}`,
              }}
            >
              {" "}
              {!props.dataToPrint.textonly
                ? new Date(
                    props.dataToPrint.prescription.createdAt
                  ).toLocaleDateString()
                : ""}
            </h2>
          </div>
        ) : (
          ""
        )}

        {/* Your content to be printed */}
        <div
          className="  h-[96vh] flex flex-col z-1"
          style={{
            backgroundColor: `${props.medicalReportsStype.backgroundColor}`,
          }}
        >
          <div className="flex w-full  flex-col justify-center items-center">
            <div
              style={{ height: `${props.medicalReportsStype.topPading}px` }}
            ></div>
            <h1
              className={` font-semibold mb-2`}
              style={{
                fontSize: `${props.medicalReportsStype.mainNameHeaderkniaSize}rem`,
                color: `${props.medicalReportsStype.mainNameHeaderkniaColor}`,
              }}
            >
              {props.medicalReportsStype.mainNameHeaderkniaActive ? (
                <>{props.medicalReportsStype.mainNameHeaderknia}</>
              ) : (
                ""
              )}
            </h1>
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
            {props.medicalReportsStype.linesActive ? (
              <div className="w-full h-0.5 bg-slate-100 mt-2"></div>
            ) : (
              ""
            )}
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
            {props.medicalReportsStype.linesActive ? (
              <div className="w-full h-0.5 bg-slate-100 mt-2"></div>
            ) : (
              ""
            )}
          </div>
          <div className="flex justify-around items-center my-2 ">
            {props.medicalReportsStype.nameActive   && !props.medicalReportsStype.ageAbsoulateActive? (
              <div
                className={`flex gap-2 ${
                  props.medicalReportsStype.nameAbsoulateActive
                    ? "absolute"
                    : ""
                }`}
                style={{
                  top: `${props.medicalReportsStype.nameY}px`,
                  left: `${props.medicalReportsStype.nameX}px`,
                }}
              >
                <h2
                  className=" text-red-500 font-semibold"
                  style={{
                    fontSize: `${props.medicalReportsStype.nameSize}rem`,
                    color: `${props.medicalReportsStype.nameMainTitleColor}`,
                  }}
                >
                  {props.medicalReportsStype.patientsTitleActive &&
                  props.medicalReportsStype.nameMainTitleActive
                    ? "اسم المريض : "
                    : ""}
                </h2>
                <h2
                  className="font-semibold"
                  style={{
                    fontSize: `${props.medicalReportsStype.nameSize}rem`,
                    color: `${props.medicalReportsStype.nameColor}`,
                  }}
                >
                  {props.dataToPrint.patients.name}
                </h2>
              </div>
            ) : (
              ""
            )}
            {props.medicalReportsStype.ageActive && !props.medicalReportsStype.ageAbsoulateActive ? (
              <div
                className={`flex gap-2 ${
                  props.medicalReportsStype.ageAbsoulateActive ? "absolute" : ""
                }`}
                style={{
                  top: `${props.medicalReportsStype.ageY}px`,
                  left: `${props.medicalReportsStype.ageX}px`,
                }}
              >
                <h2
                  className=" text-red-500 font-semibold"
                  style={{
                    fontSize: `${props.medicalReportsStype.ageSize}rem`,
                    color: `${props.medicalReportsStype.ageMainTitleColor}`,
                  }}
                >
                  {props.medicalReportsStype.patientsTitleActive &&
                  props.medicalReportsStype.ageMainTitleActive
                    ? "العمر : "
                    : ""}
                </h2>
                <h2
                  className="font-semibold"
                  style={{
                    fontSize: `${props.medicalReportsStype.ageSize}rem`,
                    color: `${props.medicalReportsStype.ageColor}`,
                  }}
                >
                  {" "}
                  {props.dataToPrint.patients.age}
                </h2>
              </div>
            ) : (
              ""
            )}
            {props.medicalReportsStype.dateActive  && !props.medicalReportsStype.dateAbsoulateActive ? (
              <div
                className={`flex gap-2 ${
                  props.medicalReportsStype.dateAbsoulateActive
                    ? "absolute"
                    : ""
                }`}
                style={{
                  top: `${props.medicalReportsStype.dateY}px`,
                  left: `${props.medicalReportsStype.dateX}px`,
                }}
              >
                <h2
                  className=" text-red-500 font-semibold"
                  style={{
                    fontSize: `${props.medicalReportsStype.dateSize}rem`,
                    color: `${props.medicalReportsStype.dateMainTitleColor}`,
                  }}
                >
                  {props.medicalReportsStype.patientsTitleActive &&
                  props.medicalReportsStype.dateMainTitleActive
                    ? "التاريخ : "
                    : ""}
                </h2>
                <h2
                  className="font-semibold"
                  style={{
                    fontSize: `${props.medicalReportsStype.dateSize}rem`,
                    color: `${props.medicalReportsStype.dateColor}`,
                  }}
                >
                  {" "}
                  {!props.dataToPrint.textonly
                    ? new Date(
                        props.dataToPrint.prescription.createdAt
                      ).toLocaleDateString()
                    : ""}
                </h2>
              </div>
            ) : (
              ""
            )}
          </div>
          {props.medicalReportsStype.linesActive ? (
            <div className="w-full h-0.5 bg-slate-100 mt-2"></div>
          ) : (
            ""
          )}

          <div className=" w-full h-1/2  ">
            <div class=" ">
              <table class="w-full text-sm  text-center text-gray-500 ">
                {!props.dataToPrint.textonly ? (
                  <thead class="text-xs text-center text-gray-700 uppercase   ">
                    {props.medicalReportsStype.tableHeaderActive ? (
                      <tr>
                        {props.medicalReportsStype.col6Active ? (
                          <th
                            className="text-center"
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
                            className="text-center"
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
                            className="text-center"
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
                            className="text-center"
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
                            className="text-center"
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
                            className="text-center"
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
                ) : (
                  <div className="text-center text-2xl">
                    <p
                      style={{
                        fontSize: `${props.medicalReportsStype.tableHeaderTextSize}rem`,
                        color: `${props.medicalReportsStype.tableHeaderColor}`,
                      }}
                    >
                      التقرير
                    </p>
                  </div>
                )}

                {!props.dataToPrint.textonly ? (
                  <tbody>
                    {props.dataToPrint.prescription.pharmaceutical ? (
                      <>
                        {props.dataToPrint.prescription.pharmaceutical.map(
                          (drug, index) => (
                            <tr className="text-center">
                              {props.medicalReportsStype.col6Active ? (
                                <th
                                  className="text-center"
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
                                  {drug.id.tradeName ? (
                                    <div>{drug.id.tradeName}</div>
                                  ) : (
                                    ""
                                  )}
                                  <div>{drug.id.name}</div>
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
                ) : (
                  <p
                    style={{
                      fontSize: `${props.medicalReportsStype.tableContentTextSize}rem`,
                      color: `${props.medicalReportsStype.tableContentColor}`,
                    }}
                  >
                    {props.dataToPrint.data}
                  </p>
                )}
              </table>
            </div>
          </div>

          <div className=" w-full absolute bottom-0 ">
            {props.medicalReportsStype.linesActive ? (
              <div className="w-full h-0.5 bg-slate-100 mt-2"></div>
            ) : (
              ""
            )}

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
            <div
              style={{ height: `${props.medicalReportsStype.bottomPading}px` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientReport;
