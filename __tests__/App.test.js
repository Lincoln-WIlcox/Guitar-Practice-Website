import React from 'react'
import '@testing-library/jest-dom'
import App from '../src/App.jsx'
import { Router, Routes } from 'react-router-dom'
import { render, cleanup } from '@testing-library/react'
import { createMemoryHistory } from 'history';
import { act } from 'react-test-renderer'

jest.mock('../src/pages/Login')
import Login from '../src/pages/Login'

jest.mock('../src/pages/CreateAccount')
import CreateAccount from '../src/pages/CreateAccount'

beforeEach(
    () =>
    {
        Login.mockReturnValue(
            <div data-testid="login-page"></div>
        )
        CreateAccount.mockReturnValue(
            <div data-testid="create-account-page" />
        )
    }
)

afterEach(
    () =>
    {
        cleanup()
        jest.clearAllMocks()
    }
)

describe('pages should render when navigated to',
    () =>
    {
        const testRender = async (history) =>
        {
            let returnRender
            await act(
                async () =>
                {
                    returnRender = await render(
                        //location and navigator tell router what path its on.
                        <Router location={history.location} navigator={history}>
                            <App />
                        </Router>
                    )
                }
            )
            return returnRender
        }

        it('displays the login page',
            async () =>
            {
                const history = createMemoryHistory({ initialEntries: ["/login"] })
                const tree = await testRender(history)

                expect(tree.getByTestId('login-page')).toBeInTheDocument()
            }
        )

        it('displays create account page',
            async () =>
            {
                const history = createMemoryHistory({ initialEntries: ['/create-account'] })
                const tree = await testRender(history)

                expect(tree.getByTestId('create-account-page')).toBeInTheDocument()
            }
        )
    }
)