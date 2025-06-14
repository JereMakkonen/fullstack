interface CourseBase {
  name: string;
  exerciseCount: number;
}

interface CourseDescription extends CourseBase {
  description: string;
}

interface CoursePartBasic extends CourseDescription {
  kind: 'basic';
}

interface CoursePartGroup extends CourseBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CourseDescription {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartReq extends CourseDescription {
  requirements: string[];
  kind: 'special';
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartReq;


const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part = ({ part }: { part: CoursePart }) => {

  const partContent = () => {
    switch(part.kind) {
      case('basic'): return <p>{part.description}</p>;
      case('group'): return <p>Project count: {part.groupProjectCount}</p>;
      case('background'): return (
        <div>
          <p>{part.description}</p>
          <p>Background material: {part.backgroundMaterial}</p>
        </div>
      );
      case('special'): return (
        <div>
          <p>{part.description}</p>
          <p>Required skills: {part.requirements.join(', ')}</p>
        </div>
      );
      default: assertNever(part);
    }
  };
  
  return (
    <div>
      <h3>{part.name} {part.exerciseCount}</h3>
      {partContent()}
    </div>
  );
};

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      {parts.map(part => (<div key={part.name}> <Part part={part} /></div>))}
    </div>
  );
};

const Header = ({ course }: { course: string }) => {
  return <h1>{course}</h1>;
};

const Total = ({ total }: { total: number }) => {
  return <b>Total number of exercises: {total}</b>;
};

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
      kind: 'basic'
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: 'group'
    },
    {
      name: 'Basics of type Narrowing',
      exerciseCount: 7,
      description: 'How to go from unknown to string',
      kind: 'basic'
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      backgroundMaterial: 'https://type-level-typescript.com/template-literal-types',
      kind: 'background'
    },
    {
      name: 'TypeScript in frontend',
      exerciseCount: 10,
      description: 'a hard part',
      kind: 'basic',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      kind: 'special'
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header course={courseName} />
      <Content parts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;