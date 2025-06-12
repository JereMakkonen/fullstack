import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { Gender } from './types';

export const NewPatientSchema = z.object({
  name: z.string().nonempty(),
  dateOfBirth: z.string().date(),
  ssn: z.string().nonempty(),
  gender: z.nativeEnum(Gender),
  occupation: z.string().nonempty(),
});

export const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const errorMiddleware = (
  error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).json({ error: error.issues });
  } else {
    next(error);
  }
};