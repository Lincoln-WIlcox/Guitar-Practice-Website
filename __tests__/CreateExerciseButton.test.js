import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { act } from 'react-test-renderer'
import CreateExerciseButton from '../src/components/CreateExerciseButton/CreateExerciseButton.jsx'

afterEach(cleanup)

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
                            <Route index element={<CreateExerciseButton />} />
                            <Route path="/create-exercise" element={<div data-testid="create-exercise-page"></div>} />
                        </Route>
                    </Routes>
                </MemoryRouter>
            )
        }
    )
    return returnRender
}

describe('CreateExerciseButton component works',
    () =>
    {

        it('renders CreateExercise',
            async () =>
            {
                const tree = await testRender()

                expect(tree.container).toBeInTheDocument()
            }
        )

        it('navigates to create-exercise on click',
            async () =>
            {
                const tree = await testRender()

                fireEvent.click(tree.getByRole('button'))

                expect(tree.getByTestId('create-exercise-page')).toBeInTheDocument()
            }
        )

    }
)