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

        it('creates title field',
            async () =>
            {
                const tree = await testRender()

                const titleField = tree.getByPlaceholderText(/Exercise Title/i)
                expect(titleField).toBeInTheDocument()
            }
        )

        it('creates description field',
            async () =>
            {
                const tree = await testRender()

                const titleField = tree.getByPlaceholderText(/Exercise Description/i)
                expect(titleField).toBeInTheDocument()
            }
        )

        it('contains a dropdown for skill',
            async () =>
            {
                const tree = await testRender()

                const skillDropdown = tree.getByRole('combobox')
                expect(skillDropdown).toBeInTheDocument()
            }
        )

        it('contains a button to submit',
            async () =>
            {
                const tree = await testRender()

                const submitButton = tree.getByRole('button')
                expect(submitButton).toBeInTheDocument()
            }
        )

    }
)
