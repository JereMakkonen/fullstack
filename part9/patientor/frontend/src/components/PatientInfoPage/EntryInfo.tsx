import { Entry } from "../../types";
import HealthRatingBar from "../HealthRatingBar";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";

const assertNever = (value: never): never => {
  throw new Error(`Error: ${JSON.stringify(value)}`);
};

const EntryInfo = ({ entry }: { entry: Entry }) => {
  const entryTypeStyle = { 
    display: "flex", 
    alignItems: "center", 
    gap: "0.2rem" 
  };

  switch(entry.type) {
    case("HealthCheck"): return (
      <>
        <div style={entryTypeStyle}>
          Entry Type: Health Check<MedicalServicesIcon />
        </div>
        <HealthRatingBar rating={entry.healthCheckRating} showText={true}/>
      </>
    );
    case("Hospital"): return (
      <>
        <div style={entryTypeStyle}>
          Entry Type: Hospital <LocalHospitalIcon />
        </div>
        Discharge criteria: {entry.discharge.criteria}
      </>
    );
    case("OccupationalHealthcare"): return (
      <>
        <div style={entryTypeStyle}>
          Entry Type: Occupational Healthcare <WorkIcon />
        </div>
        Employer: {entry.employerName}
      </>
    );
    default: assertNever(entry);
  }
};

export default EntryInfo;