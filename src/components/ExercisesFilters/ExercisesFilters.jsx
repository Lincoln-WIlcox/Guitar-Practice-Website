import SkillSelect from "../SkillSelect/SkillSelect"
import "./ExercisesFilters.css"

const ExercisesFilters = ({ onSkillSelected }) =>
{
    return <div>
        <SkillSelect onSkillSelected={onSkillSelected} />
    </div>
}

export default ExercisesFilters