import diagnoseData from '../../data/diagnoses';
import { Diagnose } from '../types';

const getEntries = (): Diagnose[] => {
  return diagnoseData;
};

export default {
  getEntries,
};
