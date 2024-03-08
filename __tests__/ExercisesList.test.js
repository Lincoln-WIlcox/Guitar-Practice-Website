import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ExercisesList from '../src/components/ExercisesList/ExercisesList.jsx'
import { act } from 'react-test-renderer'

jest.mock('../src/services/exerciseServices.js')
import { getExercises } from '../src/services/exerciseServices.js'

jest.mock('../src/components/MiniExercise/MiniExercise.jsx')
import MiniExercise from '../src/components/MiniExercise/MiniExercise.jsx'

jest.mock('../src/services/userExerciseService.js')
import { addUserExercise, getUserExercisesByUserId, removeUserExercise } from '../src/services/userExerciseService.js'

const fakeExercises = [
    {
        "id": 1,
        "userId": 1,
        "skillId": 1,
        "name": "Exercise 1",
        "description": "Test",
        "hidden": false
    },
    {
        "id": 2,
        "userId": 2,
        "skillId": 2,
        "name": "Exercise 2",
        "description": "Test",
        "hidden": true
    },
    {
        "id": 3,
        "userId": 1,
        "skillId": 2,
        "name": "Exercise 3",
        "description": "Test",
        "hidden": true
    }
]

const fakeUserExercises = [
    {
        "id": 1,
        "userId": 1,
        "exerciseId": 1
    },
    {
        "id": 2,
        "userId": 2,
        "exerciseId": 2
    }
]

beforeEach(
    async () =>
    {
        getExercises.mockImplementation(
            async () =>
            {
                return fakeExercises
            }
        )

        getUserExercisesByUserId.mockImplementation(async () => fakeUserExercises)
    }
)

afterEach(
    () =>
    {
        cleanup()
        jest.clearAllMocks()
    }
)

const testRender = async () =>
{
    let renderReturn
    await act(
        async () =>
        {
            renderReturn = await render(
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<ExercisesList exercises={fakeExercises} />} />
                    </Routes>
                </MemoryRouter>
            )
        }
    )
    return renderReturn
}

describe('ExerciseList works',
    () =>
    {

        it('should render exercise',
            async () =>
            {
                const tree = await testRender()

                expect(tree.container).toBeInTheDocument()
            }
        )

        it('makes a mini exercise for each exercise gotten',
            async () =>
            {
                const tree = await testRender()

                expect(MiniExercise).toHaveBeenCalled()
            }
        )

        it('should get userExercises by userId',
            async () =>
            {
                const tree = await testRender()

                expect(getUserExercisesByUserId).toHaveBeenCalled()
            }
        )

        it('creates a button for adding to playlist',
            async () =>
            {
                const tree = await testRender()

                const addToPlaylistButton = tree.getAllByRole('button')[0]

                expect(addToPlaylistButton).toBeInTheDocument()
            }
        )

        it('calls add user exercise when add to playlist is clicked, passing a user exercise object',
            async () =>
            {
                const tree = await testRender()

                const addToPlaylistButton = tree.getAllByRole('button', { name: /add to playlist/i })[0]
                await act(
                    async () =>
                    {
                        await fireEvent.click(addToPlaylistButton)
                    }
                )

                expect(addUserExercise).toHaveBeenCalledWith(
                    {
                        userId: 1,
                        exerciseId: 2
                    }
                )
            }
        )

        it('should say remove from playlist if exercise is already in a user playlist',
            async () =>
            {
                const tree = await testRender()

                const removeFromPlaylistButton = tree.getAllByRole('button', { name: /remove from playlist/i })[0]

                expect(removeFromPlaylistButton).toBeInTheDocument()
            }
        )

        it('should call removeUserExercise when remove from playlist is clicked, passing userExercise id',
            async () =>
            {
                const tree = await testRender()

                const removeFromPlaylistButton = tree.getAllByRole('button', { name: /remove from playlist/i })[0]
                await act(
                    async () =>
                    {
                        await fireEvent.click(removeFromPlaylistButton)
                    }
                )

                expect(removeUserExercise).toHaveBeenCalledWith(1)
            }
        )

        it('should fetch userExercises again after adding to playlist',
            async () =>
            {
                const tree = await testRender()

                const addToPlaylistButton = tree.getAllByRole('button', { name: /add to playlist/i })[0]
                await act(
                    async () =>
                    {
                        await fireEvent.click(addToPlaylistButton)
                    }
                )

                expect(getUserExercisesByUserId).toHaveBeenCalledTimes(2)
            }
        )

        it('should fetch userExercises again after removing from playlist',
            async () =>
            {   
                const tree = await testRender()

                const removeFromPlaylistButton = tree.getAllByRole('button', { name: /remove from playlist/i })[0]
                await act(
                    async () =>
                    {
                        await fireEvent.click(removeFromPlaylistButton)
                    }
                )

                expect(getUserExercisesByUserId).toHaveBeenCalledTimes(2)
            }
        )
    }
)