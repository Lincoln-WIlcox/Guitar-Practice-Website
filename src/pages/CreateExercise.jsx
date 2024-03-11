import { useEffect, useState } from "react"
import SkillSelect from "../components/SkillSelect/SkillSelect"
import "./CreateExercise.css"
import { getSkills } from "../services/skillsService"
import { addExercise } from "../services/exerciseServices"
import { useNavigate } from "react-router-dom"

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
        setTitle(event.target.value)
    }

    const onDescriptionChanged = (event) =>
    {
        setDescription(event.target.value)
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
        <input className="bg-gray-900" type="text" placeholder="Exercise Title" onChange={onExerciseTitleChanged} />
        <input className="bg-gray-900" type="text" placeholder="Exercise Description" onChange={onDescriptionChanged} />
        <SkillSelect selectedSkill={skill} skills={allSkills} onSkillSelected={onSkillSelected} />
        <button onClick={onSubmitClicked}>Submit</button>
    </div>

}

export default CreateExercise