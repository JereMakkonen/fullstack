import { useState, useEffect } from 'react';
import { getDiaries } from './diaryService';
import { DiaryEntry } from './types';
import DiaryList from './components/DiaryList';
import DiaryForm from './components/DiaryForm';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getDiaries().then(data => { 
      setDiaries(data); 
    });
  }, []);

  return (
    <div>
      <DiaryForm setDiaries={setDiaries} />
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App;
