import { useEffect, useState } from "react"
import ExerciseFields from "../components/ExerciseFields/ExerciseFields"
import { useNavigate, useParams } from "react-router-dom"
import { changeExercise, getExerciseById } from "../services/exerciseServices"

const currentUser = {id: 1}

const EditExercise = () =>
{
    const [thisExercise, setThisExercise] = useState({})
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [skill, setSkill] = useState(0)
    const [allSkills, setAllSkills] = useState([])

    const { exerciseId } = useParams()
    const navigate = useNavigate()

    useEffect(
        () =>
        {
            getExerciseById(exerciseId).then(
                (gottenExercise) =>
                {
                    setThisExercise(gottenExercise)
                }
            )
        }, []
    )

    useEffect(
        () =>
        {
            setTitle(thisExercise.name)
            setDescription(thisExercise.description)
            setSkill(thisExercise.skillId)
        }, [thisExercise]
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

            changeExercise(exercise).then(
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
        return title !== "" && title !== undefined && description !== "" && description !== undefined && skill !== 0 && skill !== undefined
    }

    return <div>
        <ExerciseFields skills={allSkills} skill={skill} title={title} description={description} onExerciseTitleChanged={setTitle} onDescriptionChanged={setDescription} onSkillSelected={setSkill} onSubmitClicked={onSubmitClicked} />
    </div>
}

export default EditExercise