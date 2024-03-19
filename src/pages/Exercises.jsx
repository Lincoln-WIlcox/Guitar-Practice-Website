import ExercisesList from "../components/ExercisesList/ExercisesList"
import "./Exercises.css"
import { getExercises } from "../services/exerciseServices"
import CreateExerciseButton from "../components/CreateExerciseButton/CreateExerciseButton"
import { useEffect, useState } from "react"
import ExercisesFilters from "../components/ExercisesFilters/ExercisesFilters"

const Exercises = ({ currentUser }) =>
{
    const [exercises, setExercises] = useState([])
    const [skillFilter, setSkillFilter] = useState(0)
    const [showMyExercises, setShowMyExercises] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(
        () =>
        {
            getExercises().then(
                (gottenExercises) =>
                {
                    setExercises(gottenExercises)
                }
            )
        }, []
    )

    useEffect(
        () =>
        {
            getExercises().then(
                (gottenExercises) =>
                {
                    let tempExercises = gottenExercises

                    if(skillFilter != 0)
                    {
                        tempExercises = tempExercises.filter(exercise => exercise.skillId == skillFilter)
                    }

                    if(showMyExercises)
                    {
                        tempExercises = tempExercises.filter(exercise => exercise.userId == currentUser.id)
                    }

                    if(searchQuery != "")
                    {
                        tempExercises = tempExercises.filter(exercise => exercise.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    }

                    setExercises(tempExercises)
                }
            )
        }, [skillFilter, showMyExercises, searchQuery]
    )

    const onSkillSelected = (newSkill) =>
    {
        setSkillFilter(newSkill)
    }

    const onSearchQueryChanged = (searchQuery) =>
    {
        setSearchQuery(searchQuery)
    }

    const onShowMyExercisesChanged = (newShowMyExercises) =>
    {
        setShowMyExercises(newShowMyExercises)
    }

    return (
        <div className="">
            <div className="flex justify-center items-center flex-col">
                <ExercisesFilters onSkillSelected={onSkillSelected} onSearchQueryChanged={onSearchQueryChanged} onShowMyExercisesChanged={onShowMyExercisesChanged} />
                <CreateExerciseButton />
                <ExercisesList currentUser={currentUser} exercises={exercises} />
            </div>

        </div>
    )
}

export default Exercises