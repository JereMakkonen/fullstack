import { DiaryEntry } from '../types';

const DiaryList = ({ diaries }: { diaries: DiaryEntry[] }) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map(diary => 
        <li key={diary.id} style={{ listStyle: 'none', marginTop: '2rem' }}>
          <b>Date: {diary.date}</b>
          <p>Weather: {diary.weather}</p>
          <p>Visibility: {diary.visibility}</p>
          <p>Comment: {diary.comment}</p>
        </li> 
      )}
    </div>
  );
};

export default DiaryList;
