import { useEffect, useState } from "react"
import "./MiniExercise.css"
import { getUserById } from "../../services/userService"
import { getSkillById } from "../../services/skillsService"

const MiniExercise = ({ title, skill, author, description }) =>
{
    const [expanded, setExpanded] = useState(false)
    const [skillText, setSkillText] = useState("Skill")
    const [authorText, setAuthorText] = useState("User")

    useEffect(
        () =>
        {
            getSkillById(skill).then(
                (gottenSkill) =>
                {
                    setSkillText(gottenSkill.skill)
                }
            )
            getUserById(author).then(
                (gottenAuthor) =>
                {
                    setAuthorText(gottenAuthor.username)
                }
            )
        }, [skill, author]
    )

    const onExerciseClicked = () =>
    {
        setExpanded(!expanded)
    }

    const exerciseHeight = expanded ? "expanded" : "h-6"

    return (
        <div data-testid="MiniExercise" onClick={onExerciseClicked} className={"w-7/12 overflow-hidden m-2 " + (exerciseHeight)}>
            <div className="flex justify-between mb-2">
                <h2>{title ? title : "Exercise Title"}</h2>
                <h3>{skillText}</h3>
                <h3>Made By {authorText}</h3>
            </div>
            <div>
                <p>{description}</p>
            </div>

        </div>
    )
}

export default MiniExercise