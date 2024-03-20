import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, render } from '@testing-library/react'
import Practice from '../src/pages/Practice/Practice'
import { act } from 'react-test-renderer'

jest.mock('../src/components/PracticeExerciseList/PracticeExerciseList')
import PracticeExerciseList from '../src/components/PracticeExerciseList/PracticeExerciseList'

jest.mock('../src/services/userExerciseService')
import { getUserExercisesByUserId } from '../src/services/userExerciseService'

const fakeUserExercises = [
    {
        "id": 1,
        "userId": 1,
        "exerciseId": 1,
        "exercise":
        {
            "id": 1,
            "userId": 1,
            "skillId": 1,
            "name": "Exercise 1",
            "description": "Test",
            "hidden": false
        }
    },
    {
        "id": 2,
        "userId": 1,
        "exerciseId": 2,
        "exercise":
        {
            "id": 2,
            "userId": 2,
            "skillId": 2,
            "name": "Exercise 2",
            "description": "Test",
            "hidden": true
        }
    }
]

const currentUser = { id: 1, username: "lincolnpepper" }

beforeEach(
    () =>
    {
        getUserExercisesByUserId.mockImplementation(async () => fakeUserExercises)
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
            returnRender = await render(<Practice currentUser={currentUser} />)
        }
    )
    return returnRender
}

describe('Practice works',
    () =>
    {
        it('renders',
            async () =>
            {
                const tree = await testRender()

                expect(tree.container).toBeInTheDocument()
            }
        )

        it('renders interactable components',
            async () =>
            {
                const tree = await testRender()

                expect(PracticeExerciseList).toHaveBeenCalled()
            }
        )

        it('passes exercises to PracticeExerciseList',
            async () =>
            {
                const tree = await testRender()

                const exercises = fakeUserExercises.map(userExercise => userExercise.exercise)

                expect(PracticeExerciseList.mock.calls[PracticeExerciseList.mock.calls.length - 1][0]["exercises"]).toEqual(exercises)
            }
        )
    }
)
