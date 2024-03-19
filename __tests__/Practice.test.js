import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Practice from '../src/pages/Practice/Practice'
import { act } from 'react-test-renderer'

jest.mock('../src/components/PracticeExerciseList/PracticeExerciseList')
import PracticeExerciseList from '../src/components/PracticeExerciseList/PracticeExerciseList'

jest.mock('../src/services/exerciseServices')
import { getExercisesByUserId } from '../src/services/exerciseServices'

const fakeExercises = [
    {
        "id": 1,
        "userId": 1,
        "skillId": 1,
        "name": "Exercise 1",
        "description": "Test",
        "hidden": false
    },
    {
        "id": 2,
        "userId": 2,
        "skillId": 2,
        "name": "Exercise 2",
        "description": "Test",
        "hidden": true
    },
    {
        "id": 3,
        "userId": 1,
        "skillId": 2,
        "name": "Exercise 3",
        "description": "Test",
        "hidden": true
    }
]

const currentUser = { id: 1, username: "lincolnpepper" }

beforeEach(
    () =>
    {
        getExercisesByUserId.mockImplementation(async () => fakeExercises)
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

                expect(PracticeExerciseList.mock.calls[PracticeExerciseList.mock.calls.length - 1][0]["exercises"]).toEqual(fakeExercises)
            }
        )
    }
)
