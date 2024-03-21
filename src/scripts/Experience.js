import { getCompletedExercisesByUserId } from "../services/exerciseCompletionService"
import { getDate } from "./getDate"

const totalExpMultiplier = 50

const initialExpToLevelUp = 200
const expToLevelUpAdder = 50
const expToLevelUpMultiplier = 1.15

export const calculateLevelAndExp = (exercisesCompleted) =>
{
    let remainingExp = exercisesCompleted * totalExpMultiplier

    let expToLevelUp = initialExpToLevelUp

    let level = 1

    while(remainingExp > expToLevelUp)
    {
        level++
        remainingExp -= expToLevelUp
        expToLevelUp = Math.round((expToLevelUp + expToLevelUpAdder) * expToLevelUpMultiplier)
    }

    const levelAndExp =
    {
        level: level,
        exp: remainingExp,
        expToLevelUp: expToLevelUp
    }

    return levelAndExp
}

export const getLevelAndExpOfUser = async (userId) =>
{
    const completedExercisesForUser = await getCompletedExercisesByUserId(userId)

    return calculateLevelAndExp(completedExercisesForUser.length)
}

export const getLevelAndExpOfUserBeforeToday = async (userId) =>
{
    const completedExercisesForUser = await getCompletedExercisesByUserId(userId)

    const completedExercisesBeforeToday = completedExercisesForUser.filter(completedExercise => completedExercise.dateCompleted != getDate())

    return calculateLevelAndExp(completedExercisesBeforeToday.length)
}

export const getTotalExperienceForUser = async (userId) =>
{
    const completedExercisesForUser = await getCompletedExercisesByUserId(userId)

    return completedExercisesForUser.length * totalExpMultiplier
}

export const getTotalExperienceForUserBeforeToday = async (userId) =>
{
    const completedExercisesForUser = await getCompletedExercisesByUserId(userId)

    const completedExercisesBeforeToday = completedExercisesForUser.filter(completedExercise => completedExercise.dateCompleted != getDate())

    return completedExercisesBeforeToday.length * totalExpMultiplier
}