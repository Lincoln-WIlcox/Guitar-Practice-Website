
export const addUserExercise = (userExercise) =>
{
    return fetch('http://localhost:8088/userExercises',
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userExercise)
        }
    ).then(res => res.json())
}

export const getUserExercisesByUserId = (userId) =>
{
    return fetch(`http://localhost:8088/userExercises?userId=${userId}&_expand=exercise`).then(res => res.json())
}

export const removeUserExercise = (userExerciseId) =>
{
    return fetch(`http://localhost:8088/userExercises/${userExerciseId}`,
        {
            method: "DELETE",
        }
    ).then(res => res.json())
}

export const getUserExerciseByUserIdAndExerciseId = (exerciseId, userId) =>
{
    return fetch(`http://localhost:8088/userExercises?userId=${userId}&exerciseId=${exerciseId}`).then(res => res.json())
}