import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { act } from 'react-test-renderer'
import PracticeExercise from '../src/components/PracticeExercise/PracticeExercise.jsx'

jest.mock('../src/services/exerciseCompletionService.js')
import { addCompletedExercise } from '../src/services/exerciseCompletionService.js'
import { getDate } from '../src/scripts/getDate.js'

beforeEach(
    () =>
    {
        addCompletedExercise.mockImplementation(async () => { })
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

const onExerciseCompleted = jest.fn()

const fakeExercise =
{
    "id": 1,
    "name": "Exercise 33",
    "description": "Test!!!!!!!!",
    "skillId": "2",
    "userId": 1
}

const currentUser = { id: 1, username: "lincolnpepper" }

const testRender = async () =>
{
    let returnRender
    await act(
        async () =>
        {
            returnRender = await render(<PracticeExercise currentUser={currentUser} exercise={fakeExercise} onExerciseCompleted={onExerciseCompleted} />)
        }
    )
    return returnRender
}

describe('PracticeExercise',
    () =>
    {
        it('renders',
            async () =>
            {
                const tree = await testRender()

                expect(tree.container).toBeInTheDocument()
            }
        )

        it('adds a completion and calls callback on complete pressed',
            async () =>
            {
                const tree = await testRender()

                const completeButton = tree.getByRole('button')

                await act(
                    async () =>
                    {
                        await fireEvent.click(completeButton)
                    }
                )

                const today = getDate()
                expect(addCompletedExercise).toHaveBeenCalledWith(
                    {
                        "userId": 1,
                        "exerciseId": 1,
                        "dateCompleted": today,
                    }
                )
                expect(onExerciseCompleted).toHaveBeenCalled()
            }
        )
    }
)