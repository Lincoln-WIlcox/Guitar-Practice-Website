import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import PracticeExerciseList from '../src/components/PracticeExerciseList/PracticeExerciseList'
import { act } from 'react-test-renderer'

jest.mock('../src/components/MiniExercise/MiniExercise')
import MiniExercise from '../src/components/MiniExercise/MiniExercise'

jest.mock('../src/services/exerciseCompletionService')
import { addCompletedExercise, removedCompletedExercise, getCompletedExercises } from '../src/services/exerciseCompletionService'

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

const currentUser = { id: 1, username: "lincolnpepper" }

beforeEach(
    () =>
    {
        getCompletedExercises.mockImplementation(async () => fakeCompletedExercises)
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

                const completedCheckbox = tree.getAllByRole('checkbox')[0]

                expect(MiniExercise).toHaveBeenCalled()
                expect(completedCheckbox).toBeInTheDocument()
            }
        )

        it('adds an exercise completion on checkbox checked',
            async () =>
            {
                const tree = await testRender()

                const checkboxes = tree.getAllByRole('checkbox')
                const completedCheckbox = checkboxes.find(checkbox => checkbox.value == 2)

                await act(
                    async () =>
                    {
                        await fireEvent.click(completedCheckbox)
                    }
                )

                expect(addCompletedExercise).toHaveBeenCalledWith(
                    {
                        "userId": 1,
                        "exerciseId": "2",
                    }
                )
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
