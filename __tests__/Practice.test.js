import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, fireEvent, render } from '@testing-library/react'
import Practice from '../src/pages/Practice/Practice'
import { act } from 'react-test-renderer'

jest.mock('../src/components/PracticeExerciseList/PracticeExerciseList')
import PracticeExerciseList from '../src/components/PracticeExerciseList/PracticeExerciseList'

jest.mock('../src/services/userExerciseService')
import { getUserExercisesByUserId } from '../src/services/userExerciseService'

jest.mock('react-router-dom')
import { useNavigate } from 'react-router-dom'

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

const mockNavigate = jest.fn()

beforeEach(
    () =>
    {
        useNavigate.mockImplementation(() => mockNavigate)
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

                const practiceButton = tree.getByRole('button')

                expect(PracticeExerciseList).toHaveBeenCalled()
                expect(practiceButton).toBeInTheDocument()
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

        it('navigates to practice exercises on practice button pressed',
            async () =>
            {
                const tree = await testRender()

                const practiceButton = tree.getByRole('button')

                await act(
                    async () =>
                    {
                        await fireEvent.click(practiceButton)
                    }
                )

                expect(mockNavigate).toHaveBeenCalledWith('/practice-exercises')
            }
        )
    }
)
