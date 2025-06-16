import patients from '../../data/patients';
import { 
  NonSensitiveEntry, NewPatientEntry, Patient, EntryWithoutId, Entry
} from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): NonSensitiveEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => 
    ({ id, name, dateOfBirth, gender, occupation }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = { ...entry, id: uuid() };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: EntryWithoutId): Entry | undefined => {
  const patient = patients.find(p => p.id === id);
  if (!patient) return undefined;
  const newEntry = { ...entry, id: uuid() };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients, getPatientById, addPatient, addEntry
};
