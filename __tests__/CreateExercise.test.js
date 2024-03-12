import React, { useEffect, useState } from 'react'
import '@testing-library/jest-dom'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { act } from 'react-test-renderer'
import CreateExercise from '../src/pages/CreateExercise'

jest.mock('../src/services/skillsService')
import { getSkills } from '../src/services/skillsService'

jest.mock('../src/services/exerciseServices')
import { addExercise } from '../src/services/exerciseServices'

jest.mock('../src/components/ExerciseFields/ExerciseFields')
import ExerciseFields from '../src/components/ExerciseFields/ExerciseFields'

const mockNavigate = jest.fn()

jest.mock('react-router-dom',
    () =>
    {
        const originalModule = jest.requireActual('react-router-dom');

        return {
            __esModule: true,
            ...originalModule,
            useNavigate: () =>
            {
                return mockNavigate
            }
        }
    }
)

const fakeSkills = [
    {
        "id": 1,
        "skill": "skill 1"
    },
    {
        "id": 2,
        "skill": "skill 2"
    },
    {
        "id": 3,
        "skill": "skill 3"
    }
]

beforeEach(
    () =>
    {
        ExerciseFields.mockImplementation(
            ({ skills, selectedSkill, onExerciseTitleChanged, onDescriptionChanged, onSkillSelected, onSubmitClicked }) =>
            {
                return <></>
            }
        )

        getSkills.mockImplementation(async () => fakeSkills)

        addExercise.mockImplementation(async () => { })
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
            returnRender = render(
                <MemoryRouter>
                    <Routes>
                        <Route path="/">
                            <Route index element={<CreateExercise />} />
                            <Route path="/exercises" element={<div data-testid="exercises-page"></div>} />
                        </Route>
                    </Routes>
                </MemoryRouter>
            )
        }
    )
    return returnRender
}

describe('CreateExercise works',
    () =>
    {

        it('renders',
            async () =>
            {
                const tree = await testRender()

                expect(tree.container).toBeInTheDocument()
            }
        )

        it('creates an ExerciseFields',
            async () =>
            {
                const tree = await testRender()

                expect(ExerciseFields).toHaveBeenCalled()
            }
        )

        it('gets skills and passes them to ExerciseFields',
            async () =>
            {
                const tree = await testRender()

                expect(getSkills).toHaveBeenCalled()
                expect(ExerciseFields.mock.calls[ExerciseFields.mock.calls.length - 1][0]["skills"]).toBe(fakeSkills)
            }
        )

        it('updates state on title changed',
            async () =>
            {
                ExerciseFields.mockImplementation(
                    ({ skills, selectedSkill, onExerciseTitleChanged, onDescriptionChanged, onSkillSelected, onSubmitClicked }) =>
                    {
                        onExerciseTitleChanged("title change")
                        return <></>
                    }
                )

                //this creates a mock set state function
                const setStateMock = jest.fn()

                //this creates a mock use state function
                const useStateMock = (useState) => [useState, setStateMock]

                //this replaces calls for use state with calls for our use state function, which will return our set state mock. Whenever the component sets state, it will call our set state mock instead.
                jest.spyOn(React, 'useState').mockImplementation(useStateMock)

                const tree = await testRender()

                expect(setStateMock).toHaveBeenCalledWith("title change")
            }
        )

        it('updates state on description changed',
            async () =>
            {
                ExerciseFields.mockImplementation(
                    ({ skills, selectedSkill, onExerciseTitleChanged, onDescriptionChanged, onSkillSelected, onSubmitClicked }) =>
                    {
                        onDescriptionChanged("description change")
                        return <></>
                    }
                )

                //this creates a mock set state function
                const setStateMock = jest.fn()

                //this creates a mock use state function
                const useStateMock = (useState) => [useState, setStateMock]

                //this replaces calls for use state with calls for our use state function, which will return our set state mock. Whenever the component sets state, it will call our set state mock instead.
                jest.spyOn(React, 'useState').mockImplementation(useStateMock)

                const tree = await testRender()

                expect(setStateMock).toHaveBeenCalledWith("description change")
            }
        )

        it('updates state on skill changes',
            async () =>
            {
                ExerciseFields.mockImplementation(
                    ({ skills, selectedSkill, onExerciseTitleChanged, onDescriptionChanged, onSkillSelected, onSubmitClicked }) =>
                    {
                        onSkillSelected(fakeSkills[0].id)
                        return <></>
                    }
                )

                //this creates a mock set state function
                const setStateMock = jest.fn()

                //this creates a mock use state function
                const useStateMock = (useState) => [useState, setStateMock]

                //this replaces calls for use state with calls for our use state function, which will return our set state mock. Whenever the component sets state, it will call our set state mock instead.
                jest.spyOn(React, 'useState').mockImplementation(useStateMock)

                const tree = await testRender()

                expect(setStateMock).toHaveBeenCalledWith(fakeSkills[0].id)
            }
        )
        

        
        it('calls create exercise, passing state, and navigates to the exercises page when submit button pressed and state is valid',
            async () =>
            {
                window.alert = jest.fn()

                ExerciseFields.mockImplementation(
                    ({ skills, selectedSkill, onExerciseTitleChanged, onDescriptionChanged, onSkillSelected, onSubmitClicked }) =>
                    {
                        useEffect(
                            () =>
                            {
                                onExerciseTitleChanged("title change")
                                onDescriptionChanged("description change")
                                onSkillSelected(fakeSkills[0].id)
                            }, []
                        )

                        useEffect(
                            () =>
                            {
                                onSubmitClicked()
                            }, [selectedSkill]
                        )
                        
                        return <></>
                    }
                )

                const tree = await testRender()

                expect(addExercise).toHaveBeenCalledWith({ skillId: 1, description: "description change", name: "title change", userId: 1 })
                expect(mockNavigate).toHaveBeenCalledWith("/exercises")
            }
        )
            
        
        it('does a window alert when submit button pressed while missing state',
            async () =>
            {
                window.alert = jest.fn()

                ExerciseFields.mockImplementation(
                    ({ skills, selectedSkill, onExerciseTitleChanged, onDescriptionChanged, onSkillSelected, onSubmitClicked }) =>
                    {
                        useEffect(
                            () =>
                            {
                                onExerciseTitleChanged("title change")
                                onDescriptionChanged("description change")
                            }, []
                        )

                        useEffect(
                            () =>
                            {
                                onSubmitClicked()
                            }, [selectedSkill]
                        )
                        
                        return <></>
                    }
                )

                const tree = await testRender()

                expect(window.alert).toHaveBeenCalled()
            }
        )
    
    }
)
