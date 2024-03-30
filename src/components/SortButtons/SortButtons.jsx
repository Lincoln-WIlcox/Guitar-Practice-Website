import { switchOrderWithExerciseAbove, switchOrderWithExerciseBelow } from "../../services/userExerciseService"


const SortButtons = ({ userExercise, onUserExerciseSorted }) =>
{

    return <div className="flex flex-col items-end justify-start mt-3 h-full">
        <button className="flex justify-center items-center text-xl" onClick={
            () => 
            {
                switchOrderWithExerciseAbove(userExercise).then(onUserExerciseSorted)
            }
        }
        ><i className="fa fa-caret-up" /></button>
        <button className="flex justify-center items-center text-xl" onClick={
            () => 
            {
                switchOrderWithExerciseBelow(userExercise).then(onUserExerciseSorted)
            }
        }
        ><i className="fa fa-caret-down" /></button>
    </div>
}

export default SortButtons