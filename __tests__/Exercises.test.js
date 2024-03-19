import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { act } from 'react-test-renderer'
import Exercises from '../src/pages/Exercises.jsx'

jest.mock('../src/components/ExercisesList/ExercisesList.jsx')
import ExercisesList from '../src/components/ExercisesList/ExercisesList.jsx'

jest.mock('../src/services/exerciseServices.js')
import { getExercises } from '../src/services/exerciseServices.js'

jest.mock('../src/components/CreateExerciseButton/CreateExerciseButton.jsx')
import CreateExerciseButton from '../src/components/CreateExerciseButton/CreateExerciseButton.jsx'

jest.mock('../src/components/ExercisesFilters/ExercisesFilters.jsx')
import ExercisesFilters from '../src/components/ExercisesFilters/ExercisesFilters.jsx'

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

beforeEach(
    async () =>
    {
        ExercisesList.mockReturnValue(<></>)

        CreateExerciseButton.mockReturnValue(<></>)

        getExercises.mockImplementation(
            async () =>
            {
                return fakeExercises
            }
        )
    }
)

afterEach(
    () =>
    {
        cleanup()
        jest.clearAllMocks()
    }
)

const currentUser = { id: 1, username: "lincolnpepper" }

const testRender = async () =>
{
    let returnRender
    await act(
        async () =>
        {
            returnRender = await render(
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<Exercises currentUser={currentUser} />} />
                    </Routes>
                </MemoryRouter>
            )
        }
    )
    return returnRender
}

describe('Exercises works',
    () =>
    {
        it("renders exercise",
            async () =>
            {
                const tree = await testRender()
                expect(tree.container).toBeInTheDocument()
            }
        )

        it("gets exercises",
            async () =>
            {
                const tree = await testRender()

                expect(getExercises).toHaveBeenCalled()
            }
        )

        it("passes exercises to exercise list",
            async () =>
            {
                const tree = await testRender()

                expect(ExercisesList.mock.calls[ExercisesList.mock.calls.length - 1][0]["exercises"]).toBe(fakeExercises)
            }
        )

        it("calls create exercise component",
            async () =>
            {
                const tree = await testRender()

                expect(CreateExerciseButton).toHaveBeenCalled()
            }
        )

        it("creates a filter bar",
            async () =>
            {
                const tree = await testRender()

                expect(ExercisesFilters).toHaveBeenCalled()
            }
        )

        it("passes correct exercises to exercise list when callbacks from filter bar are called",
            async () =>
            {
                let onSkillSelectedMock = () => { }
                let onSearchQueryChangedMock = () => { }
                let onShowMyExercisesChangedMock = () => { }

                ExercisesFilters.mockImplementation(
                    ({ onSkillSelected, onSearchQueryChanged, onShowMyExercisesChanged }) =>
                    {
                        onSkillSelectedMock = onSkillSelected
                        onSearchQueryChangedMock = onSearchQueryChanged
                        onShowMyExercisesChangedMock = onShowMyExercisesChanged
                    }
                )

                const tree = await testRender()

                await act(
                    async () =>
                    {
                        await onSkillSelectedMock(2)
                    }
                )

                expect(ExercisesList.mock.calls[ExercisesList.mock.calls.length - 1][0]["exercises"]).toEqual(
                    [
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
                )

                await act(
                    async () =>
                    {
                        await onShowMyExercisesChangedMock(true)
                    }
                )

                expect(ExercisesList.mock.calls[ExercisesList.mock.calls.length - 1][0]["exercises"]).toEqual(
                    [
                        {
                            "id": 3,
                            "userId": 1,
                            "skillId": 2,
                            "name": "Exercise 3",
                            "description": "Test",
                            "hidden": true
                        }
                    ]
                )

                await act(
                    async () =>
                    {
                        await onShowMyExercisesChangedMock(false)
                        await onSkillSelectedMock(0)
                    }
                )

                expect(ExercisesList.mock.calls[ExercisesList.mock.calls.length - 1][0]["exercises"]).toEqual(
                    [
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
                )

                await act(
                    async () =>
                    {
                        await onSearchQueryChangedMock("2")
                    }
                )

                expect(ExercisesList.mock.calls[ExercisesList.mock.calls.length - 1][0]["exercises"]).toEqual(
                    [
                        {
                            "id": 2,
                            "userId": 2,
                            "skillId": 2,
                            "name": "Exercise 2",
                            "description": "Test",
                            "hidden": true
                        }
                    ]
                )
            }
        )
    }
)

