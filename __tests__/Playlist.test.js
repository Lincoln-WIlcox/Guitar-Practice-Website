import React from 'react'
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/react'
import Playlist from '../src/pages/Playlist'
import { act } from 'react-test-renderer'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

jest.mock('../src/components/PlaylistExerciseList/PlaylistExerciseList')
import PlaylistExerciseList from '../src/components/PlaylistExerciseList/PlaylistExerciseList'

jest.mock('../src/services/userExerciseService')
import { getUserExercisesByUserId } from '../src/services/userExerciseService'

jest.mock('../src/services/exerciseServices')
import { getExercisesByUserId } from '../src/services/exerciseServices'

jest.mock('../src/services/skillsService')
import { getSkillById } from '../src/services/skillsService'

let currentUser = { id: 1, username: "lincolnpepper" }

const fakeExercises = [
    {
        "userId": 1,
        "exerciseId": 4,
        "id": 27,
        "exercise": {
            "name": "Add Exercise",
            "description": "Add an exercise to complete this exercise.",
            "skillId": "2",
            "userId": 1,
            "id": 4
        }
    },
    {
        "userId": 1,
        "exerciseId": 7,
        "id": 29,
        "exercise": {
            "id": 7,
            "name": "my brand new exercise title!",
            "description": "this should be perfectly editable... and it is!",
            "skillId": "2",
            "userId": 1
        }
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
        getUserExercisesByUserId.mockImplementation(async () => fakeUserExercises)
        getExercisesByUserId.mockImplementation(async () => fakeExercises)
        
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
                        <Route path="/" element={<Playlist currentUser={currentUser} exercises={fakeExercises} />} />
                    </Routes>
                </MemoryRouter>
            )
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

        it('renders exercise list',
            async () =>
            {
                const tree = await testRender()

                expect(PlaylistExerciseList).toHaveBeenCalled()
            }
        )

        it('passes exercises by the user to exercises list',
            async () =>
            {
                const tree = await testRender()

                expect(PlaylistExerciseList.mock.calls[PlaylistExerciseList.mock.calls.length - 1][0]["exercises"]).toEqual(
                    [
                        {
                            "name": "Add Exercise",
                            "description": "Add an exercise to complete this exercise.",
                            "skillId": "2",
                            "userId": 1,
                            "id": 4
                        },
                        {
                            "id": 7,
                            "name": "my brand new exercise title!",
                            "description": "this should be perfectly editable... and it is!",
                            "skillId": "2",
                            "userId": 1
                        }
                    ]
                )
            }
        )
    }
)