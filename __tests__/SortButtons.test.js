import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { act } from 'react-test-renderer'
import SkillSelect from '../src/components/SkillSelect/SkillSelect'
import SortButtons from '../src/components/SortButtons/SortButtons'

jest.mock('../src/services/userExerciseService')
import { changeUserExercise } from '../src/services/userExerciseService'

const fakeUserExercises = [
    {
        "id": 1,
        "userId": 1,
        "exerciseId": 1,
        "order": 1
    },
    {
        "id": 2,
        "userId": 2,
        "exerciseId": 2,
        "order": 2
    }
]

beforeEach(
    () =>
    {

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
            returnRender = await render(<SortButtons userExercise={fakeUserExercises} />)
        }
    )
    return returnRender
}

describe('SortButtons works',
    () =>
    {
        it('renders',
            async () =>
            {
                const tree = await testRender()

                expect(tree.container).toBeInTheDocument()
            }
        )

        it('renders interactable components',
            async () =>
            {
                const tree = await testRender()

                const sortUpButton = tree.getByRole('button', { name: "move up" })
                const sortDownButton = tree.getByRole('button', { name: "move down" })

                expect(sortUpButton).toBeInTheDocument()
                expect(sortDownButton).toBeInTheDocument()
            }
        )

        it('calls changeUserExercise, passing correct value, on sort up clicked',
            async () =>
            {
                const tree = await testRender()

                const sortUpButton = tree.getByRole('button', { name: "move up" })

                await act(
                    async () =>
                    {
                        await fireEvent.click(sortUpButton)
                    }
                )
            }
        )
    }
)