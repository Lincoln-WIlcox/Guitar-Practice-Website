import { useEffect, useState } from "react"
import "./MiniExercise.css"
import { getUserById } from "../../services/userService"
import { getSkillById } from "../../services/skillsService"

const MiniExercise = ({ title, skill, author, description }) =>
{
    const [expanded, setExpanded] = useState(false)
    const [skillText, setSkillText] = useState("Skill")
    const [authorText, setAuthorText] = useState("AUser")

    const [width, setWidth] = useState(window.innerWidth);
    const updateDimensions = () =>
    {
        setWidth(window.innerWidth);
    }
    useEffect(() =>
    {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

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

    return (
        <div data-testid="MiniExercise" onClick={onExerciseClicked} className="w-full m-2">
            {
                width > 600 ?
                    <div className="flex justify-center w-full max-w-full mb-2 flex-wrap lg:flex-nowrap my-border bg-stone-800 my-shadow-dark -z-10">
                        <h2 className={"w-4/12 max-w-4/12 p-2 " + (!expanded && `overflow-clip whitespace-nowrap overflow-ellipsis`)}>{title ? title : "Exercise Title"}</h2>
                        <h3 className={"w-4/12 max-w-4/12 p-2 " + (!expanded && `overflow-clip whitespace-nowrap overflow-ellipsis`)}>{skillText}</h3>
                        <h3 className={"w-4/12 max-w-4/12 p-2 " + (!expanded && `overflow-clip whitespace-nowrap overflow-ellipsis`)}>Made By {authorText}</h3>
                    </div>
                    :
                    <div className="flex flex-col w-full max-w-full justify-center mb-2 flex-wrap lg:flex-nowrap my-border bg-stone-800 my-shadow-dark -z-10">
                        <h2 className={"w-full max-w-full p-2 " + (!expanded && `overflow-clip whitespace-nowrap overflow-ellipsis`)}>{title ? title : "Exercise Title"}</h2>
                        {
                            expanded &&
                            <>
                                <h3 className={"w-full max-w-full p-2 " + (!expanded && `overflow-clip whitespace-nowrap overflow-ellipsis`)}>{skillText}</h3>
                                <h3 className={"w-full max-w-full p-2 " + (!expanded && `overflow-clip whitespace-nowrap overflow-ellipsis`)}>Made By {authorText}</h3>
                            </>
                        }
                    </div>

            }

            {
                expanded &&
                <div>
                    <p className="z-20">{description}</p>
                </div>
            }
        </div>
    )
}

export default MiniExercise