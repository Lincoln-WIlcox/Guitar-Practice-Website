import { switchOrderWithExerciseAbove, switchOrderWithExerciseBelow } from "../../services/userExerciseService"


const SortButtons = ({ userExercise, onExerciseSorted }) =>
{

    return <div className="flex flex-col">
        <button onClick={
            () => 
            {
                switchOrderWithExerciseAbove(userExercise).then(onExerciseSorted)
            }
        }
        >move up</button>
        <button onClick={
            () => 
            {
                switchOrderWithExerciseBelow(userExercise).then(onExerciseSorted)
            }
        }
        >move down</button>
    </div>
}

export default SortButtons