import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import PracticeExerciseList from '../src/components/PracticeExerciseList/PracticeExerciseList'
import { act } from 'react-test-renderer'

jest.mock('../src/components/MiniExercise/MiniExercise')
import MiniExercise from '../src/components/MiniExercise/MiniExercise'

jest.mock('../src/services/exerciseCompletionService')
import { addCompletedExercise, removedCompletedExercise, getCompletedExercisesByUserId, getCompletedExerciseByExerciseIdAndUserId } from '../src/services/exerciseCompletionService'

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

const fakeCompletedExercises = [
    {
        "id": 1,
        "userId": 1,
        "exerciseId": 1,
        "dateCompleted": "March 5 2024"
    }
]

const fakeCompletedExercise = [
    {
        "userId": 1,
        "exerciseId": "1",
        "dateCompleted": "2024320",
        "id": 1
    }
]

const currentUser = { id: 1, username: "lincolnpepper" }

beforeEach(
    () =>
    {
        getCompletedExerciseByExerciseIdAndUserId.mockImplementation(async () => fakeCompletedExercise)
        getCompletedExercisesByUserId.mockImplementation(async () => fakeCompletedExercises)
        addCompletedExercise.mockImplementation(async () => { })
        removedCompletedExercise.mockImplementation(async () => { })
    }
)

const testRender = async () =>
{
    let returnRender
    await act(
        async () =>
        {
            returnRender = await render(<PracticeExerciseList exercises={fakeExercises} currentUser={currentUser} />)
        }
    )
    return returnRender
}

describe('PracticeExerciseList works',
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

                const completedCheckbox = tree.getAllByRole('checkbox')[0]

                expect(MiniExercise).toHaveBeenCalled()
                expect(completedCheckbox).toBeInTheDocument()
            }
        )

        it('checks checkbox for exercise that has already been completed',
            async () =>
            {
                const tree = await testRender()

                const checkboxes = tree.getAllByRole('checkbox')
                const completedCheckbox = checkboxes.find(checkbox => checkbox.value == 1)

                expect(completedCheckbox.checked).toBeTruthy()
            }
        )

        it('calls removeCompletedExercise when unchecking checkbox',
            async () =>
            {
                const tree = await testRender()

                const checkboxes = tree.getAllByRole('checkbox')
                const completedCheckbox = checkboxes.find(checkbox => checkbox.value == 1)

                await act(
                    async () =>
                    {
                        await fireEvent.click(completedCheckbox)
                    }
                )

                expect(removedCompletedExercise).toHaveBeenCalledWith(1)
            }
        )
    }
)
