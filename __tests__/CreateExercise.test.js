import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { act } from 'react-test-renderer'
import CreateExercise from '../src/pages/CreateExercise'

beforeEach(
    () =>
    {

    }
)

afterEach(
    () =>
    {
        cleanup
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
                        <Route path="/">
                            <Route index element={<CreateExercise />} />
                        </Route>
                    </Routes>
                </MemoryRouter>
            )
        }
    )
    return returnRender
}

describe('CreateExercise works',
    () =>
    {
        it('renders',
            async () =>
            {
                const tree = await testRender()

                expect(tree.container).toBeInTheDocument()
            }
        )

        
    }
)
