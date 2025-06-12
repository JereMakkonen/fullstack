interface Result {
  totalDays: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  description: string;
};

interface ExerciseValues { 
  target: number; 
  hours: number[];
};

interface RatingValues {
  rating: number;
  description: string;
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.slice(2).some(arg => isNaN(Number(arg))))
    throw new Error("Provided values were not numbers!");

  return {
    target: Number(args[2]),
    hours: args.slice(3).map((arg) => Number(arg))
  };
};

const getRating = (average: number, target: number): RatingValues => {
  if (average < target * 0.5) return { rating: 1, description: "You suck!" };
  if (average < target) return { rating: 2, description: "Could be better..." };
  return { rating: 3, description: "Nice!" };
};

const calculateExercises = (hours: number[], target: number): Result => {
  const totalDays = hours.length;
  const trainingDays = hours.filter(h => h > 0).length;
  const sumHours = hours.reduce((a, b) => a + b, 0);
  const average = sumHours / totalDays;
  const success = average >= target;
  const { rating, description } = getRating(average, target);

  return {
    totalDays,
    trainingDays,
    success,
    rating,
    description,
    target,
    average,
  };
};

if (require.main === module) {
  try {
    const { target, hours } = parseArguments(process.argv);
    console.log(calculateExercises(hours, target));
  } catch (error: unknown) {
    if (error instanceof Error) 
      console.log(error.message);
  }
}

export default calculateExercises;
