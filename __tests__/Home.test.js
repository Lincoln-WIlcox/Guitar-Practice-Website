import React from 'react'
import '@testing-library/jest-dom'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Home from '../src/pages/Home'
import { fireEvent, render, cleanup } from '@testing-library/react'

let currentUser = { id: 1, username: "lincolnpepper" }

it('should render home',
    () =>
    {
        const home = render(
            <MemoryRouter>
                <Routes>
                    <Route path="*" element={<Home currentUser={currentUser} />} />
                </Routes>
            </MemoryRouter>
        )

        expect(home.container).toBeInTheDocument()
    }
)

describe('page should navigate when buttons are pressed',
    () =>
    {
        afterEach(cleanup)

        const testRender = () =>
        {
            const renderedPage = render(
                <MemoryRouter>
                    <Routes>
                        <Route path="/">
                            <Route index element={<Home currentUser={currentUser} />} />
                            <Route path="exercises" element={<div data-testid="exercise-page"></div>} />
                            <Route path="practice" element={<div data-testid="practice-page"></div>} />
                            <Route path="playlist" element={<div data-testid="playlist-page"></div>} />
                        </Route>
                    </Routes>
                </MemoryRouter>
            )
            return renderedPage
        }

        it('navigates to exercise on exercise clicked',
            () =>
            {
                const tree = testRender()

                const navigateExercise = tree.getByTestId("navigate-exercise")
                fireEvent.click(navigateExercise)

                expect(tree.getByTestId("exercise-page")).toBeTruthy()
            }
        )


        it('navigates to practice on practice clicked',
            () =>
            {
                const tree = testRender()

                const navigatePractice = tree.getByTestId("navigate-practice")
                fireEvent.click(navigatePractice)

                expect(tree.getByTestId("practice-page")).toBeTruthy()
            }
        )


        it('navigates to playlist on playlist clicked',
            () =>
            {
                const tree = testRender()

                const navigatePlaylist = tree.getByTestId("navigate-playlist")
                fireEvent.click(navigatePlaylist)

                expect(tree.getByTestId("playlist-page")).toBeTruthy()
            }
        )
    }
)
