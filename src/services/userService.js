export const getUserById = (id) =>
{
    return fetch(`http://localhost:8088/users/${id}`)
}