import { useEffect } from "react"

const SkillSelect = ({ selectedSkill, skills, onSkillSelected }) =>
{

    const onSelectChanged = (event) =>
    {
        onSkillSelected(event.target.value)
    }

    return<select className="bg-gray-900 my-border rounded p-1 my-shadow-light" onChange={onSelectChanged} value={selectedSkill}>
            <option value={0} key={0}>No Skill Selected</option>
            {
                skills.map(
                    (skill) =>
                    {
                        return <option value={skill.id} key={skill.id}>{skill.skill}</option>
                    }
                )
            }
    </select>
    
}

export default SkillSelect