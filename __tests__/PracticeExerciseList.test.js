import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import PracticeExerciseList from '../src/components/PracticeExerciseList/PracticeExerciseList'
import { act } from 'react-test-renderer'

jest.mock('../src/components/MiniExercise/MiniExercise')
import MiniExercise from '../src/components/MiniExercise/MiniExercise'

const testRender = async () =>
{
    let returnRender
    await act(
        async () =>
        {
            returnRender = await render(<PracticeExerciseList />)
        }
    )
    return returnRender
}

describe('Practice works',
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

                const completedCheckbox = tree.getByRole('checkbox')

                expect(MiniExercise).toHaveBeenCalled()
                expect(completedCheckbox).toHaveBeenCalled()
            }
        )
    }
)
