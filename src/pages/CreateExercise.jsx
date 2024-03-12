import { useEffect, useState } from "react"
import "./CreateExercise.css"
import { getSkills } from "../services/skillsService"
import { addExercise } from "../services/exerciseServices"
import { useNavigate } from "react-router-dom"
import ExerciseFields from "../components/ExerciseFields/ExerciseFields"

const currentUser = { id: 1 }

const CreateExercise = () =>
{
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [skill, setSkill] = useState(0)
    const [allSkills, setAllSkills] = useState([])

    const navigate = useNavigate()

    useEffect(
        () =>
        {
            getSkills().then(
                (gottenSkills) =>
                {
                    setAllSkills(gottenSkills)
                }
            )
        }, []
    )

    const onExerciseTitleChanged = (event) =>
    {
        setTitle(event)
    }

    const onDescriptionChanged = (description) =>
    {
        setDescription(description)
    }

    const onSkillSelected = (newSkill) =>
    {
        setSkill(newSkill)
    }

    const onSubmitClicked = () =>
    {
        if(exerciseIsValid())
        {
            const exercise =
            {
                name: title,
                description: description,
                skillId: skill,
                userId: currentUser.id
            }

            addExercise(exercise).then(
                () =>
                {
                    navigate("/exercises")
                }
            )
        } else
        {
            window.alert("Invalid exercise.")
        }
    }

    const exerciseIsValid = () =>
    {
        return title !== "" && description !== "" && skill !== 0
    }

    return <div className="flex flex-col w-full items-center mt-10 space-y-5">
        <ExerciseFields skills={allSkills} selectedSkill={skill} onExerciseTitleChanged={onExerciseTitleChanged} onDescriptionChanged={setDescription} onSkillSelected={onSkillSelected} onSubmitClicked={onSubmitClicked} />
    </div>

}

export default CreateExercise