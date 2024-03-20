import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, render } from '@testing-library/react'
import { act } from 'react-test-renderer'
import PracticeExercise from '../src/components/PracticeExercise/PracticeExercise.jsx'

afterEach(cleanup)

const testRender = async () =>
{
    let returnRender
    await act(
        async () =>
        {
            returnRender = await render(<PracticeExercise />)
        }
    )
    return returnRender
}

describe('PracticeExercise',
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