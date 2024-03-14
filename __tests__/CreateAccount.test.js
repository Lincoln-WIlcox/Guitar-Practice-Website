import React from 'react'
import '@testing-library/jest-dom'
import CreateAccount from '../src/pages/CreateAccount'
import { Router, Routes } from 'react-router-dom'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history';
import { act } from 'react-test-renderer'

jest.mock('../src/services/userService')
import { createAccount } from '../src/services/userService'

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

        it('creates all interactables',
            async () =>
            {
                const tree = await testRender()

                const usernameField = tree.getByRole('textbox')
                const createAccountButton = tree.getByRole('button', { name: /create account/i })
                const logInButton = tree.getByRole('button', { name: /log in/i })
                expect(usernameField).toBeInTheDocument()
                expect(createAccountButton).toBeInTheDocument()
                expect(logInButton).toBeInTheDocument()
            }
        )

        it('creates an account when create account button is pressed and username field is valid, then navigates to log in page',
            async () =>
            {
                const mockNavigate = jest.fn()
                jest.spyOn(React, 'useNavigate').mockImplementation(() => mockNavigate)

                const testUser = { username: "test username" }

                const tree = await testRender()

                const usernameField = tree.getByRole('textbox')
                const createAccountButton = tree.getByRole('button', { name: /create account/i })

                await act(
                    async () =>
                    {
                        await fireEvent.change(usernameField, { target: { value: testUser.username } })
                    }
                )

                await act(
                    async () =>
                    {
                        await fireEvent.click(createAccountButton)
                    }
                )

                expect(createAccount).toHaveBeenCalledWith(testUser)
                expect(mockNavigate).toHaveBeenCalledWith("/login")
            }
        )

        it('calls window alert when create account is pressed but username is not valid',
            async () =>
            {
                window.alert = jest.fn()

                const tree = await testRender()

                const createAccountButton = tree.getByRole('button', { name: /create account/i })

                await act(
                    async () =>
                    {
                        await fireEvent.click(createAccountButton)
                    }
                )

                expect(window.alert).toHaveBeenCalled()
            }
        )

        it('calls navigate, passing correct url',
            async () =>
            {
                const mockNavigate = jest.fn()
                jest.spyOn(React, 'useNavigate').mockImplementation(() => mockNavigate)

                const tree = await testRender()

                const logInButton = tree.getByRole('button', { name: /log in/i })

                await act(
                    async () =>
                    {
                        await fireEvent.click(logInButton)
                    }
                )

                expect(mockNavigate).toHaveBeenCalledWith("/login")
            }
        )

    }
)