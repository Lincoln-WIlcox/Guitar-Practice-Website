import { getSkillById } from "../src/services/skillsService"

describe('should get associated skill',
    () =>
    {
        getSkillById(1).then(
            (skill) =>
            {
                expect(skill.skill).toBe("skill 1")
            }
        )
    }
)