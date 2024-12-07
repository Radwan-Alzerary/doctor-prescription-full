const mongoose = require("mongoose");
const AutoComplteSchema = new mongoose.Schema(
  {
    fumbling: [{ type: String }],
    medicalDiagnosis: [{ type: String }],
    currentMedicalHistory: [{ type: String }],
    medicalHistory: [{ type: String }],
    previousSurgeries: [{ type: String }],
    familyHistory: [{ type: String }],
    fractures: [{ type: String }],
    pulseRate: [{ type: String }],
    spo2: [{ type: String }],
    temperature: [{ type: String }],
    bloodPressure: [{ type: String }],
    bloodSugar: [{ type: String }],
    ExaminationFindining: [{ type: String }],
    InvestigationFinding: [{ type: String }],
    rxMedicalDiagnosis: [{ type: String }],
    visitchiefComplaint: [{ type: String }],
    visitdiagnosis: [{ type: String }],

    visitChronicTherapy:[{type:String}],
    visitinvestigation:[{type:String}],
    visitPriorChronicTherapy: [{ type: String }],
    visitCauseOfVisite: [{ type: String }],
    visitManagement: [{ type: String }],
    visitAnalysis: [{ type: String }],
    visitRiskFactor: [{ type: String }],
    visitPastMedicalHistory: [{ type: String }],
    visitDrugHistory: [{ type: String }],
    visitSuspendedDx: [{ type: String }],


  },
  {
    timestamps: true,
  }
);
const AutoComplte = mongoose.model("AutoComplte", AutoComplteSchema);

module.exports = AutoComplte;
