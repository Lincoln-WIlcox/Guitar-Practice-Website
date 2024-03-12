import { useState } from "react"
import ExerciseFields from "../components/ExerciseFields/ExerciseFields"

const EditExercise = () =>
{
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [skill, setSkill] = useState(0)
    const [allSkills, setAllSkills] = useState([])

    const onSkillSelected = (newSkill) =>
    {

    }

    const onSubmitClicked = () =>
    {

    }

    return <div>
        <ExerciseFields skills={allSkills} selectedSkill={skill} onExerciseTitleChanged={setTitle} onDescriptionChanged={setDescription} onSkillSelected={onSkillSelected} onSubmitClicked={onSubmitClicked} />
    </div>
}

export default EditExercise