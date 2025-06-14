import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from './types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getDiaries = async () => {
  const result = await axios.get<DiaryEntry[]>(baseUrl);
  return result.data;
};

export const addDiaryEntry = async (diary: NewDiaryEntry) => {
  const result = await axios.post<DiaryEntry>(baseUrl, diary);
  return result.data;
};
