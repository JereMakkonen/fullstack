import patients from '../../data/patients';
import { NonSensitivePatient, NewPatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid';

export const getEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => 
    ({ id, name, dateOfBirth, gender, occupation }));
};

const addEntry = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries, addEntry
};