import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { act } from 'react-test-renderer'
import SkillSelect from '../src/components/SkillSelect/SkillSelect'
import SortButtons from '../src/components/SortButtons/SortButtons'

jest.mock('../src/services/userExerciseService')
import { changeUserExercise, switchOrderWithExerciseAbove, switchOrderWithExerciseBelow } from '../src/services/userExerciseService'

const fakeUserExercise = {
    "id": 1,
    "userId": 1,
    "exerciseId": 1,
    "order": 1
}


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
            returnRender = await render(<SortButtons userExercise={fakeUserExercise} />)
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

        it('calls switchOrderWithExerciseAbove, passing correct value, on sort up clicked',
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

                expect(switchOrderWithExerciseAbove).toHaveBeenCalledWith(fakeUserExercise)
            }
        )

        it('calls switchOrderWithExerciseBelow, passing correct value, on sort up clicked',
            async () =>
            {
                const tree = await testRender()

                const sortUpButton = tree.getByRole('button', { name: "move down" })

                await act(
                    async () =>
                    {
                        await fireEvent.click(sortUpButton)
                    }
                )

                expect(switchOrderWithExerciseBelow).toHaveBeenCalledWith(fakeUserExercise)
            }
        )
    }
)