import React from 'react'
import '@testing-library/jest-dom'
import { cleanup,  render } from '@testing-library/react'
import { act } from 'react-test-renderer'

jest.mock('../src/components/SkillSelect/SkillSelect')
import SkillSelect from '../src/components/SkillSelect/SkillSelect'

import ExerciseFields from '../src/components/ExerciseFields/ExerciseFields'

beforeEach(
    () =>
    {
        SkillSelect.mockImplementation(
            ({ selectedSkill, skills, onSkillSelected }) =>
            {
                return <select>
                    <option value={1} key={1}>skill 1</option>
                    <option value={2} key={2}>skill 2</option>
                </select>
            }
        )
    }
)

afterEach(
    () =>
    {
        cleanup
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
            returnRender = render(<ExerciseFields skill={1} title={"test title"} description={"test description"} />)
        }
    )
    return returnRender
}

describe('ExerciseFields works',
    () =>
    {
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

        it('sets default values for components',
            async () =>
            {
                const tree = await testRender()

                const descriptionField = tree.getByPlaceholderText(/Exercise Description/i)
                const titleField = tree.getByPlaceholderText(/Exercise Title/i)

                expect(SkillSelect.mock.calls[SkillSelect.mock.calls.length - 1][0]["selectedSkill"]).toBe(1)
                expect(descriptionField.value).toBe("test description")
                expect(titleField.value).toBe("test title")
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
    }
)