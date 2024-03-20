import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, render } from '@testing-library/react'
import { act } from 'react-test-renderer'
import PracticeComplete from '../src/components/PracticeComplete/PracticeComplete.jsx'

afterEach(cleanup)

const testRender = async () =>
{
    let returnRender
    await act(
        async () =>
        {
            returnRender = await render(<PracticeComplete />)
        }
    )
    return returnRender
}

describe('PracticeComplete',
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