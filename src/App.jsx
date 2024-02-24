import { useState } from "react";
import { initialWorkouts, generateWorkout } from "./Workouts.js";
import "./App.css";
import { render } from "react-dom";

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts);

  const [workoutsDone, setWorkoutsDone] = useState(false);

  const addNewWorkout = () => {
    const newWorkout = generateWorkout();
    console.log("addNewWorkout:", newWorkout);

    setWorkouts([
      ...workouts,
      {
        id:
          workouts.length == 0 ? 1 : Math.max(...workouts.map((o) => o.id + 1)),
        exercise: newWorkout.exercise,
        reps: newWorkout.reps,
        sets: newWorkout.sets,
        rest: newWorkout.rest,
        done: newWorkout.done,
      },
    ]);
  };

  const deleteWorkout = (workout) => {
    console.log("deleteWorkout:", workout);
    const _filteredWorkouts = workouts.filter((w) => w.id !== workout.id);
    setWorkouts([..._filteredWorkouts]);
  };

  const completeWorkout = (workout) => {
    console.log("completeWorkout:", workout);
    let _workouts = [...workouts];
    let _workout = _workouts.find((w) => w.id == workout.id);
    _workout.done = !_workout.done;
    setWorkouts(_workouts);
  };

  const regenerateWorkout = (workout) => {
    console.log(workout);
    const newWorkout = generateWorkout();
    let _workouts = [...workouts];
    let _workout = _workouts.find((w) => w.id == workout.id);
    _workout.done = false;
    _workout.exercise = newWorkout.exercise;
    _workout.reps = newWorkout.reps;
    _workout.sets = newWorkout.sets;
    _workout.rest = newWorkout.rest;
    _workout.done = false;
    setWorkouts(_workouts);
  };
  const filterProducts = (e) => {
    setWorkoutsDone(!workoutsDone);
  };
  const filterWorkouts = (workout, index) => {
    if (workoutsDone === true) {
      if (workout.done == true) {
        return renderWorkout(workout, index);
      }
    } else {
      return renderWorkout(workout, index);
    }
  };
  const renderWorkout = (workout, index) => {
    return (
      <>
        <p>
          {workout.sets}x sets of{" "}
          <strong>
            {workout.reps}x{workout.exercise}
          </strong>{" "}
          with {workout.rest} seconds rest
        </p>
        {!workout.done && (
          <button onClick={(e) => completeWorkout(workout)}>Done</button>
        )}
        {workout.done && (
          <p>
            ✅{" "}
            <a
              onClick={(e) => regenerateWorkout(workout)}
              title="Regenerate new workout here.."
            >
              💪
            </a>
          </p>
        )}
        <button onClick={(e) => deleteWorkout(workout)}>Delete</button>
      </>
    );
  };

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      &nbsp;| Show Completed{" "}
      <input
        type="checkbox"
        id="topping"
        name="topping"
        value="Paneer"
        checked={workoutsDone}
        onChange={filterProducts}
      />
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>{filterWorkouts(workout, index)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
