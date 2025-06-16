import { Entry, Diagnosis } from "../../types";
import EntryInfo from "./EntryInfo";

interface Props {
  entries : Entry[],
  diagnoses: Diagnosis[],
}

const EntryList = ({ entries, diagnoses }: Props) => {
  const entryStyle = {
    border: "solid",
    borderWidth: "1px",
    padding: "0.5rem",
    marginTop: "0.5rem",
  };

  if (!entries.length) return null;

  return (
    <div>
      <h3>Entries</h3>
      {entries.map(entry =>
        <div key={entry.id} style={entryStyle}>
          <div>{entry.date} <EntryInfo entry={entry}/></div>
          <p style={{ fontStyle: "italic", marginTop: "0.5rem" }}>
            {entry.description}
          </p>
          <div style={{ marginTop: "1rem"}}>
            {entry.diagnosisCodes?.map(code => 
              <li key={code}> 
                {code}: {diagnoses.find(d => d.code === code)?.name}
              </li>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EntryList;
