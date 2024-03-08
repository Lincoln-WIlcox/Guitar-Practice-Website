import SkillSelect from "../components/SkillSelect/SkillSelect"
import "./CreateExercise.css"

const CreateExercise = () =>
{

    return <div className="flex flex-col w-full items-center mt-10 space-y-5">
        <input type="text" placeholder="Exercise Title" />
        <input type="text" placeholder="Exercise Description"></input>
        <SkillSelect selectedSkill={0} skills={[]} />
        <button>Submit</button>
    </div>
    
}

export default CreateExercise