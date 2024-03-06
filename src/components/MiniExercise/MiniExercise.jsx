import { useState } from "react"
import "./MiniExercise.css"

const MiniExercise = () =>
{
    const [expanded, setExpanded] = useState(false)

    const onExerciseClicked = () =>
    {
        setExpanded(!expanded)
    }

    const exerciseHeight = expanded ? "expanded" : "h-6"

    return (
        <div data-testid="MiniExercise" onClick={onExerciseClicked} className={"w-7/12 overflow-hidden m-2 " + (exerciseHeight)}>
            <div className="flex justify-between mb-2">
                <h2>Exercise Title</h2>
                <h3>Skill</h3>
                <h3>Made By User</h3>
            </div>
            <div>
                <p>exercise about exercise about exercise about exercise about exercise about exercise about exercise about exercise about exercise about exercise about exercise about exercise about exercise about exercise about exercise about
                    exercise about exercise about exercise about exercise about exercise about exercise about exercise about exercise about exercise about exercise about exercise about exercise about exercise about exercise about exercise about
                </p>
            </div>

        </div>
    )
}

export default MiniExercise