export const getExercises = () =>
{
    return fetch('http://localhost:8088/exercises').then(res => res.json())
}