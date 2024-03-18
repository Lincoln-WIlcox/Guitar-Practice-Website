import { switchOrderWithExerciseAbove, switchOrderWithExerciseBelow } from "../../services/userExerciseService"


const SortButtons = ({ userExercise, onUserExerciseSorted }) =>
{

    return <div className="flex flex-col">
        <button onClick={
            () => 
            {
                switchOrderWithExerciseAbove(userExercise).then(onUserExerciseSorted)
            }
        }
        >move up</button>
        <button onClick={
            () => 
            {
                switchOrderWithExerciseBelow(userExercise).then(onUserExerciseSorted)
            }
        }
        >move down</button>
    </div>
}

export default SortButtons