import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { Patient, Diagnosis } from "./types";
import patientService from "./services/patients";
import diagnoseService from "./services/diagnoses";
import PatientListPage from "./components/PatientListPage";
import PatientInfo from "./components/PatientInfoPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    patientService.getAll()
      .then(patients => setPatients(patients))
      .catch(error => console.log(error));
      
    diagnoseService.getAll()
      .then(diagnoses => setDiagnoses(diagnoses))
      .catch(error => console.log(error));
  }, []);


  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<PatientInfo diagnoses={diagnoses}/>} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
