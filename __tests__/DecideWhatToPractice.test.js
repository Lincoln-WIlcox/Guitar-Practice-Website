import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, render } from '@testing-library/react'
import { act } from 'react-test-renderer'
import DecideWhatToPractice from '../src/pages/DecideWhatToPractice/DecideWhatToPractice.jsx'

jest.mock('../src/components/PracticeExercise/PracticeExercise.jsx')
import PracticeExercise from '../src/components/PracticeExercise/PracticeExercise.jsx'

jest.mock('../src/components/PracticeComplete/PracticeComplete.jsx')
import PracticeComplete from '../src/components/PracticeComplete/PracticeComplete.jsx'

jest.mock('../src/services/userExerciseService.js')
import { getUserExercisesByUserId } from '../src/services/userExerciseService.js'

jest.mock('../src/services/exerciseCompletionService.js')
import { getCompletedExercisesByUserIdAndDate } from '../src/services/exerciseCompletionService.js'
import { getDate } from '../src/scripts/getDate.js'

const fakeUserExercises =
    [
        {
            "id": 1,
            "userId": 1,
            "exerciseId": 1,
            "order": 1,
            "exercise":
            {
                "id": 1,
                "name": "Exercise 33",
                "description": "Test!!!!!!!!",
                "skillId": "2",
                "userId": 1
            }
        },
        {
            "id": 2,
            "userId": 1,
            "exerciseId": 2,
            "order": 3,
            "exercise":
            {
                "id": 2,
                "userId": 2,
                "skillId": 2,
                "name": "Exercise 2 2",
                "description": "TestTestTestTestTestTestTestTestTestTestTes tTestTestTestTestTestTestTestTest TestTestTestTestTestTestTestTest TestTestTestTestTestTest TestTestTestTestTestTestTestTestTest TestTestTestTestTestTestTestTestTestTestTestTestTes TestTestTestTestTestTestTestTest TestTestTestTestTestTest TestTestTestTestTestTestTest TestTestTestTest"
            }
        },
        {
            "id": 3,
            "userId": 1,
            "exerciseId": 3,
            "order": 2,
            "exercise":
            {
                "id": 3,
                "userId": 3,
                "skillId": 2,
                "name": "Exercise 3 3 3 3 3",
                "description": "Test"
            }
        }
    ]

const fullDate = getDate()

const fakeCompletionsWithoutAllCompleted =
    [
        {
            "userId": 1,
            "exerciseId": "2",
            "dateCompleted": fullDate,
            "id": 1
        }
    ]

const fakeCompletionsWithAllCompleted =
    [
        {
            "userId": 1,
            "exerciseId": "1",
            "dateCompleted": fullDate,
            "id": 1
        },
        {
            "userId": 1,
            "exerciseId": "2",
            "dateCompleted": fullDate,
            "id": 1
        },
        {
            "userId": 1,
            "exerciseId": "3",
            "dateCompleted": fullDate,
            "id": 1
        }
    ]

const currentUser = { id: 1, username: "lincolnpepper" }

beforeEach(
    () =>
    {
        getUserExercisesByUserId.mockImplementation(async () => fakeUserExercises)
        getCompletedExercisesByUserIdAndDate.mockImplementation(async () => fakeCompletionsWithoutAllCompleted)
    }
)

afterEach(
    () =>
    {
        cleanup()
        jest.clearAllMocks()
        jest.restoreAllMocks()
    }
)

const testRender = async () =>
{
    let returnRender
    await act(
        async () =>
        {
            returnRender = await render(<DecideWhatToPractice currentUser={currentUser} />)
        }
    )
    return returnRender
}

describe('DecideWhatToPractice',
    () =>
    {
        it('renders',
            async () =>
            {
                const tree = await testRender()

                expect(tree.container).toBeInTheDocument()
            }
        )

        it('renders PracticeExercise if there is a user exercise not completed today, passing the exercise with highest order',
            async () =>
            {
                const tree = await testRender()

                expect(PracticeExercise.mock.calls[PracticeExercise.mock.calls.length - 1][0]["exercise"]).toEqual(
                    {
                        "id": 3,
                        "userId": 3,
                        "skillId": 2,
                        "name": "Exercise 3 3 3 3 3",
                        "description": "Test"
                    }
                )
            }
        )

        it('renders PracticeComplete if there are no user exercises left',
            async () =>
            {
                getCompletedExercisesByUserIdAndDate.mockImplementation(async () => fakeCompletionsWithAllCompleted)

                const tree = await testRender()

                expect(PracticeComplete).toHaveBeenCalled()
            }
        )

        it('renders PracticeExercise, passing correct exercise when exercise complete callback is called',
            async () =>
            {
                getCompletedExercisesByUserIdAndDate.mockImplementation(async () => [])

                let mockOnExerciseCompleted = () => { }

                PracticeExercise.mockImplementation(
                    ({ exercise, onExerciseCompleted }) =>
                    {
                        mockOnExerciseCompleted = onExerciseCompleted
                    }
                )

                const tree = await testRender()

                getCompletedExercisesByUserIdAndDate.mockImplementation(async () => fakeCompletionsWithoutAllCompleted)

                await act(
                    async () =>
                    {
                        await mockOnExerciseCompleted()
                    }
                )

                expect(PracticeExercise.mock.calls[PracticeExercise.mock.calls.length - 1][0]["exercise"]).toEqual(
                    {
                        "id": 3,
                        "userId": 3,
                        "skillId": 2,
                        "name": "Exercise 3 3 3 3 3",
                        "description": "Test"
                    }
                )
            }
        )
    }
)