
const SkillSelect = ({ selectedSkill, skills, onSkillSelected }) =>
{

    const onSelectChanged = (event) =>
    {
        onSkillSelected(event.target.value)
        
    }

    return <div>
        <select onChange={onSelectChanged} defaultValue={selectedSkill}>
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
    </div>
}

export default SkillSelect