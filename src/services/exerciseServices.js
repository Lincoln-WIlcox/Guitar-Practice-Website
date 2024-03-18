export const getExercises = () =>
{
    return fetch('http://localhost:8088/exercises').then(res => res.json())
}

export const addExercise = (exercise) =>
{
    return fetch('http://localhost:8088/exercises',
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(exercise)
        }
    )
}

export const getExerciseById = (id) =>
{
    return fetch(`http://localhost:8088/exercises/${id}`).then(res => res.json())
}

export const changeExercise = (exercise) =>
{
    return fetch(`http://localhost:8088/exercises/${exercise.id}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(exercise)
        }
    ).then(res => res.json())
}

export const getExercisesByUserId = (userId) =>
{
    return fetch(`http://localhost:8088/exercises?userId=${userId}`).then(res => res.json())
}