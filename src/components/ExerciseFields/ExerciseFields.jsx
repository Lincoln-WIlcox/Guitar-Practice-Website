import SkillSelect from "../SkillSelect/SkillSelect"
import "./ExerciseFields.css"

const ExerciseFields = ({ skills, skill, description, title, onExerciseTitleChanged, onDescriptionChanged, onSkillSelected, onSubmitClicked }) =>
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
        <input className="bg-gray-900" type="text" placeholder="Exercise Title" value={title} onChange={onTitleInputChanged} />
        <input className="bg-gray-900" type="text" placeholder="Exercise Description" value={description} onChange={onDescriptionInputChanged} />
        <SkillSelect selectedSkill={skill} skills={skills} onSkillSelected={onSkillSelected} />
        <button onClick={onSubmitClicked}>Submit</button>
    </div>
}

export default ExerciseFields