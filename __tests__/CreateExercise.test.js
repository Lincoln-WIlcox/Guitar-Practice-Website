import React, { useEffect, useState } from 'react'
import '@testing-library/jest-dom'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { act } from 'react-test-renderer'
import CreateExercise from '../src/pages/CreateExercise'

jest.mock('../src/components/SkillSelect/SkillSelect')
import SkillSelect from '../src/components/SkillSelect/SkillSelect'

jest.mock('../src/services/skillsService')
import { getSkills } from '../src/services/skillsService'

jest.mock('../src/services/exerciseServices')
import { addExercise } from '../src/services/exerciseServices'

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
        getSkills.mockImplementation(async () => fakeSkills)

        SkillSelect.mockImplementation(
            ({ selectedSkill, skills, onSkillSelected }) =>
            {
                return <select>
                    <option value={1} key={1}>skill 1</option>
                    <option value={2} key={2}>skill 2</option>
                </select>
            }
        )

        addExercise.mockImplementation(async () => {})
    }
)

afterEach(
    () =>
    {
        cleanup
        jest.clearAllMocks()
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
        /*
        it('renders',
            async () =>
            {
                const tree = await testRender()

                expect(tree.container).toBeInTheDocument()
            }
        )

        it('creates title field',
            async () =>
            {
                const tree = await testRender()

                const titleField = tree.getByPlaceholderText(/Exercise Title/i)
                expect(titleField).toBeInTheDocument()
            }
        )

        it('creates description field',
            async () =>
            {
                const tree = await testRender()

                const descriptionField = tree.getByPlaceholderText(/Exercise Description/i)
                expect(descriptionField).toBeInTheDocument()
            }
        )

        it('contains a dropdown for skill',
            async () =>
            {
                const tree = await testRender()

                const skillDropdown = tree.getByRole('combobox')
                expect(skillDropdown).toBeInTheDocument()
            }
        )

        it('contains a button to submit',
            async () =>
            {
                const tree = await testRender()

                const submitButton = tree.getByRole('button')
                expect(submitButton).toBeInTheDocument()
            }
        )

        it('gets skills and passes them to skill select',
            async () =>
            {
                const tree = await testRender()

                expect(getSkills).toHaveBeenCalled()
                expect(SkillSelect.mock.calls[SkillSelect.mock.calls.length - 1][0]["skills"]).toBe(fakeSkills)
            }
        )

        it('updates state on title changed',
            async () =>
            {
                //this creates a mock set state function
                const setStateMock = jest.fn()

                //this creates a mock use state function
                const useStateMock = (useState) => [useState, setStateMock]

                //this replaces calls for use state with calls for our use state function, which will return our set state mock. Whenever the component sets state, it will call our set state mock instead.
                jest.spyOn(React, 'useState').mockImplementation(useStateMock)

                const tree = await testRender()

                const titleField = tree.getByPlaceholderText(/Exercise Title/i)
                fireEvent.change(titleField, { target: { value: "title change" } })

                expect(setStateMock).toHaveBeenCalledWith("title change")
            }
        )

        it('updates state on description changed',
            async () =>
            {
                //this creates a mock set state function
                const setStateMock = jest.fn()

                //this creates a mock use state function
                const useStateMock = (useState) => [useState, setStateMock]

                //this replaces calls for use state with calls for our use state function, which will return our set state mock. Whenever the component sets state, it will call our set state mock instead.
                jest.spyOn(React, 'useState').mockImplementation(useStateMock)

                const tree = await testRender()

                const descriptionField = tree.getByPlaceholderText(/Exercise Description/i)
                fireEvent.change(descriptionField, { target: { value: "description change" } })

                expect(setStateMock).toHaveBeenCalledWith("description change")
            }
        )

        it('updates state on skill changes',
            async () =>
            {
                //this creates a mock set state function
                const setStateMock = jest.fn()

                //this creates a mock use state function
                const useStateMock = (useState) => [useState, setStateMock]

                //this replaces calls for use state with calls for our use state function, which will return our set state mock. Whenever the component sets state, it will call our set state mock instead.
                jest.spyOn(React, 'useState').mockImplementation(useStateMock)

                SkillSelect.mockImplementationOnce(
                    ({ selectedSkill, skills, onSkillSelected }) =>
                    {
                        useEffect(
                            () =>
                            {
                                onSkillSelected(fakeSkills[0].id)
                            }, []
                        )
                    }
                )

                const tree = await testRender()

                expect(setStateMock).toHaveBeenCalledWith(fakeSkills[0].id)
            }
        )
        */

        it('calls create exercise, passing state, and navigates to the exercises page when submit button pressed and state is valid',
            async () =>
            {
                SkillSelect.mockImplementation(
                    ({ selectedSkill, skills, onSkillSelected }) =>
                    {
                        onSelectChanged = (event) =>
                        {
                            onSkillSelected(event.target.value)
                        }

                        return <select onChange={onSelectChanged}>
                            <option value={1} key={1}>skill 1</option>
                            <option value={2} key={2}>skill 2</option>
                        </select>
                    }
                )

                const tree = await testRender()

                const skillDropdown = tree.getByRole('combobox')
                const descriptionField = tree.getByPlaceholderText(/Exercise Description/i)
                const titleField = tree.getByPlaceholderText(/Exercise Title/i)
                const submitButton = tree.getByRole('button')

                await act(
                    () =>
                    {
                        fireEvent.change(skillDropdown, { target: { value: 1 } })
                        fireEvent.change(descriptionField, { target: { value: "description change" } })
                        fireEvent.change(titleField, { target: { value: "title change" } })
                    }
                )

                await act(
                    () =>
                    {
                        fireEvent.click(submitButton)
                    }
                )

                expect(addExercise).toHaveBeenCalledWith({ skillId: "1", description: "description change", name: "title change", userId: 1 })
                expect(mockNavigate).toHaveBeenCalledWith("/exercises")
            }
        )

        it('does a window alert when submit button pressed while missing state',
            async () =>
            {
                window.alert = jest.fn()

                const tree = await testRender()

                const skillDropdown = tree.getByRole('combobox')
                const submitButton = tree.getByRole('button')

                fireEvent.click(submitButton)
                expect(window.alert).toHaveBeenCalledTimes(1)

                fireEvent.change(skillDropdown, { target: { value: fakeSkills[0].id } })
                fireEvent.click(submitButton)
                expect(window.alert).toHaveBeenCalledTimes(2)
            }
        )
    }
)
