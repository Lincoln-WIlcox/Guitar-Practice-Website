import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { act } from 'react-test-renderer'
import ExercisesFilters from '../src/components/ExercisesFilters/ExercisesFilters'

jest.mock('../src/components/SkillSelect/SkillSelect')
import SkillSelect from '../src/components/SkillSelect/SkillSelect'

beforeEach(
    async () =>
    {

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
    let returnRender
    await act(
        async () =>
        {
            returnRender = await render(<ExercisesFilters onSkillSelected={onSkillSelectedMock} onSearchQueryChanged={onSearchQueryChangedMock} searchQuery={searchQueryMock} onShowMyExercisesChanged={onShowMyExercisesChangedMock} onShowAllClicked={onShowAllClickedMock} />)
        }
    )
    return returnRender
}

const searchQueryMock = "test"
const onSkillSelectedMock = jest.fn()
const onSearchQueryChangedMock = jest.fn()
const onShowMyExercisesChangedMock = jest.fn()
const onShowAllClickedMock = jest.fn()

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
                SkillSelect.mockImplementation(
                    ({ onSkillSelected }) =>
                    {
                        onSkillSelected()
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

        it('sets the search bar\'s value to passed search query',
            async () =>
            {
                const tree = await testRender()

                const searchBar = tree.getByRole('searchbox')
                expect(searchBar.value).toBe(searchQueryMock)
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

        it('creates button',
            async () =>
            {
                const tree = await testRender()

                const showAllButton = tree.getByRole('button')
                expect(showAllButton).toBeInTheDocument()
            }
        )

        it('calls callback on show all pressed',
            async () =>
            {
                const tree = await testRender()

                const showAll = tree.getByRole('button')
                fireEvent.click(showAll)

                expect(onShowAllClickedMock).toHaveBeenCalled()
            }
        )
    }
)
