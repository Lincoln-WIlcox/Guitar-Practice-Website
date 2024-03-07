import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { act } from 'react-test-renderer'
import CreateExercise from '../src/components/CreateExercise/CreateExercise.jsx'

beforeEach(
    async () =>
    {

    }
)

afterEach(
    () =>
    {
        cleanup()
        //jest.clearAllMocks()
    }
)

const testRender = async () =>
{
    let returnRender
    await act(
        async () =>
        {
            returnRender = await render(<CreateExercise />)
        }
    )
    return returnRender
}

describe('CreateExercise component works',
    () =>
    {

        it('renders CreateExercise',
            async () =>
            {
                const tree = await testRender()

                expect(tree.container).toBeInTheDocument()
            }
        )

    }
)