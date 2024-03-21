import { getCompletedExercisesByUserId } from "../services/exerciseCompletionService"

const totalExpMultiplier = 50

const initialExpToLevelUp = 200
const expToLevelUpAdder = 50
const expToLevelUpMultiplier = 1.15

export const getLevelAndExpOfUser = async (userId) =>
{
    const completedExercisesForUser = await getCompletedExercisesByUserId(userId)

    let remainingExp = completedExercisesForUser.length * totalExpMultiplier

    let expToLevelUp = initialExpToLevelUp

    let level = 0

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
