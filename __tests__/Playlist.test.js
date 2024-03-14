import React from 'react'
import '@testing-library/jest-dom'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { fireEvent, render, cleanup } from '@testing-library/react'
import Playlist from '../src/pages/Playlist'
import { act } from 'react-test-renderer'

jest.mock('../src/components/MiniExercise/MiniExercise.jsx')
import MiniExercise from '../src/components/MiniExercise/MiniExercise.jsx'

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
        "userId": 1,
        "exerciseId": 2
    }
]

beforeEach(
    async () =>
    {
        getExercises.mockImplementation(async () => fakeExercises)

        getUserExercisesByUserId.mockImplementation(async () => fakeUserExercises)

        removeUserExercise.mockImplementation(async () => { })
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
            returnRender = render(<Playlist exercises={fakeExercises} />)
        }
    )
    return returnRender
}

describe('Playlist works',
    () =>
    {
        it('renders',
            async () =>
            {
                const tree = await testRender()

                expect(tree.container).toBeInTheDocument()
            }
        )

        it('renders interactable elements',
            async () =>
            {
                const tree = await testRender()

                const removeFromPlaylistButton = tree.getByRole('button', { name: "remove from playlist" })

                expect(MiniExercise).toHaveBeenCalled()
                expect(removeFromPlaylistButton).toBeInTheDocument()
            }
        )

        it('renders correct mini exercises',
            async () =>
            {
                const tree = await testRender()

                
            }
        )

    }
)