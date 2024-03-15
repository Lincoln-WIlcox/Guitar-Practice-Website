
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
    const userExerciseAbove = await getUserExerciseByOrder(parseInt(userExercise.order) + 1)

    if(userExerciseAbove.length === 1)
    {
        const newUserExerciseAbove =
        {
            ...userExerciseAbove,
            order: userExerciseAbove.order - 1
        }

        const newUserExercise =
        {
            ...userExercise,
            order: userExercise.order + 1
        }

        fetch(`http://localhost:8088/userExercises/${userExerciseAbove.id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUserExerciseAbove)
            }
        )

        fetch(`http://localhost:8088/userExercises/${newUserExercise.id}`,
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
    const userExerciseAbove = await getUserExerciseByOrder(parseInt(userExercise.order) - 1)

    if(userExerciseAbove.length === 1)
    {
        const newUserExerciseAbove =
        {
            ...userExerciseAbove,
            order: userExerciseAbove.order + 1
        }

        const newUserExercise =
        {
            ...userExercise,
            order: userExercise.order - 1
        }

        fetch(`http://localhost:8088/userExercises/${userExerciseAbove.id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUserExerciseAbove)
            }
        )

        fetch(`http://localhost:8088/userExercises/${newUserExercise.id}`,
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