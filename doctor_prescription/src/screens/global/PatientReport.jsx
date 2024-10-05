import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import QRCode from "qrcode.react";

function PatientReport(props) {
  const componentRef = useRef();
  const [middleText, setMiddleText] = useState([]);
  const [rightText, setRightText] = useState([]);
  const [leftText, setLeftText] = useState([]);
  const [shape, setShape] = useState([]);
  const [images, setImages] = useState([]);
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
        setShape(props.medicalReportsStype.shape);
        setImages(props.medicalReportsStype.images);
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
    setShape(props.medicalReportsStype.shape);
    setImages(props.medicalReportsStype.images);

    setRandomText(props.medicalReportsStype.textRandom);
  }, [props.medicalReportsStype]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
  });

  return (
    <div
      className="h-full "
      style={{
        backgroundColor: `${props.medicalReportsStype.backgroundColor}`,
      }}
    >
      <div
        className="h-full p-4 relative"
        ref={componentRef}
        style={{
          direction: "rtl",
          textAlign: "right",

          paddingLeft: `${props.medicalReportsStype.leftPading +
            props.medicalReportsStype.xPading
            }px`,
          paddingRight: `${props.medicalReportsStype.rightPading +
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
          className={`z-50 h-0 w-40  absolute text-center flex flex-col justify-center transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center  rounded-xl `}
          style={{
            fontFamily: "signfont",
            left: `${props.medicalReportsStype.signatureX}%`,
            top: `${props.medicalReportsStype.signatureY}%`,
            fontSize: `${props.medicalReportsStype.signatureSize}rem`,
            color: `${props.medicalReportsStype.signatureColor}`,
          }}
        >
          <p className="h-0 z-50">
            {" "}
            {props.medicalReportsStype.mainNameHeaderknia}
          </p>
          {props.medicalReportsStype.signature}
        </div>
        {randomText.map((textData, index) => (
          <div
            className={`z-50 h-0 w-40 absolute text-center flex flex-col justify-center transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center  rounded-xl `}
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

        {shape
          ? shape.map((shape, index) => (
            <div
              className={`${shape.Active ? "hidden" : "flex"
                } absolute text-center  flex-col justify-center transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center `}
              style={{
                height: `${shape.height}px`,
                width: `${shape.width}%`,
                left: `${shape.placeX}%`,
                opacity: `${!shape.active ? 0 : "100%"}`,
                top: `${shape.placeY}%`,
                zIndex: `${shape.zindex}`,
                background: `${shape.color}`,
                borderColor: `${shape.borderColor}`,
                borderWidth: `${shape.borderWidth}px`,
                borderRadius: `${shape.shapetype === "circle"
                  ? "100%"
                  : `${shape.borderRadius}px`
                  }`,
              }}
            ></div>
          ))
          : ""}

        {images
          ? images.map((image, index) => (
            <div
              className={`absolute overflow-hidden text-center  flex-col justify-center transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center `}
              style={{
                height: `${image.height}px`,
                width: `${image.width}px`,
                left: `${image.placeX}%`,
                opacity: `${!image.active ? 0 : `${image.opacity}%`}`,
                top: `${image.placeY}%`,
                zIndex: `${image.zindex}`,
                borderColor: `${image.borderColor}`,
                borderWidth: `${image.borderWidth}px`,
                borderRadius: `${`${image.borderRadius}px`}`,
              }}
            >
              <img
                alt=""
                className="w-full h-full"
                src={`${serverAddress}` + image.imageUrl}
              ></img>
            </div>
          ))
          : ""}

        {props.medicalReportsStype.barcodeActive ? (
          <div
            className=" absolute"
            style={{
              left: `${props.medicalReportsStype.barcodeX}%`,
              top: `${props.medicalReportsStype.barcodeY}%`,
            }}
          >
            <QRCode
              size={props.medicalReportsStype.barcodeSize}
              renderAs="svg"
              level="H"
              value={props.dataToPrint.patients._id}
            />
          </div>
        ) : (
          ""
        )}

        {props.medicalReportsStype.patientsNextVisitActive ? (
          <div
            className=" absolute"
            style={{
              left: `${props.medicalReportsStype.patientsNextVisitX}%`,
              top: `${props.medicalReportsStype.patientsNextVisitY}%`,
              fontSize: `${props.medicalReportsStype.patientsNextVisitSize}rem`,
            }}
          >
            {props.nextVisit ? <> الزيارة القادمة :</> : ""}

            {props.nextVisit
              ? new Date(props.nextVisit).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
              : ""}
          </div>
        ) : (
          ""
        )}

        {props.medicalReportsStype.nameActive &&
          props.medicalReportsStype.nameAbsoulateActive ? (
          <div
            className={`flex gap-2 z-50 text-right ${props.medicalReportsStype.nameAbsoulateActive ? "absolute" : ""
              }`}
            style={{
              top: `${props.medicalReportsStype.nameY}%`,
              left: `${props.medicalReportsStype.nameX}%`,
            }}
          >
            <h2
              className=" text-red-500 z-50 font-semibold text-right"
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
              className="font-semibold z-50 text-right"
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
        {props.medicalReportsStype.ageActive &&
          props.medicalReportsStype.ageAbsoulateActive ? (
          <div
            className={`flex gap-2 z-50 ${props.medicalReportsStype.ageAbsoulateActive ? "absolute" : ""
              }`}
            style={{
              top: `${props.medicalReportsStype.ageY}%`,
              left: `${props.medicalReportsStype.ageX}%`,
            }}
          >
            <h2
              className=" text-red-500 z-50 font-semibold"
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
              className="font-semibold z-50"
              style={{
                fontSize: `${props.medicalReportsStype.ageSize}rem`,
                color: `${props.medicalReportsStype.ageColor}`,
              }}
            >
              {" "}
              {props.dataToPrint.patients.age > 0
                ? props.dataToPrint.patients.age
                : props.dataToPrint.patients.monthAge
                  ? props.dataToPrint.patients.monthAge + " شهر "
                  : "غير معرف"}
            </h2>
          </div>
        ) : (
          ""
        )}

        {props.medicalReportsStype.genderActive &&
          props.medicalReportsStype.genderAbsoulateActive ? (
          <div
            className={`flex gap-2 z-50 ${props.medicalReportsStype.genderAbsoulateActive ? "absolute" : ""
              }`}
            style={{
              top: `${props.medicalReportsStype.genderY}%`,
              left: `${props.medicalReportsStype.genderX}%`,
            }}
          >
            <h2
              className=" text-red-500 font-semibold z-50"
              style={{
                fontSize: `${props.medicalReportsStype.genderSize}rem`,
                color: `${props.medicalReportsStype.genderMainTitleColor}`,
              }}
            >
              {props.medicalReportsStype.patientsTitleActive &&
                props.medicalReportsStype.genderMainTitleActive
                ? "الجنس : "
                : ""}
            </h2>
            <h2
              className="font-semibold z-50"
              style={{
                fontSize: `${props.medicalReportsStype.genderSize}rem`,
                color: `${props.medicalReportsStype.genderColor}`,
              }}
            >
              {" "}
              {props.dataToPrint.patients.gender
                ? props.dataToPrint.patients.gender
                : "غير معرف"}
            </h2>
          </div>
        ) : (
          ""
        )}

        {props.medicalReportsStype.dateActive &&
          props.medicalReportsStype.dateAbsoulateActive ? (
          <div
            className={`flex gap-2 z-50 ${props.medicalReportsStype.dateAbsoulateActive ? "absolute" : ""
              }`}
            style={{
              top: `${props.medicalReportsStype.dateY}%`,
              left: `${props.medicalReportsStype.dateX}%`,
            }}
          >
            <h2
              className=" text-red-500 font-semibold z-50"
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
              className="font-semibold z-50"
              style={{
                fontSize: `${props.medicalReportsStype.dateSize}rem`,
                color: `${props.medicalReportsStype.dateColor}`,
              }}
            >
              {!props.dataToPrint.textonly
                ? new Date(
                  props.dataToPrint.prescription.createdAt
                ).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
                : ""}
            </h2>
          </div>
        ) : (
          ""
        )}

        {props.medicalReportsStype.weightActive &&
          props.medicalReportsStype.weightAbsoulateActive ? (
          <div
            className={`flex gap-2 z-50 ${props.medicalReportsStype.weightAbsoulateActive ? "absolute" : ""
              }`}
            style={{
              top: `${props.medicalReportsStype.weightY}%`,
              left: `${props.medicalReportsStype.weightX}%`,
            }}
          >
            <h2
              className=" text-red-500 font-semibold z-50"
              style={{
                fontSize: `${props.medicalReportsStype.weightSize}rem`,
                color: `${props.medicalReportsStype.weightMainTitleColor}`,
              }}
            >
              {props.medicalReportsStype.patientsTitleActive &&
                props.medicalReportsStype.weightMainTitleActive
                ? "الوزن : "
                : ""}
            </h2>
            <h2
              className="font-semibold z-50"
              style={{
                fontSize: `${props.medicalReportsStype.weightSize}rem`,
                color: `${props.medicalReportsStype.weightColor}`,
              }}
            >
              <div className="flex z-50">
                <div>Kg</div>
                <div>{props.dataToPrint.patients.weight}</div>
              </div>
            </h2>
          </div>
        ) : (
          ""
        )}

        <div
          className="  h-[96vh] flex flex-col z-1"
          style={{
            backgroundColor: `${props.medicalReportsStype.backgroundColor}`,
          }}
        >
          <div className="flex w-full z-50 flex-col justify-center items-center">
            <div
              style={{ height: `${props.medicalReportsStype.topPading}px` }}
            ></div>
            <div
              className={`font-black`}
              style={{
                marginBottom: `${props.medicalReportsStype.mainNameHeaderkniaMarginY}px`,
                zindex: 100,
                fontSize: `${props.medicalReportsStype.mainNameHeaderkniaSize}rem`,
                color: `${props.medicalReportsStype.mainNameHeaderkniaColor}`,
              }}
            >
              {props.medicalReportsStype.mainNameHeaderkniaActive ? (
                <>{props.medicalReportsStype.mainNameHeaderknia}</>
              ) : (
                ""
              )}
            </div>
            <div
              className={` font-black`}
              style={{
                marginBottom: `${props.medicalReportsStype.mainNameHeaderMarginY}px`,

                fontSize: `${props.medicalReportsStype.mainNameSize}rem`,
                color: `${props.medicalReportsStype.mainNameHeaderColor}`,
              }}
            >
              {props.medicalReportsStype.mainNameActive ? (
                <>{props.medicalReportsStype.mainNameHeader}</>
              ) : (
                ""
              )}
            </div>
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
                        marginBottom: `${medicalText.marginB}px`,
                        fontWeight: `${medicalText.textWeight}`,
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
                {middleText.map((medicalText, index) =>
                  medicalText.active ? (
                    <>
                      <p
                        style={{
                          marginBottom: `${medicalText.marginB}px`,
                          fontWeight: `${medicalText.textWeight}`,
                          fontSize: `${medicalText.size}rem`,
                          color: `${medicalText.Color}`,
                        }}
                      >
                        {medicalText.text}
                      </p>
                    </>
                  ) : (
                    ""
                  )
                )}
              </div>
              <div className=" text-left">
                {leftText.map((medicalText, index) => (
                  <>
                    <p
                      style={{
                        marginBottom: `${medicalText.marginB}px`,
                        fontWeight: `${medicalText.textWeight}`,
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
          <div className="flex z-50 justify-around items-center my-2 ">
            {props.medicalReportsStype.nameActive &&
              !props.medicalReportsStype.nameAbsoulateActive ? (
              <div
                className={`flex gap-2 ${props.medicalReportsStype.nameAbsoulateActive
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
            {props.medicalReportsStype.ageActive &&
              !props.medicalReportsStype.ageAbsoulateActive ? (
              <div
                className={`flex gap-2 z-50 ${props.medicalReportsStype.ageAbsoulateActive ? "absolute" : ""
                  }`}
                style={{
                  top: `${props.medicalReportsStype.ageY}px`,
                  left: `${props.medicalReportsStype.ageX}px`,
                }}
              >
                <h2
                  className=" text-red-500 font-semibold z-50"
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
                  className="font-semibold z-50"
                  style={{
                    fontSize: `${props.medicalReportsStype.ageSize}rem`,
                    color: `${props.medicalReportsStype.ageColor}`,
                  }}
                >
                  {" "}
                  {props.dataToPrint.patients.age > 0
                    ? props.dataToPrint.patients.age
                    : props.dataToPrint.patients.monthAge >= 2
                      ? props.dataToPrint.patients.monthAge + " شهر "
                      : props.dataToPrint.patients.monthAge &&
                        props.dataToPrint.patients.monthAge < 2
                        ? props.dataToPrint.patients.monthAge * 30 +
                        props.dataToPrint.patients.dayAge +
                        " يوم "
                        : props.dataToPrint.patients.dayAge
                          ? props.dataToPrint.patients.dayAge + " يوم "
                          : "غير معرف"}
                </h2>
              </div>
            ) : (
              ""
            )}
            {props.medicalReportsStype.dateActive &&
              !props.medicalReportsStype.dateAbsoulateActive ? (
              <div
                className={`flex gap-2 ${props.medicalReportsStype.dateAbsoulateActive
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
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    : ""}
                </h2>
              </div>
            ) : (
              ""
            )}
            {props.medicalReportsStype.weightActive &&
              !props.medicalReportsStype.weightAbsoulateActive ? (
              <div
                className={`flex gap-2 ${props.medicalReportsStype.weightAbsoulateActive
                  ? "absolute"
                  : ""
                  }`}
                style={{
                  top: `${props.medicalReportsStype.weightY}%`,
                  left: `${props.medicalReportsStype.weightX}%`,
                }}
              >
                <h2
                  className=" text-red-500 font-semibold"
                  style={{
                    fontSize: `${props.medicalReportsStype.weightSize}rem`,
                    color: `${props.medicalReportsStype.weightMainTitleColor}`,
                  }}
                >
                  {props.medicalReportsStype.patientsTitleActive &&
                    props.medicalReportsStype.weightMainTitleActive
                    ? "الوزن : "
                    : ""}
                </h2>
                <h2
                  className="font-semibold"
                  style={{
                    fontSize: `${props.medicalReportsStype.weightSize}rem`,
                    color: `${props.medicalReportsStype.weightColor}`,
                  }}
                >
                  <div className="flex">
                    <div>Kg</div>
                    <div>{props.dataToPrint.patients.weight}</div>
                  </div>
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

          <div className=" w-full z-50 h-1/2  ">
            <div class="z-50 ">
              <table class="w-full z-50 text-sm  text-center  ">
                {!props.dataToPrint.textonly ? (
                  <thead class="text-xs text-center uppercase   ">
                    {props.medicalReportsStype.tableHeaderActive ? (
                      <tr>
                        {/* {props.medicalReportsStype.col6Active ? (
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
                        )} */}

                        {props.medicalReportsStype.col5Active ? (
                          <th
                            className="text-center "
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
                ) : props.dataToPrint.type != "Lab" ? (
                  <div className="text-center text-2xl">
                    <p
                      style={{
                        fontSize: `${props.medicalReportsStype.tableHeaderTextSize}rem`,
                        color: `${props.medicalReportsStype.tableHeaderColor}`,
                      }}
                    >
                      {props.medicalReportsStype.reportHeaderName}
                    </p>
                  </div>
                ) : (
                  ""
                )}

                {!props.dataToPrint.textonly ? (
                  <tbody>
                    {props.dataToPrint.prescription.pharmaceutical ? (
                      <>
                        {props.dataToPrint.prescription.pharmaceutical.map(
                          (drug, index) => (
                            <>
                              <tr
                                className={`text-center my-20 ${index % 2 !== 1 ? "bg-gray-100" : ""
                                  }`}
                              >
                                {props.medicalReportsStype.col5Active ? (
                                  <td
                                    class="px-3 py-3 text-center "
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
                                    class="px-3 py-3  text-left"
                                    style={{
                                      fontSize: `${props.medicalReportsStype.tableContentTextSize}rem`,
                                      color: `${props.medicalReportsStype.tableContentColor}`,
                                    }}
                                  >
                                    <div className="flex justify-end">
                                      {drug.id.tradeName ? (
                                        <div className=" text-red-500"> ({drug.id.tradeName})</div>
                                      ) : (
                                        ""
                                      )}
                                      <div> {drug.id.name} </div>
                                    </div>
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

                              {props.medicalReportsStype.col6Active ? (
                                <div>
                                
                                    <div className="w-full text-black font-normal text-base">
                                      {drug.description}
                                    </div>


                                </div>
                              ) : (
                                ""
                              )}

                            </>
                          )
                        )}

                      </>
                    ) : (
                      ""
                    )}
                  </tbody>
                ) : (
                  <div
                    className="p-editor-content ql-container ql-snow"
                    style={{
                      border: "none",
                      borderColor: "#000",
                      direction: "ltr",
                    }}
                  >
                    <div
                      className="ql-editor"
                      dangerouslySetInnerHTML={{
                        __html: props.dataToPrint.data,
                      }}
                    ></div>
                  </div>
                )}
              </table>
            </div>
          </div>

          <div className=" w-full z-50 absolute bottom-0 ">
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
