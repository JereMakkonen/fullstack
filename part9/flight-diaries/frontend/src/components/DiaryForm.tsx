import axios from 'axios';
import { useState, Dispatch, SetStateAction } from 'react';
import { addDiaryEntry } from '../diaryService';
import { Weather, Visibility, DiaryEntry } from '../types';

type DiaryFormProps = {
  setDiaries: Dispatch<SetStateAction<DiaryEntry[]>>;
};

const DiaryForm = ({ setDiaries }: DiaryFormProps) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const diary = await addDiaryEntry({
        date: date, 
        weather: weather, 
        visibility: visibility, 
        comment: comment,
      });
      setDiaries(prev => [...prev, diary]);
      setError('');
      setComment('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data || 'Something went wrong');
      } else {
        console.log(error);
      }
    };
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <b>Date: </b>
          <input 
            id="date" 
            type="date" 
            required 
            value={date} 
            onChange={e => setDate(e.target.value)} 
          />
        </div>
          <b>Weather: </b>
          {Object.values(Weather).map(wthr => (
            <label key={wthr} style={{ marginRight: '0.5rem' }}>{wthr}
              <input
                type="radio"
                name="weather"
                value={wthr}
                checked={weather === wthr}
                required
                onChange={() => setWeather(wthr as Weather)}
              />
            </label>
          ))}
        <div>
          <b>Visibility: </b>
          {Object.values(Visibility).map(vis => (
            <label key={vis} style={{ marginRight: '0.5rem' }}>{vis}
              <input
                type="radio"
                name="visibility"
                value={vis}
                checked={visibility === vis}
                required
                onChange={() => setVisibility(vis as Visibility)}
              />
            </label>
          ))}
        </div>
        <div>
          <b>Comment: </b>
          <input 
            id="comment" 
            type="text" 
            value={comment}
            required
            onChange={e => setComment(e.target.value)} 
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default DiaryForm;
