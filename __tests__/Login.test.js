import React from 'react'
import '@testing-library/jest-dom'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Home from '../src/pages/Home'
import { fireEvent, render, cleanup } from '@testing-library/react'
import Login from '../src/pages/Login'
import { act } from 'react-test-renderer'

jest.mock('../src/services/userService')
import { getUserByUsername } from '../src/services/userService'

jest.mock('react-router-dom')
import { useNavigate } from 'react-router-dom'

const fakeUser =
    [
        {
            "id": 1,
            "username": "user1"
        }
    ]

const fakeNavigate = jest.fn()

beforeEach(
    () =>
    {
        useNavigate.mockImplementation(() => fakeNavigate)
        getUserByUsername.mockImplementation(async () => fakeUser)
    }
)

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
        () =>
        {
            returnRender = render(
                <Login />
            )
        }
    )
    return returnRender
}

describe('Login works',
    () =>
    {
        it('renders',
            async () =>
            {
                const tree = await testRender()

                expect(tree.container).toBeInTheDocument()
            }
        )

        it('contains username field',
            async () =>
            {
                const tree = await testRender()

                const usernameField = tree.getByRole('textbox')

                expect(usernameField).toBeInTheDocument()
            }
        )

        it('contains a log in button',
            async () =>
            {
                const tree = await testRender()

                const logInButton = tree.getByRole('button', { name: /log in/i })

                expect(logInButton).toBeInTheDocument()
            }
        )

        it('contains a create account button',
            async () =>
            {
                const tree = await testRender()

                const createAccountButton = tree.getByRole('button', { name: /create account/i })
                expect(createAccountButton).toBeInTheDocument()
            }
        )

        it('stores input into username field as state',
            async () =>
            {
                const setState = jest.fn()

                jest.spyOn(React, 'useState').mockImplementation((init) => [init, setState])

                const tree = await testRender()

                const usernameField = tree.getByRole('textbox')
                act(
                    () =>
                    {
                        fireEvent.change(usernameField, { target: { value: "test change" } })
                    }
                )


                expect(setState).toHaveBeenCalledWith('test change')
            }
        )

        it('sets local storage with user when username is given and navigates to home',
            async () =>
            {
                const spy = jest.spyOn(Object.getPrototypeOf(localStorage), 'setItem')
                Object.setPrototypeOf(localStorage.setItem, jest.fn())

                const tree = await testRender()

                const usernameField = tree.getByRole('textbox')

                act(
                    () =>
                    {
                        fireEvent.change(usernameField, { target: { value: "user1" } })
                    }
                )

                const logInButton = tree.getByRole('button', { name: /log in/i })

                await act(
                    async () =>
                    {
                        await fireEvent.click(logInButton)
                    }
                )

                expect(getUserByUsername).toHaveBeenCalled()
                expect(localStorage.setItem).toHaveBeenCalled()
                expect(fakeNavigate).toHaveBeenCalledWith("/")
            }
        )

        it('calls window alert when log in button pressed but username is invalid',
            () =>
            {

            }
        )

    }
)