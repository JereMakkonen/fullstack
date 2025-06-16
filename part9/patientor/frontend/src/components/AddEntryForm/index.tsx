import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

import patientService from "../../services/patients";
import { 
  Diagnosis, Patient, EntryWithoutId, BaseEntryValues, SpecialEntryValues
} from "../../types";

import Notification from "./Notification";
import BaseInputs from "./BaseInputs";
import ExtraInputs from "./ExtraInputs";

interface Props {
  diagnoses: Diagnosis[];
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
}

const AddEntryForm = ({ diagnoses, patient, setPatient }: Props) => {
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [type, setType] = useState("");
  const [baseValues, setBaseValues] = useState<BaseEntryValues>({
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],
  });
  const [extraValues, setExtraValues] = useState<SpecialEntryValues>({
    rating: 0,
    employer: "",
    discharge: { date: "", criteria: "" },
    sickLeave: { startDate: "", endDate: "" },
  });
  
  const { id } = useParams();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    const sickLeaveValid = extraValues.sickLeave.startDate && extraValues.sickLeave.endDate;
    let newEntry: EntryWithoutId;

    switch (type) {
      case "HealthCheck":
        newEntry = { ...baseValues, type: type, healthCheckRating: extraValues.rating };
        break;
      case "Hospital":
        newEntry = { ...baseValues, type: type, discharge: extraValues.discharge };
        break;
      case "OccupationalHealthcare":
        newEntry = { ...baseValues, type: type, employerName: extraValues.employer,
          sickLeave: sickLeaveValid ? extraValues.sickLeave : undefined,
        };
        break;
      default:
        setErrorMessage("Invalid entry type");
        return;
    }

    patientService.addEntry(id, newEntry)
    .then(entry => {
      setPatient({ ...patient, entries: patient.entries.concat(entry)});
      setBaseValues({
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
      });
      setExtraValues({
        rating: 0,
        employer: "",
        discharge: { date: "", criteria: "" },
        sickLeave: { startDate: "", endDate: "" },
      });
    })
    .catch(e => {
      if (e?.response?.data?.error[0]?.path[0]) {
        setErrorMessage(`Inavlid input: ${e.response.data.error[0].path[0]}`);
      } else {
        setErrorMessage("Unknown error");
      }
    });
  };

  return (
    <Box sx={{ maxWidth: "25rem" }}>
      <Notification message={errorMessage} setMessage={setErrorMessage} />
      {!visible && (
        <Button variant="contained" onClick={() => setVisible(true)}>
          Add Entry
        </Button>
      )}
      {visible && (
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth margin="dense" size="small">
            <InputLabel>Entry Type</InputLabel>
            <Select 
              value={type} 
              label="Entry Type" 
              onChange={e => setType(e.target.value)}
            >
              <MenuItem value="HealthCheck">Health Check</MenuItem>
              <MenuItem value="Hospital">Hospital</MenuItem>
              <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
            </Select>
          </FormControl>
          <BaseInputs diagnoses={diagnoses} entry={baseValues} setEntry={setBaseValues} />
          <ExtraInputs type={type} values={extraValues} setValues={setExtraValues} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="contained" color="error" onClick={() => setVisible(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AddEntryForm;