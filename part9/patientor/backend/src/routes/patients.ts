import express, { Request, Response } from 'express';
import patientService from '../services/patientService';
import { newPatientParser, errorMiddleware } from '../utils';
import { Patient, NewPatientEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getEntries());
});

router.post('/', newPatientParser, (
  req: Request<unknown, unknown, NewPatientEntry>, 
  res: Response<Patient>
): void => {
  const newPatient = patientService.addEntry(req.body);
  res.json(newPatient);
});

router.use(errorMiddleware);

export default router;
