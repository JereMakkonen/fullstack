import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { NewEntrySchema, NewPatientSchema } from './schema';

export const newEntryParser = (
  req: Request, _res: Response, next: NextFunction
) => {
  try {
    req.body = NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const newPatientParser = (
  req: Request, _res: Response, next: NextFunction
) => {
  try {
    req.body = NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const errorMiddleware = (
  error: unknown, _req: Request, res: Response, next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).json({ error: error.issues });
  } else {
    next(error);
  }
};
