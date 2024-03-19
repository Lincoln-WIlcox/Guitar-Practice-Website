import React from 'react'
import '@testing-library/jest-dom'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Practice from '../src/pages/Practice/Practice'
import { act } from 'react-test-renderer'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

const testRender = async () =>
{
    let returnRender
    await act(
        async () =>
        {
            returnRender = await render(<Practice />)
        }
    )
    return returnRender
}

describe('Practice works',
    () =>
    {
        it('renders',
            async () =>
            {
                const tree = await testRender()

                expect(tree.container).toBeInTheDocument()
            }
        )

        it('renders interactable components',
            async () =>
            {
                const tree = await testRender()


            }
        )
    }
)
