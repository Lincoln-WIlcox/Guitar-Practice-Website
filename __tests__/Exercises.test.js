import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { act } from 'react-test-renderer'

jest.mock("../src/components/ExercisesList/ExercisesList.jsx")
import ExercisesList from '../src/components/ExercisesList/ExercisesList.jsx'
import Exercises from '../src/pages/Exercises.jsx'

beforeEach(
    ExercisesList.mockReturnValue(<></>)
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
    () =>
    {

    }
)