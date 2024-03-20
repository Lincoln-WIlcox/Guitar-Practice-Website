import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { act } from 'react-test-renderer'
import PracticeComplete from '../src/components/PracticeComplete/PracticeComplete.jsx'

jest.mock('react-router-dom')
import { useNavigate } from 'react-router-dom'

afterEach(
    () =>
    {
        cleanup()
        jest.clearAllMocks()
        jest.restoreAllMocks()
    }
)

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

        it('navigates to practice page on button pressed',
            async () =>
            {
                const mockNavigate = jest.fn()
                useNavigate.mockImplementation(() => mockNavigate)

                const tree = await testRender()

                const returnButton = tree.getByRole('button')

                await act(
                    async () =>
                    {
                        await fireEvent.click(returnButton)
                    }
                )

                expect(mockNavigate).toHaveBeenCalledWith('/practice')
            }
        )
    }
)