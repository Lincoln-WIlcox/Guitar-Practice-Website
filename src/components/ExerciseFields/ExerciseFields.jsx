import SkillSelect from "../SkillSelect/SkillSelect"
import "./ExerciseFields.css"

const ExerciseFields = ({ skills, selectedSkill, onExerciseTitleChanged, onDescriptionChanged, onSkillSelected, onSubmitClicked }) =>
{

    const onTitleInputChanged = (event) =>
    {
        onExerciseTitleChanged(event.target.value)
    }

    const onDescriptionInputChanged = (event) =>
    {
        onDescriptionChanged(event.target.value)
    }

    return <div>
        <input className="bg-gray-900" type="text" placeholder="Exercise Title" onChange={onTitleInputChanged} />
        <input className="bg-gray-900" type="text" placeholder="Exercise Description" onChange={onDescriptionInputChanged} />
        <SkillSelect selectedSkill={selectedSkill} skills={skills} onSkillSelected={onSkillSelected} />
        <button onClick={onSubmitClicked}>Submit</button>
    </div>
}

export default ExerciseFields