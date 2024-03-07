import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, render } from '@testing-library/react'
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
            returnRender = await render(<ExercisesFilters onSkillSelected={onSkillSelectedMock} />)
        }
    )
    return returnRender
}

const onSkillSelectedMock = jest.fn()

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
    }
)
