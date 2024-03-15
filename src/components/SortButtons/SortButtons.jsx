import { switchOrderWithExerciseAbove, switchOrderWithExerciseBelow } from "../../services/userExerciseService"


const SortButtons = ({ userExercise }) =>
{

    return <div className="flex flex-col">
        <button onClick={
            () => { switchOrderWithExerciseAbove(userExercise) }
        }
        >move up</button>
        <button onClick={
            () => { switchOrderWithExerciseBelow(userExercise) }
        }
        >move down</button>
    </div>
}

export default SortButtons