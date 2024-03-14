import React, { useEffect } from 'react';
import '@testing-library/jest-dom'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { act } from 'react-test-renderer'
import ExercisesFilters from '../src/components/ExercisesFilters/ExercisesFilters'

jest.mock('../src/components/SkillSelect/SkillSelect')
import SkillSelect from '../src/components/SkillSelect/SkillSelect'

afterEach(
    () =>
    {
        cleanup()
        jest.clearAllMocks()
    }
)

const testRender = async () =>
{
    let returnRender
    await act(
        async () =>
        {
            returnRender = await render(<ExercisesFilters onSkillSelected={onSkillSelectedMock} onSearchQueryChanged={onSearchQueryChangedMock} onShowMyExercisesChanged={onShowMyExercisesChangedMock} />)
        }
    )
    return returnRender
}

const onSkillSelectedMock = jest.fn()
const onSearchQueryChangedMock = jest.fn()
const onShowMyExercisesChangedMock = jest.fn()

describe('ExercisesFilters component works',
    () =>
    {
        it('renders',
            async () =>
            {
                const tree = await testRender()

                expect(tree.container).toBeInTheDocument()
            }
        )

        it('creates a SkillSelect',
            async () =>
            {
                const tree = await testRender()

                expect(SkillSelect).toHaveBeenCalled()
            }
        )

        it('calls callback when skill is selected',
            async () =>
            {
                await act(
                    async () =>
                    {
                        await SkillSelect.mockImplementationOnce(
                            ({ onSkillSelected }) =>
                            {
                                useEffect(
                                    () =>
                                    {
                                        onSkillSelected()
                                    }, []
                                )
                            }
                        )
                    }
                )

                const tree = await testRender()

                expect(onSkillSelectedMock).toHaveBeenCalled()
            }
        )

        it('creates a search field',
            async () =>
            {
                const tree = await testRender()

                const searchBar = tree.getByRole('searchbox')
                expect(searchBar).toBeInTheDocument()
            }
        )

        it('calls a callback on search changed, passing correct value',
            async () =>
            {
                const tree = await testRender()

                const searchBar = tree.getByRole('searchbox')
                fireEvent.change(searchBar, { target: { value: 'test value' } })

                expect(onSearchQueryChangedMock).toHaveBeenCalledWith('test value')
            }
        )

        it('creates a checkbox for show my exercises',
            async () =>
            {
                const tree = await testRender()

                const showMyExercisesCheckbox = tree.getByRole('checkbox')
                expect(showMyExercisesCheckbox).toBeInTheDocument()
            }
        )

        it('calls callback on checkbox toggled, passing correct value',
            async () =>
            {
                const tree = await testRender()

                const showMyExercisesCheckbox = tree.getByRole('checkbox')
                fireEvent.click(showMyExercisesCheckbox)

                expect(onShowMyExercisesChangedMock).toHaveBeenCalledWith(true)
            }
        )

        it('creates show all button',
            async () =>
            {
                const tree = await testRender()

                const showAllButton = tree.getByRole('button')
                expect(showAllButton).toBeInTheDocument()
            }
        )

        it('clears other fields when show all is clicked',
            async () =>
            {

                const tree = await testRender()

                const showAllButton = tree.getByRole('button')
                const showMyExercisesCheckbox = tree.getByRole('checkbox')
                const searchBar = tree.getByRole('searchbox')

                //simulates changing the search filters
                fireEvent.click(showMyExercisesCheckbox)
                fireEvent.change(searchBar, { target: { value: "a change" } })
                SkillSelect({"selectedSkill": 1})

                fireEvent.click(showAllButton)

                expect(showMyExercisesCheckbox.checked).toBe(false)
                expect(searchBar.value).toBe("")

                expect(SkillSelect.mock.calls[SkillSelect.mock.calls.length - 1][0]["selectedSkill"]).toBe(0)
            }
        )
    }
)
