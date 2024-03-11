export const getExercises = () =>
{
    return fetch('http://localhost:8088/exercises').then(res => res.json())
}

export const addExercise = (exercise) =>
{
    return fetch('http://localhost:8088/exercises',
    {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(exercise)
    }
    )
}