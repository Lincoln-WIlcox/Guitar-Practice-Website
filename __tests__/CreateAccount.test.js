import React from 'react'
import '@testing-library/jest-dom'
import CreateAccount from '../src/pages/CreateAccount'
import { Router, Routes } from 'react-router-dom'
import { render, cleanup } from '@testing-library/react'
import { createMemoryHistory } from 'history';
import { act } from 'react-test-renderer'

let currentUser = { id: 1, username: "lincolnpepper" }

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
    let returnValue
    await act(
        () =>
        {
            returnValue = render(<CreateAccount />)
        }
    )
    return returnValue
}

describe('CreateAccount works',
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