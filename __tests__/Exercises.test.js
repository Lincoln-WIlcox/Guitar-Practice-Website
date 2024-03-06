import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Exercises from '../src/pages/Exercises'

test('should render exercise',
    () =>
    {
        const exercises = render(
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Exercises />} />
                </Routes>
            </MemoryRouter>
        )

        expect(exercises.container).toBeInTheDocument()
    }
)

