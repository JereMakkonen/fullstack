import { SpecialEntryValues } from "../../types";
import { MenuItem, Select, InputLabel, FormControl, TextField } from "@mui/material";

interface Props {
  type: string;
  values: SpecialEntryValues;
  setValues: React.Dispatch<React.SetStateAction<SpecialEntryValues>>;
}

const ExtraInputs = ({ type, values, setValues }: Props) => (
  <div>
    {type === "HealthCheck" &&
      <FormControl fullWidth margin="dense" size="small">
      <InputLabel>Health Rating</InputLabel>
        <Select 
          value={values.rating} 
          label="Health-rating" 
          onChange={e => setValues({...values, rating: Number(e.target.value) })}
        >
          <MenuItem value={0}> Healthy</MenuItem>
          <MenuItem value={1}> Low Risk</MenuItem>
          <MenuItem value={2}> High Risk</MenuItem>
          <MenuItem value={3}> Critical Risk</MenuItem>
        </Select>
      </FormControl>
    } {type === "Hospital" &&
      <>
        <TextField
          label="Discharge Criteria"
          fullWidth
          margin="dense"
          size="small"
          value={values.discharge.criteria}
          onChange={e => setValues({ ...values, 
            discharge: { ...values.discharge, criteria: e.target.value }
          })}/>
        <TextField
          label="Discharge Date"
          type="date"
          fullWidth
          margin="dense"
          size="small"
          InputLabelProps={{ shrink: true }}
          value={values.discharge.date}
          onChange={e => setValues({ ...values, 
            discharge: { ...values.discharge, date: e.target.value }
          })}/>
      </>
    } {type === "OccupationalHealthcare" &&
      <>
        <TextField
          label="Employer name"
          fullWidth
          margin="dense"
          size="small"
          value={values.employer}
          onChange={e => setValues({...values, employer: e.target.value })}
        />
        <TextField
          label="Sick Leave Start Date"
          type="date"
          fullWidth
          margin="dense"
          size="small"
          InputLabelProps={{ shrink: true }}
          value={values.sickLeave.startDate}
          onChange={e => setValues({ ...values, 
            sickLeave: { ...values.sickLeave, startDate: e.target.value }
          })}/>
        <TextField
          label="Sick Leave End Date"
          type="date"
          fullWidth
          margin="dense"
          size="small"
          InputLabelProps={{ shrink: true }}
          value={values.sickLeave.endDate}
          onChange={e => setValues({ ...values, 
            sickLeave: { ...values.sickLeave, endDate: e.target.value }
          })}/>
      </>
    }
  </div>
);

export default ExtraInputs;