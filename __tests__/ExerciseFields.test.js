import React, { useEffect, useState } from 'react'
import '@testing-library/jest-dom'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { act } from 'react-test-renderer'
import CreateExercise from '../src/pages/CreateExercise'

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
            returnRender = render(<ExerciseFields />)
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