import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ExercisesList from '../src/components/ExercisesList/ExercisesList.jsx'
import { act } from 'react-test-renderer'

jest.mock('../src/components/MiniExercise/MiniExercise.jsx')
import MiniExercise from '../src/components/MiniExercise/MiniExercise.jsx'

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

afterEach(
    () =>
    {
        cleanup()
        jest.clearAllMocks()
    }
)

const testRender = async (exercises) =>
{
    let renderReturn
    await act(
        async () =>
        {
            renderReturn = await render(
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<ExercisesList exercises={exercises} />} />
                    </Routes>
                </MemoryRouter>
            )
        }
    )
    return renderReturn
}

it('should render exercise',
    async () =>
    {
        const tree = await testRender()

        expect(tree.container).toBeInTheDocument()
    }
)

describe('it should make a mini exercise for each exercise',
    () =>
    {
        it('makes a mini exercise for each exercise gotten',
            async () =>
            {
                const tree = await testRender(fakeExercises)

                expect(MiniExercise).toHaveBeenCalledTimes(fakeExercises.length)
            }
        )
    }
)
