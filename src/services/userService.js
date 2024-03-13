export const getUserById = (id) =>
{
    return fetch(`http://localhost:8088/users/${id}`).then(res => res.json())
}

export const getUserByUsername = (username) =>
{
    return fetch(`http://localhost:8088/users?username=${username}`).then(res => res.json())
}