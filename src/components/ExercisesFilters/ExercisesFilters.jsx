import { useEffect, useState } from "react"
import SkillSelect from "../SkillSelect/SkillSelect"
import "./ExercisesFilters.css"
import { getSkills } from "../../services/skillsService"

const ExercisesFilters = ({ onSkillSelected, onSearchQueryChanged, onShowMyExercisesChanged }) =>
{
    const [selectedSkill, setSelectedSkill] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')
    const [showMyExercisesChecked, setShowMyExercisesChecked] = useState(false)
    const [allSkills, setAllSkills] = useState([])

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const updateDimensions = () =>
    {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }
    useEffect(() =>
    {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

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

    return <div className={"flex " + (width < 500 ? "flex-col space-y-3 " : "flex-wrap space-x-4") + " justify-center items-center m-4 mt-0 my-border border-t-0 p-4 bg-stone-800 my-shadow-dark"}>
        <SkillSelect onSkillSelected={setSelectedSkill} skills={allSkills} selectedSkill={selectedSkill} />
        <input type="search" placeholder="filter by name" className="text-black rounded my-shadow-light p-1" onChange={onSearchChanged} value={searchQuery} />
        <div className="my-border rounded p-1 my-shadow-light">
            <label name="showMyExercises" className="mr-1">Show My Exercises</label>
            <input type="checkbox" name="showMyExercises" checked={showMyExercisesChecked} onChange={onShowMyExercisesCheckboxChanged} />
        </div>
        <button className="my-button p-1 my-shadow-light" onClick={onShowAllButtonClicked}>Show All</button>
    </div>
}

export default ExercisesFilters