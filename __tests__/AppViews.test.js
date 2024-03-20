import React from 'react'
import '@testing-library/jest-dom'
import AppViews from '../src/AppViews'
import { Router } from 'react-router-dom'
import { render, cleanup } from '@testing-library/react'
import { createMemoryHistory } from 'history';
import { act } from 'react-test-renderer'

jest.mock('../src/pages/Home/Home')
import Home from '../src/pages/Home/Home'

jest.mock('../src/pages/Exercises/Exercises')
import Exercises from '../src/pages/Exercises/Exercises'

jest.mock('../src/components/Navbar/Navbar')
import Navbar from '../src/components/Navbar/Navbar'

jest.mock('../src/pages/CreateExercise/CreateExercise')
import CreateExercise from '../src/pages/CreateExercise/CreateExercise'

jest.mock('../src/pages/EditExercise/EditExercise')
import EditExercise from '../src/pages/EditExercise/EditExercise'

jest.mock('../src/CheckuserIsAuthor')
import CheckUserIsAuthor from '../src/CheckuserIsAuthor'

jest.mock('../src/pages/Playlist/Playlist')
import Playlist from '../src/pages/Playlist/Playlist'

jest.mock('../src/pages/Practice/Practice')
import Practice from '../src/pages/Practice/Practice'

jest.mock('../src/pages/DecideWhatToPractice/DecideWhatToPractice')
import DecideWhatToPractice from '../src/pages/DecideWhatToPractice/DecideWhatToPractice'

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
            <div data-testid="navbar"></div>
        )
        CreateExercise.mockReturnValue(
            <div data-testid="create-exercise-page"></div>
        )
        EditExercise.mockReturnValue(
            <div data-testid="edit-exercise-page"></div>
        )
        CheckUserIsAuthor.mockReturnValue(
            <div data-testid="check-user-is-author-page"></div>
        )
        Playlist.mockReturnValue(
            <div data-testid="playlist-page" />
        )
        Practice.mockReturnValue(
            <div data-testid="practice-page" />
        )
        DecideWhatToPractice.mockReturnValue(
            <div data-testid="practice-exercises-page" />
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
                            <AppViews />
                        </Router>
                    )
                }
            )
            return returnRender
        }

        it('displays home page',
            async () =>
            {
                //the element in initialEntries defines what path we're on now
                const history = createMemoryHistory({ initialEntries: ['/'] })
                const tree = await testRender(history)

                expect(tree.getByTestId('home-page')).toBeInTheDocument()
            }
        )

        it('displays exercises page',
            async () =>
            {
                //the element in initialEntries defines what path we're on now
                const history = createMemoryHistory({ initialEntries: ['/exercises'] })
                const tree = await testRender(history)

                expect(tree.getByTestId('exercises-page')).toBeInTheDocument()
            }
        )

        it('displays create exercise page',
            async () =>
            {
                const history = createMemoryHistory({ initialEntries: ['/create-exercise'] })
                const tree = await testRender(history)

                expect(tree.getByTestId('create-exercise-page')).toBeInTheDocument()
            }
        )

        it('displays edit exercise page',
            async () =>
            {
                const history = createMemoryHistory({ initialEntries: ['/edit-exercise/1'] })
                const tree = await testRender(history)

                expect(tree.getByTestId('check-user-is-author-page')).toBeInTheDocument()
            }
        )

        it('displays playlist page',
            async () =>
            {
                const history = createMemoryHistory({ initialEntries: ['/playlist'] })
                const tree = await testRender(history)

                expect(tree.getByTestId('playlist-page')).toBeInTheDocument()
            }
        )

        it('displays practice page',
            async () =>
            {
                const history = createMemoryHistory({ initialEntries: ['/Practice'] })
                const tree = await testRender(history)

                expect(tree.getByTestId('practice-page')).toBeInTheDocument()
            }
        )

        it('displays practice exercises page',
            async () =>
            {
                const history = createMemoryHistory({ initialEntries: ['/practice-exercises'] })
                const tree = await testRender(history)

                expect(tree.getByTestId('practice-exercises-page')).toBeInTheDocument()
            }
        )

        it('displays navbar on other pages',
            async () =>
            {
                //the element in initialEntries defines what path we're on now
                const history1 = createMemoryHistory({ initialEntries: ['/exercises'] })
                const tree1 = await testRender(history1)

                expect(tree1.getByTestId('navbar')).toBeInTheDocument()

                //clears the virtual DOM
                cleanup()

                const history2 = createMemoryHistory({ initialEntries: ['/not/a/real/url'] })
                const tree2 = await testRender(history2)

                expect(tree2.getByTestId('navbar')).toBeInTheDocument()
            }
        )

        it('does not display navbar on home page',
            async () =>
            {
                //the element in initialEntries defines what path we're on now
                const history = createMemoryHistory({ initialEntries: ['/'] })
                const tree = await testRender(history)

                expect(() => { tree.getByTestId('navbar') }).toThrow()
            }
        )
    }
)