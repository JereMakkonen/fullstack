import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (!weight || !height)
    return res.status(400).json({error: 'malformatted parameters'});
  
  const bmi = calculateBmi(Number(height), Number(weight));
  return res.json({weight, height, bmi});
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as { daily_exercises: number[], target: number };

  if (!daily_exercises || !target) 
    return res.status(400).json({error: 'parameters missing'});
  if (daily_exercises.some(e => isNaN(Number(e))) || isNaN(Number(target))) 
    return res.status(400).json({error: 'malformatted parameters'});
  
  return res.json(calculateExercises(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});