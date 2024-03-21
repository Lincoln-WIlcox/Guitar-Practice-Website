import { getCompletedExercisesByUserId } from "../services/exerciseCompletionService"

const totalExpMultipler = 50

const initialExpToLevelUp = 200
const expToLevelUpAdder = 50
const expToLevelUpMultiplier = 1.15

export const getLevelAndExpOfUser = async (userId) =>
{
    const completedExercisesForUser = await getCompletedExercisesByUserId(userId)

    let remainingExp = completedExercisesForUser.length * totalExpMultipler

    let xpToLevelUp = initialExpToLevelUp

    let level = 0

    while(remainingExp > xpToLevelUp)
    {
        level++
        remainingExp -= xpToLevelUp
        xpToLevelUp = Math.round((xpToLevelUp + expToLevelUpAdder) * expToLevelUpMultiplier)
    }

    const levelAndExp =
    {
        level: level,
        xp: remainingExp
    }

    return levelAndExp
}
