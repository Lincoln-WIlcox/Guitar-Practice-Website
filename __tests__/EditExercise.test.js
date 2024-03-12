import React, { useState } from 'react'
import '@testing-library/jest-dom'
import { cleanup, render } from '@testing-library/react'
import { Route, Router, Routes } from 'react-router-dom'
import { act } from 'react-test-renderer'
import EditExercise from '../src/pages/EditExercise.jsx'
import { createMemoryHistory } from 'history'

jest.mock('../src/components/ExerciseFields/ExerciseFields.jsx')
import ExerciseFields from '../src/components/ExerciseFields/ExerciseFields.jsx'


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
    const history = createMemoryHistory({ initialEntries: ['/edit-exercise/1'] })
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

        it('sets state when title changed',
            async () =>
            {
                const setState = jest.fn()

                jest.spyOn(React, 'useState').mockImplementation((init) => [init, setState])

                ExerciseFields.mockImplementation(
                    ({ skills, selectedSkill, onExerciseTitleChanged, onDescriptionChanged, onSkillSelected, onSubmitClicked }) =>
                    {
                        onExerciseTitleChanged("title change")

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
                        onDescriptionChanged("description change")

                        return <></>
                    }
                )

                const tree = await testRender()

                expect(setState).toHaveBeenCalledWith("description change")
            }
        )

        it('sets state when skill changed',
            () =>
            {

            }
        )

        it('calls window.alert when submit button pressed but missing state',
            () =>
            {

            }
        )

        it('calls changeExercise when submit button pressed and ',
            () =>
            {

            }
        )

    }
)