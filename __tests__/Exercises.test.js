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

const testRender = async () =>
{
    let returnRender
    await act(
        async () =>
        {
            returnRender = await render(
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<Exercises />} />
                    </Routes>
                </MemoryRouter>
            )
        }
    )
    return returnRender
}

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

        expect(ExercisesList).toHaveBeenLastCalledWith({ exercises: fakeExercises }, {})
    }
)

it("calls create exercise component",
    async () =>
    {
        const tree = await testRender()

        expect(CreateExerciseButton).toHaveBeenCalled()
    }
)
