import React from 'react'
import '@testing-library/jest-dom'
import App from '../src/App'
import { Router } from 'react-router-dom'
import { render, cleanup } from '@testing-library/react'
import { createMemoryHistory } from 'history';

jest.mock('../src/pages/Home')
import Home from '../src/pages/Home'

jest.mock('../src/pages/Exercises')
import Exercises from '../src/pages/Exercises'

jest.mock('../src/components/Navbar/Navbar')
import Navbar from '../src/components/Navbar/Navbar'

beforeEach(
    () =>
    {
        Home.mockReturnValue(
            <div data-testid="home-page"></div>
        )
        Exercises.mockReturnValue(
            <div data-testid="exercises-page"></div>
        )
        Navbar.mockReturnValue(
            <div data-testid="Navbar"></div>
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
        const testRender = (history) =>
        {
            return render(
                //location and navigator tell router what path its on.
                <Router location={history.location} navigator={history}>
                    <App />
                </Router>
            )
        }

        it('displays home page',
            () =>
            {
                //the element in initialEntries defines what path we're on now
                const history = createMemoryHistory({ initialEntries: ['/'] });
                const tree = testRender(history)

                expect(tree.getByTestId('home-page')).toBeInTheDocument()
            }
        )

        it('displays exercises page',
            () =>
            {
                //the element in initialEntries defines what path we're on now
                const history = createMemoryHistory({ initialEntries: ['/exercises'] });
                const tree = testRender(history)

                expect(tree.getByTestId('exercises-page')).toBeInTheDocument()
            }
        )

        it('displays navbar on other pages',
            () =>
            {
                //the element in initialEntries defines what path we're on now
                const history1 = createMemoryHistory({ initialEntries: ['/exercises'] })
                const tree1 = testRender(history1)

                expect(tree1.getByTestId('Navbar')).toBeInTheDocument()

                //clears the virtual DOM
                cleanup()

                const history2 = createMemoryHistory({ initialEntries: ['/not/a/real/url'] })
                const tree2 = testRender(history2)

                expect(tree2.getByTestId('Navbar')).toBeInTheDocument()
            }
        )

        it(('does not display navbar on home page'),
            () =>
            {
                //the element in initialEntries defines what path we're on now
                const history = createMemoryHistory({ initialEntries: ['/'] })
                const tree = testRender(history)

                expect(() => { tree.getByTestId('Navbar') }).toThrow()
            }
        )
    }
)