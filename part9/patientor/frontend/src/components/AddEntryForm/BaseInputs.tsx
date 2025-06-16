import { Diagnosis, BaseEntryValues } from "../../types";
import { 
  MenuItem, Select, InputLabel, FormControl, OutlinedInput, TextField 
} from "@mui/material";

interface Props {
  diagnoses: Diagnosis[];
  entry: BaseEntryValues;
  setEntry: React.Dispatch<React.SetStateAction<BaseEntryValues>>;
}

const BaseInputs = ({ diagnoses, entry, setEntry }: Props) => (
  <div>
    <TextField
      label="Description"
      fullWidth
      margin="dense"
      size="small"
      value={entry.description}
      onChange={e => setEntry({ ...entry, description: e.target.value })}
    />
    <TextField
      label="Date"
      type="date"
      fullWidth
      margin="dense"
      size="small"
      value={entry.date}
      onChange={e => setEntry({ ...entry, date: e.target.value })}
      InputLabelProps={{ shrink: true }}
    />
    <TextField
      label="Specialist"
      fullWidth
      margin="dense"
      size="small"
      value={entry.specialist}
      onChange={e => setEntry({ ...entry, specialist: e.target.value })}
    />
    <FormControl fullWidth margin="dense" size="small">
      <InputLabel>Diagnoses</InputLabel>
      <Select
        multiple
        input={<OutlinedInput label="Diagnoses" />}
        value={entry.diagnosisCodes}
        onChange={e => setEntry({ ...entry, diagnosisCodes: e.target.value as string[]})}
      >
        {diagnoses.map(({ code }) => (
          <MenuItem key={code} value={code}> {code} </MenuItem>
        ))}
      </Select>
    </FormControl>
  </div>
);

export default BaseInputs;