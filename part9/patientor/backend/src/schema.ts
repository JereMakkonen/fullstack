import { z } from 'zod';
import { Gender, HealthCheckRating } from './types';

const BaseEntrySchema = z.object({
  description: z.string().min(2),
  date: z.string().date(),
  specialist: z.string().min(2),
  diagnosisCodes: z.array(z.string()).optional(),
}).strict();

const HealthCheckSchema = BaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
}).strict();

const HospitalSchema = BaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string().min(2),
  }),
}).strict();

const OccupationalSchema = BaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string().min(2),
  sickLeave: z.object({
    startDate: z.string().date(),
    endDate: z.string().date(),
  }).optional(),
}).strict();

export const NewEntrySchema = z.discriminatedUnion('type', [
  HealthCheckSchema,
  HospitalSchema,
  OccupationalSchema,
]);

export const NewPatientSchema = z.object({
  name: z.string().nonempty(),
  dateOfBirth: z.string().date(),
  ssn: z.string().nonempty(),
  gender: z.nativeEnum(Gender),
  occupation: z.string().nonempty(),
  entries: z.array(z.unknown()).default([]), 
}).strict();
