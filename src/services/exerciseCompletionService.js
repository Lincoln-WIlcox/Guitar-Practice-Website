export const addCompletedExercise = (completion) =>
{
    return fetch(`http://localhost:8088/completedExercises`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(completion)
        }
    ).then(res => res.json())
}

export const getCompletedExercises = () =>
{
    return fetch(`http://localhost:8088/completedExercises`).then(res => res.json())
}

export const removedCompletedExercise = (exerciseId) =>
{
    return fetch(`http://localhost:8088/completedExercises/${exerciseId}`,
        {
            method: "DELETE"
        }
    )
}