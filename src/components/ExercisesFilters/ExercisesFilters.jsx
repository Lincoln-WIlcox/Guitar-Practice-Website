import SkillSelect from "../SkillSelect/SkillSelect"
import "./ExercisesFilters.css"

const ExercisesFilters = ({ searchQuery, onSkillSelected, onSearchQueryChanged, onShowMyExercisesChanged, onShowAllClicked }) =>
{
    const onSearchChanged = (event) =>
    {
        onSearchQueryChanged(event.target.value)
    }

    const onShowMyExercisesCheckboxChanged = (event) =>
    {
        onShowMyExercisesChanged(event.target.checked)
    }

    const onShowAllButtonClicked = (event) =>
    {
        onShowAllClicked()
    }

    return <div>
        <SkillSelect onSkillSelected={onSkillSelected} />
        <input type="search" placeholder="filter by name" onChange={onSearchChanged} value={searchQuery} />
        <div>
            <label name="showMyExercises">Show My Exercises</label>
            <input type="checkbox" name="showMyExercises" onChange={onShowMyExercisesCheckboxChanged} />
        </div>
        <button onClick={onShowAllButtonClicked}>Show All</button>
    </div>
}

export default ExercisesFilters