import express, { Request, Response } from 'express';
import patientService from '../services/patientService';
import { newPatientParser, errorMiddleware, newEntryParser } from '../middleware';
import { Patient, NewPatientEntry, Entry, EntryWithoutId } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);
  if (patient) res.json(patient);
  else res.status(404).send('Invalid id');
});

router.post('/', newPatientParser, (
  req: Request<unknown, unknown, NewPatientEntry>, 
  res: Response<Patient>
) => {
  const newPatient = patientService.addPatient(req.body);
  res.json(newPatient);
});

router.post('/:id/entries', newEntryParser, (
  req: Request<{ id: string }, unknown, EntryWithoutId>,
  res: Response<Entry | string>
) => {
  const entry = patientService.addEntry(req.params.id, req.body);
  if (entry) res.json(entry);
  else  res.status(404).send('Invalid id');
});

router.use(errorMiddleware);

export default router;
