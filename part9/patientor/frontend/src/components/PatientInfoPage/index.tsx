import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

import patientService from "../../services/patients";
import { Patient, Gender, Diagnosis  } from "../../types";
import EntryList from "./EntryList";
import AddEntryForm from "../AddEntryForm";

const PatientInfo = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const [patient, setPatient] = useState<Patient>();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      patientService.getPatient(id)
      .then(patient => setPatient(patient))
      .catch(error => console.log(error));
    }
  }, [id]);

  if (!patient) return <h3>Invalid ID</h3>;

  return (
    <div>
      <h2>
        {patient.name}
        {patient.gender === Gender.Male ? <MaleIcon /> : null}
        {patient.gender === Gender.Female ? <FemaleIcon /> : null}
      </h2>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <AddEntryForm diagnoses={diagnoses} patient={patient} setPatient={setPatient}/>
      <EntryList entries={patient.entries} diagnoses={diagnoses}/>
    </div>
  );
};

export default PatientInfo;
