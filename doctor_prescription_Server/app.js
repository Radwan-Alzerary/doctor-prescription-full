const express = require("express");
const path = require("path");

const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");
const app = express();
const port = process.env.PORT || 5000;
app.use(compression());
app.use(morgan("dev"));

require("dotenv").config();
require("./config/database");
require('./config/database');
require('./model/user');

const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
// const Visitor = require('./models/visitor');

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const Intaketime = require("./model/intaketime");
const ConstantDiseases = require("./model/constantDiseases");
const MedicalReportsStype = require("./model/medicalReportsStype"); // Make sure to adjust the path as needed
const socket = require("socket.io");

//use flash
app.use(flash());
const corsOptions = {
  origin: "http://localhost:3000", // notice origin won´t work as any (*) from that point
  credentials: true,
  "Access-Control-Allow-Credentials": true
};


app.use(cors(corsOptions));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(require("./routes"));

Intaketime.countDocuments()
  .then((count) => {
    if (count === 0) {
      // Create default documents
      const defaultPaymentType1 = new Intaketime({
        name: "قبل الاكل",
      });
      const defaultPaymentType2 = new Intaketime({
        name: "بعد الاكل",
      });
      const defaultPaymentType3 = new Intaketime({
        name: "خلال الاكل",
      });
      const defaultPaymentType4 = new Intaketime({
        name: "اخرى",
      });

      // Save the default documents to the database
      defaultPaymentType1
        .save()
        .then(() => {
          console.log("Default defaultPaymentType 1 created.");
        })
        .catch((err) => {
          console.error("Error creating defaultPaymentType Storge 1:", err);
        });

      defaultPaymentType2
        .save()
        .then(() => {
          console.log("Default defaultPaymentType 2 created.");
        })
        .catch((err) => {
          console.error("Error creating defaultPaymentType Storge 2:", err);
        });
      defaultPaymentType3
        .save()
        .then(() => {
          console.log("Default defaultPaymentType 2 created.");
        })
        .catch((err) => {
          console.error("Error creating defaultPaymentType Storge 2:", err);
        });
      defaultPaymentType4
        .save()
        .then(() => {
          console.log("Default defaultPaymentType 2 created.");
        })
        .catch((err) => {
          console.error("Error creating defaultPaymentType Storge 2:", err);
        });
    }
  })
  .catch((err) => {
    console.error("Error checking Storge collection:", err);
  });

ConstantDiseases.countDocuments()
  .then((count) => {
    if (count === 0) {
      // Create default documents
      const defaultconstantDiseasesType1 = new ConstantDiseases({
        name: "مرض مزمن",
      });
      const defaultconstantDiseasesType2 = new ConstantDiseases({
        name: "حمل",
      });
      ConstantDiseases;
      const defaultconstantDiseasesType3 = new ConstantDiseases({
        name: "سكري",
      });
      const defaultconstantDiseasesType4 = new ConstantDiseases({
        name: "مرض الضغط",
      });

      // Save the default documents to the database
      defaultconstantDiseasesType1
        .save()
        .then(() => {
          console.log("Default defaultPaymentType 1 created.");
        })
        .catch((err) => {
          console.error("Error creating defaultPaymentType Storge 1:", err);
        });

      defaultconstantDiseasesType2
        .save()
        .then(() => {
          console.log("Default defaultPaymentType 2 created.");
        })
        .catch((err) => {
          console.error("Error creating defaultPaymentType Storge 2:", err);
        });
      defaultconstantDiseasesType3
        .save()
        .then(() => {
          console.log("Default defaultPaymentType 2 created.");
        })
        .catch((err) => {
          console.error("Error creating defaultPaymentType Storge 2:", err);
        });
      defaultconstantDiseasesType4
        .save()
        .then(() => {
          console.log("Default defaultPaymentType 2 created.");
        })
        .catch((err) => {
          console.error("Error creating defaultPaymentType Storge 2:", err);
        });
    }
  })
  .catch((err) => {
    console.error("Error checking Storge collection:", err);
  });

  MedicalReportsStype.countDocuments()
  .then((count) => {
    if (count === 0) {
      // Create default documents
      const medicalReportsStype = new MedicalReportsStype({name:"prescriptionReports"});

      // Save the default documents to the database
      medicalReportsStype
        .save()
        .then(() => {
          console.log("Default defaultPaymentType 1 created.");
        })
        .catch((err) => {
          console.error("Error creating defaultPaymentType Storge 1:", err);
        });
    }
  })
  .catch((err) => {
    console.error("Error checking Storge collection:", err);
  });

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const io = socket(server,{
  cors: {
      origin: "http://localhost:3000",
      credentials: true,
  },
});
//store all online users inside this map
global.onlineUsers =  new Map();

io.on("connection",(socket)=>{
  global.chatSocket = socket;
  socket.on("add-user",(userId)=>{
      onlineUsers.set(userId,socket.id);
  });

  socket.on("send-msg",(data)=>{
      const sendUserSocket = onlineUsers.get(data.to);
      if(sendUserSocket) {
          socket.to(sendUserSocket).emit("msg-recieved",data.message);
      }
  });
});