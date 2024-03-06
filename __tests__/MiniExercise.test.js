import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import MiniExercise from '../src/components/MiniExercise/MiniExercise'

it('should render mini exercise',
    () =>
    {
        const miniExercise = render(<MiniExercise />)

        expect(miniExercise.container).toBeInTheDocument()
    }
)

describe('testing expanding an exercise',
    () =>
    {
        afterEach(cleanup)

        const testRender = () =>
        {
            return render(<MiniExercise />)
        }

        it('toggles expanded when clicked',
            () =>
            {
                const tree = testRender()

                const miniExercise = tree.getByTestId('MiniExercise')

                expect(miniExercise.classList.contains('expanded')).toBeFalsy()

                fireEvent.click(miniExercise)

                expect(miniExercise.classList.contains('expanded')).toBeTruthy()

                fireEvent.click(miniExercise)

                expect(miniExercise.classList.contains('expanded')).toBeFalsy()
            }
        )
    }
)

describe('testing passing arguments',
    () =>
    {
        const testRender = (title, skill, author, description) =>
        {
            return render(
                <MiniExercise title={title} skill={skill} author={author} description={description} />
            )
        }

        afterEach(cleanup)

        it("should show passed arguments",
            () =>
            {
                const title = "test title"
                const skill = 2
                const tree = testRender("test title", "test skill", "test author", "test description")

                expect(tree.getByText())
            }
        )
    }
) 