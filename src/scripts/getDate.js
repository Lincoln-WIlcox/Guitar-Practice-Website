export const getDate = () =>
{
    const date = new Date()
    let day = date.getDate()
    let month = (date.getMonth() + 1).toString()
    let year = date.getFullYear()

    if(month.length < 2)
    {
        month = `0${month}`
    }

    let fullDate = `${year}${month}${day}`

    return fullDate
}