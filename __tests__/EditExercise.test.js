import React, { useEffect, useState } from 'react'
import '@testing-library/jest-dom'
import { cleanup, render } from '@testing-library/react'
import { Route, Router, Routes } from 'react-router-dom'
import { act } from 'react-test-renderer'
import EditExercise from '../src/pages/EditExercise.jsx'
import { createMemoryHistory } from 'history'

jest.mock('../src/components/ExerciseFields/ExerciseFields.jsx')
import ExerciseFields from '../src/components/ExerciseFields/ExerciseFields.jsx'

jest.mock('../src/services/exerciseServices.js')
import { getExerciseById, changeExercise } from '../src/services/exerciseServices.js'

const mockNavigate = jest.fn()

jest.mock('react-router-dom',
    () =>
    (
        {
            __esModule: true,
            ...(jest.requireActual('react-router-dom')),
            useNavigate: () => mockNavigate
        }
    )
)


const fakeExercise =
{
    "id": 2,
    "userId": 2,
    "skillId": 2,
    "name": "Exercise 2",
    "description": "Test"
}

beforeEach(
    () =>
    {
        getExerciseById.mockImplementation(async () => fakeExercise)
        changeExercise.mockImplementation(async () => { })
    }
)

afterEach(
    () =>
    {
        cleanup()
        jest.restoreAllMocks()
        jest.clearAllMocks()
    }
)

const testRender = async () =>
{
    let returnRender
    const history = createMemoryHistory({ initialEntries: ['/edit-exercise/2'] })
    await act(
        async () =>
        {
            returnRender = render(
                <Router location={history.location} navigator={history}>
                    <Routes>
                        <Route path="edit-exercise">
                            <Route path=":exerciseId" element={<EditExercise />} />
                        </Route>
                    </Routes>
                </Router>
            )
        }
    )
    return returnRender
}

describe('EditExercise component works',
    () =>
    {

        it('renders EditExercise',
            async () =>
            {
                const tree = await testRender()

                expect(tree.container).toBeInTheDocument()
            }
        )

        it('renders ExerciseField',
            async () =>
            {
                const tree = await testRender()

                expect(ExerciseFields).toHaveBeenCalled()
            }
        )

        it('gets corresponding exercise using url parameter',
            async () =>
            {
                const tree = await testRender()

                expect(getExerciseById).toHaveBeenCalledWith("2")
            }
        )

        it('sets state to gotten exercise',
            async () =>
            {
                const tree = await testRender()

                expect(ExerciseFields.mock.calls[ExerciseFields.mock.calls.length - 1][0]["title"]).toBe("Exercise 2")
                expect(ExerciseFields.mock.calls[ExerciseFields.mock.calls.length - 1][0]["description"]).toBe("Test")
                expect(ExerciseFields.mock.calls[ExerciseFields.mock.calls.length - 1][0]["skill"]).toBe(2)
            }
        )

        it('sets state when title changed',
            async () =>
            {
                const setState = jest.fn()

                jest.spyOn(React, 'useState').mockImplementation((init) => [init, setState])

                ExerciseFields.mockImplementation(
                    ({ skills, selectedSkill, onExerciseTitleChanged, onDescriptionChanged, onSkillSelected, onSubmitClicked }) =>
                    {
                        useEffect(
                            () =>
                            {
                                onExerciseTitleChanged("title change")
                            }, []
                        )

                        return <></>
                    }
                )

                const tree = await testRender()

                expect(setState).toHaveBeenCalledWith("title change")
            }
        )

        it('sets state when description changed',
            async () =>
            {
                const setState = jest.fn()

                jest.spyOn(React, 'useState').mockImplementation((init) => [init, setState])

                ExerciseFields.mockImplementation(
                    ({ skills, selectedSkill, onExerciseTitleChanged, onDescriptionChanged, onSkillSelected, onSubmitClicked }) =>
                    {
                        useEffect(
                            () =>
                            {
                                onDescriptionChanged("description change")
                            }, []
                        )

                        return <></>
                    }
                )

                const tree = await testRender()

                expect(setState).toHaveBeenCalledWith("description change")
            }
        )

        it('sets state when skill changed',
            async () =>
            {
                const setState = jest.fn()

                jest.spyOn(React, 'useState').mockImplementation((init) => [init, setState])

                ExerciseFields.mockImplementation(
                    ({ skills, selectedSkill, onExerciseTitleChanged, onDescriptionChanged, onSkillSelected, onSubmitClicked }) =>
                    {
                        useEffect(
                            () =>
                            {
                                onSkillSelected(1)
                            }, []
                        )

                        return <></>
                    }
                )

                const tree = await testRender()

                expect(setState).toHaveBeenCalledWith(1)
            }
        )

        it('calls window.alert when submit button pressed but missing state',
            async () =>
            {
                window.alert = jest.fn()

                ExerciseFields.mockImplementation(
                    ({ skills, skill, onExerciseTitleChanged, onDescriptionChanged, onSkillSelected, onSubmitClicked }) =>
                    {
                        useEffect(
                            () =>
                            {
                                onExerciseTitleChanged("title change")
                                onSkillSelected(1)
                            }, []
                        )

                        useEffect(
                            () =>
                            {
                                onSubmitClicked()
                            }, [skill]
                        )

                        return <></>
                    }
                )

                const tree = await testRender()

                expect(window.alert).toHaveBeenCalled()
            }
        )

        it('calls changeExercise when submit button pressed, passing a new changeExercise ',
            async () =>
            {
                window.alert = jest.fn()

                ExerciseFields.mockImplementation(
                    ({ skills, skill, onExerciseTitleChanged, onDescriptionChanged, onSkillSelected, onSubmitClicked }) =>
                    {
                        useEffect(
                            () =>
                            {
                                onExerciseTitleChanged("title change")
                                onDescriptionChanged("description change")
                                onSkillSelected(1)
                            }, []
                        )

                        useEffect(
                            () =>
                            {
                                onSubmitClicked()
                            }, [skill]
                        )

                        return <></>
                    }
                )

                const tree = await testRender()

                expect(changeExercise).toHaveBeenCalledWith(
                    {
                        "description": "Test",
                        "name": "Exercise 2",
                        "skillId": 2,
                        "userId": 1,
                    }
                )

                expect(mockNavigate).toHaveBeenCalledWith("/exercises")
            }
        )

    }
)