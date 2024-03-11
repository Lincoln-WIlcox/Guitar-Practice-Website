export const getSkillById = (id) =>
{
    return fetch(`http://localhost:8088/skills/${id}`).then(res => res.json())
}

export const getSkills = () =>
{
    return fetch('http://localhost:8088/skills').then(res => res.json())
}