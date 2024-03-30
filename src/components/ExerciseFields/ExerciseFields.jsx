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

    return <div className="flex flex-col items-center mt-20 space-y-8 bg-stone-800 my-border p-8 w-1/4 min-w-fit">
        <input className="bg-gray-900 p-1 my-shadow-light" type="text" placeholder="Exercise Title" value={title ? title : ""} onChange={onTitleInputChanged} />
        <textarea rows="8" cols="40" className="bg-gray-900 p-1 my-shadow-light" placeholder="Exercise Description" value={description ? description : ""} onChange={onDescriptionInputChanged} />
        <SkillSelect selectedSkill={skill} skills={skills} onSkillSelected={onSkillSelected} />
        <button className="mr-2 w-8 h-8 bg-blue-600 rounded my-border hover:bg-blue-400 active:bg-blue-200 my-shadow-light text-lg"
            onClick={onSubmitClicked} data-testid="edit">
            <i className="fa fa-plus" />
        </button>
    </div>
}

export default ExerciseFields