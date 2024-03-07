import { useEffect, useState } from "react"
import SkillSelect from "../SkillSelect/SkillSelect"
import "./ExercisesFilters.css"

const ExercisesFilters = ({ onSkillSelected, onSearchQueryChanged, onShowMyExercisesChanged }) =>
{
    const [selectedSkill, setSelectedSkill] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')
    const [showMyExercisesChecked, setShowMyExercisesChecked] = useState(false)

    useEffect(
        () =>
        {
            onSkillSelected(selectedSkill)
        }, [selectedSkill]
    )

    useEffect(
        () =>
        {
            onSearchQueryChanged(searchQuery)
        }, [searchQuery]
    )

    useEffect(
        () =>
        {
            onShowMyExercisesChanged(showMyExercisesChecked)
        }, [showMyExercisesChecked]
    )

    const onSearchChanged = (event) =>
    {
        setSearchQuery(event.target.value)
    }

    const onShowMyExercisesCheckboxChanged = (event) =>
    {
        setShowMyExercisesChecked(!showMyExercisesChecked)
    }

    const onShowAllButtonClicked = (event) =>
    {
        setSelectedSkill(0)
        setSearchQuery('')
        setShowMyExercisesChecked(false)
    }

    return <div>
        <SkillSelect onSkillSelected={setSelectedSkill} selectedSkill={selectedSkill} />
        <input type="search" placeholder="filter by name" onChange={onSearchChanged} value={searchQuery} />
        <div>
            <label name="showMyExercises">Show My Exercises</label>
            <input type="checkbox" name="showMyExercises" checked={showMyExercisesChecked} onChange={onShowMyExercisesCheckboxChanged} />
        </div>
        <button onClick={onShowAllButtonClicked}>Show All</button>
    </div>
}

export default ExercisesFilters