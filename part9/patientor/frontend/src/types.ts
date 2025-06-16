export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export interface BaseEntryValues {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string[];
}

export interface SpecialEntryValues {
  rating: number;
  employer: string;
  discharge: { date: string, criteria: string };
  sickLeave: { startDate: string, endDate: string };
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export type Entry = HospitalEntry | OccupationalEntry | HealthCheckEntry;

export type EntryWithoutId =
  | Omit<HospitalEntry, 'id'>
  | Omit<OccupationalEntry, 'id'>
  | Omit<HealthCheckEntry, 'id'>;

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

interface OccupationalEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

interface Discharge {
  date: string;
  criteria: string;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}
