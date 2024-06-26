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
        switchOrderWithExerciseAbove.mockImplementation(async () => { })
        switchOrderWithExerciseBelow.mockImplementation(async () => { })
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

const onExerciseSortedMock = jest.fn()

const testRender = async () =>
{
    let returnRender
    await act(
        async () =>
        {
            returnRender = await render(<SortButtons userExercise={fakeUserExercise} onUserExerciseSorted={onExerciseSortedMock} />)
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

                const sortUpButton = tree.getByTestId('up')
                const sortDownButton = tree.getByTestId('down')

                expect(sortUpButton).toBeInTheDocument()
                expect(sortDownButton).toBeInTheDocument()
            }
        )

        it('calls switchOrderWithExerciseAbove, passing correct value, and calls onExerciseSorted callback, on sort up clicked',
            async () =>
            {
                const tree = await testRender()

                const sortUpButton = tree.getByTestId('up')

                await act(
                    async () =>
                    {
                        await fireEvent.click(sortUpButton)
                    }
                )

                expect(switchOrderWithExerciseAbove).toHaveBeenCalledWith(fakeUserExercise)
                expect(onExerciseSortedMock).toHaveBeenCalled()
            }
        )

        it('calls switchOrderWithExerciseBelow, passing correct value, and calls onExerciseSorted callback, on sort up clicked',
            async () =>
            {
                const tree = await testRender()

                const sortUpButton = tree.getByTestId('down')

                await act(
                    async () =>
                    {
                        await fireEvent.click(sortUpButton)
                    }
                )

                expect(switchOrderWithExerciseBelow).toHaveBeenCalledWith(fakeUserExercise)
                expect(onExerciseSortedMock).toHaveBeenCalled()
            }
        )
    }
)