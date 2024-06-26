import { useEffect, useState } from "react"
import "./CreateExercise.css"
import { getSkills } from "../../services/skillsService"
import { addExercise } from "../../services/exerciseServices"
import { useNavigate } from "react-router-dom"
import ExerciseFields from "../../components/ExerciseFields/ExerciseFields"

const CreateExercise = ({currentUser}) =>
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

    return <div className="flex flex-col w-full items-center space-y-5">
        <ExerciseFields skills={allSkills} skill={skill} title={title} description={description} onExerciseTitleChanged={setTitle} onDescriptionChanged={setDescription} onSkillSelected={setSkill} onSubmitClicked={onSubmitClicked} />
    </div>

}

export default CreateExercise