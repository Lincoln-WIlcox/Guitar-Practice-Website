import React from 'react'
import '@testing-library/jest-dom'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Home from '../src/pages/Home'
import { fireEvent, render, cleanup } from '@testing-library/react'
import Navbar from '../src/components/Navbar/Navbar'

describe('Navbar should navigate to associated pages when buttons are pressed',
    () =>
    {
        const testRender = () =>
        {
            return render(
                <MemoryRouter>
                    <Routes>
                        <Route path="/">
                            <Route index element={<Navbar />} />
                            <Route path="/exercises" element={<div data-testid="exercise-page"></div>} />
                        </Route>
                    </Routes>
                </MemoryRouter>
            )
        }

        afterEach(cleanup)

        it('navigates to exercise when exercise is pressed',
            () =>
            {
                const tree = testRender()

                const exerciseButton = tree.getByText('Exercises')
                fireEvent.click(exerciseButton)

                expect(tree.getByTestId("exercise-page")).toBeInTheDocument()
            }
        )
    }
)