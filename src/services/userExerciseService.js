
export const getUserExercises = () =>
{
    return fetch(`http://localhost:8088/userExercises`).then(res => res.json())
}

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

export const changeUserExercise = (userExercise) =>
{
    return fetch(`http://localhost:8088/userExercises/${userExercise.id}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userExercise)
        }
    ).then(res => res.json())
}

export const getUserExerciseById = (userExerciseId) =>
{
    return fetch(`http://localhost:8088/userExercises/${userExerciseId}`).then(res => res.json())
}

export const getUserExercisesByUserId = (userId) =>
{
    return fetch(`http://localhost:8088/userExercises?userId=${userId}&_expand=exercise`).then(res => res.json())
}

export const removeUserExercise = async (userExerciseId) =>
{
    const removingUserExercise = await getUserExerciseById(userExerciseId)
    const userExercises = await getUserExercises()

    await userExercises.forEach(
        async (userExercise) => 
        {
            if(userExercise.order > removingUserExercise.order)
            {
                userExercise.order -= 1
                await changeUserExercise(userExercise)
            }
        }
    )

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

export const getUserExerciseByOrder = (order) =>
{
    return fetch(`http://localhost:8088/userExercises?order=${order}`).then(res => res.json())
}

export const switchOrderWithExerciseAbove = async (userExercise) =>
{
    debugger
    const userExercisesAbove = await getUserExerciseByOrder(parseInt(userExercise.order) + 1)

    if(userExercisesAbove.length === 1)
    {
        const userExerciseAbove = userExercisesAbove[0]

        const newUserExerciseAbove =
        {
            id: userExerciseAbove.id,
            userId: userExerciseAbove.userId,
            exerciseId: userExerciseAbove.exerciseId,
            order: userExerciseAbove.order - 1
        }

        const newUserExercise =
        {
            id: userExercise.id,
            userId: userExercise.userId,
            exerciseId: userExercise.exerciseId,
            order: userExercise.order + 1
        }

        await fetch(`http://localhost:8088/userExercises/${newUserExerciseAbove.id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUserExerciseAbove)
            }
        )

        await fetch(`http://localhost:8088/userExercises/${newUserExercise.id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUserExercise)
            }
        )
    }
}

export const switchOrderWithExerciseBelow = async (userExercise) =>
{
    const userExercisesBelow = await getUserExerciseByOrder(parseInt(userExercise.order) - 1)

    if(userExercisesBelow.length === 1)
    {
        const userExerciseBelow = userExercisesBelow[0]

        const newUserExerciseBelow =
        {
            id: userExerciseBelow.id,
            userId: userExerciseBelow.userId,
            exerciseId: userExerciseBelow.exerciseId,
            order: userExerciseBelow.order + 1
        }

        const newUserExercise =
        {
            id: userExercise.id,
            userId: userExercise.userId,
            exerciseId: userExercise.exerciseId,
            order: userExercise.order - 1
        }

        await fetch(`http://localhost:8088/userExercises/${newUserExerciseBelow.id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUserExerciseBelow)
            }
        )

        await fetch(`http://localhost:8088/userExercises/${newUserExercise.id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUserExercise)
            }
        )
    }
}

export const getLastOrder = async () =>
{
    const userExercises = await getUserExercises()

    const lastOrder = userExercises.reduce((order, userExercise) => Math.max(order, parseInt(userExercise.order)), 0)

    return lastOrder
}

export const addExerciseToEndOfOrder = async (userExercise) =>
{
    const lastOrder = await getLastOrder()
    userExercise.order = lastOrder + 1
    addUserExercise(userExercise)
}