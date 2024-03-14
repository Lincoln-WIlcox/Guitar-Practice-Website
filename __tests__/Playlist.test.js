import React from 'react'
import '@testing-library/jest-dom'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { fireEvent, render, cleanup } from '@testing-library/react'
import Playlist from '../src/pages/Playlist'
import { act } from 'react-test-renderer'

jest.mock('../src/components/ExercisesList/ExercisesList')
import ExercisesList from '../src/components/ExercisesList/ExercisesList'

jest.mock('../src/services/userExerciseService')
import { getUserExercisesByUserId } from '../src/services/userExerciseService'

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
        getUserExercisesByUserId.mockImplementation(async () => fakeExercises)
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
            returnRender = await render(<Playlist currentUser={currentUser} exercises={fakeExercises} />)
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

                expect(ExercisesList).toHaveBeenCalled()
            }
        )

        it('passes exercises by the user to exercises list',
            async () =>
            {
                const tree = await testRender()

                expect(ExercisesList).toHaveBeenCalledWith(
                    {
                        exercises:
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
                    }, {}
                )
            }
        )

    }
)