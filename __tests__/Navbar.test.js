import React from 'react'
import '@testing-library/jest-dom'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
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
                            <Route path="/playlist" element={<div data-testid="playlist-page" />} />
                            <Route path="/practice" element={<div data-testid="practice-page" />} />
                            <Route path="/login" element={<div data-testid="login-page" />} />
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

                const exerciseButton = tree.getByText(/exercise/i)
                fireEvent.click(exerciseButton)

                expect(tree.getByTestId("exercise-page")).toBeInTheDocument()
            }
        )

        it('navigates to playlist when playlist is clicked',
            () =>
            {
                const tree = testRender()

                const playlistButton = tree.getByText(/playlist/i)
                fireEvent.click(playlistButton)

                expect(tree.getByTestId('playlist-page')).toBeInTheDocument()
            }
        )

        it('navigates to practice when practice is clicked',
            () =>
            {
                const tree = testRender()

                const playlistButton = tree.getByText(/practice/i)
                fireEvent.click(playlistButton)

                expect(tree.getByTestId('practice-page')).toBeInTheDocument()
            }
        )

        it('navigates to login when logout is clicked, and logs out',
            () =>
            {
                const spy = jest.spyOn(Object.getPrototypeOf(localStorage), 'removeItem')
                Object.setPrototypeOf(localStorage.removeItem, jest.fn())

                const tree = testRender()

                const playlistButton = tree.getByText(/logout/i)
                fireEvent.click(playlistButton)

                expect(tree.getByTestId('login-page')).toBeInTheDocument()
                expect(spy).toHaveBeenCalledWith('guitar-practicer-user')
            }
        )
    }
)