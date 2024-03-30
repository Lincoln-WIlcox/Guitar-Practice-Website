import React from 'react'
import '@testing-library/jest-dom'
import { render, cleanup, fireEvent } from '@testing-library/react'
import PlaylistExerciseList from '../src/components/PlaylistExerciseList/PlaylistExerciseList'
import { act } from 'react-test-renderer'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

jest.mock('../src/components/MiniExercise/MiniExercise.jsx')
import MiniExercise from '../src/components/MiniExercise/MiniExercise.jsx'

jest.mock('../src/services/userExerciseService.js')
import { getUserExercisesByUserId, removeUserExercise, getUserExerciseByUserIdAndExerciseId } from '../src/services/userExerciseService.js'

jest.mock('../src/services/exerciseCompletionService.js')
import { getCompletedExerciseByExerciseIdAndUserId } from '../src/services/exerciseCompletionService.js'

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

let currentUser = { id: 1, username: "lincolnpepper" }

const onUserExercisesChanged = jest.fn().mockImplementation(async () => { })

beforeEach(
    () =>
    {
        getUserExercisesByUserId.mockImplementation(async () => fakeUserExercises)
        removeUserExercise.mockImplementation(async () => { })
        getUserExerciseByUserIdAndExerciseId.mockImplementation(async () => fakeUserExercises)
        getCompletedExerciseByExerciseIdAndUserId.mockImplementation(async () => fakeCompletedExercise)
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
        async () =>
        {
            returnRender = await render(
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<PlaylistExerciseList exercises={fakeExercises} currentUser={currentUser} />} />
                    </Routes>
                </MemoryRouter>
            )
        }
    )
    return returnRender
}

describe('PlaylistExerciseList works',
    () =>
    {
        it('renders',
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

        it('creates a button to edit if the exercise was created by this user',
            async () =>
            {
                const tree = await testRender()

                const editButton = tree.getAllByTestId('edit')[0]

                expect(editButton).toBeInTheDocument()
            }
        )

        it('creates a button to remove from playlist',
            async () =>
            {
                const tree = await testRender()

                const removeFromPlaylistButton = tree.getAllByTestId('remove')[0]

                expect(removeFromPlaylistButton).toBeInTheDocument()
            }
        )

        it('should call removeUserExercise when remove from playlist is clicked, passing userExercise id',
            async () =>
            {
                const tree = await testRender()

                const removeFromPlaylistButton = tree.getAllByTestId('remove')[0]
                await act(
                    async () =>
                    {
                        await fireEvent.click(removeFromPlaylistButton)
                    }
                )

                expect(removeUserExercise).toHaveBeenCalledWith(1)
            }
        )



    }
)