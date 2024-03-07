
const SkillSelect = ({ skills, onSkillSelected }) =>
{
    const onSelectChanged = (event) =>
    {
        onSkillSelected(event.target.value)
    }

    return <div>
        <select onChange={onSelectChanged}>
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