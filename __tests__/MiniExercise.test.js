import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import MiniExercise from '../src/components/MiniExercise/MiniExercise'

jest.mock("../src/services/skillsService.js")
import { getSkillById } from "../src/services/skillsService.js"

jest.mock("../src/services/userService.js")
import { getUserById } from '../src/services/userService.js'
import { act } from 'react-test-renderer'

beforeEach(
    () =>
    {
        getSkillById.mockImplementation(
            async () =>
            {
                return {
                    "id": 2,
                    "skill": "skill 2",
                }
            }
        )
        getUserById.mockImplementation(
            async () =>
            {
                return {
                    "id": 1,
                    "username": "lincolnpepper"
                }
            }
        )
    }
)

afterEach(cleanup)

it('should render mini exercise',
    async () =>
    {
        let miniExercise

        await act(
            async () =>
            {
                miniExercise = render(<MiniExercise />)
            }
        )


        expect(miniExercise.container).toBeInTheDocument()
    }
)

describe('testing expanding an exercise',
    () =>
    {
        const testRender = async () =>
        {
            let returnRender
            await act(
                async () =>
                {
                    returnRender = render(
                        <MiniExercise />
                    )
                }
            )
            return returnRender
        }

        it('toggles expanded when clicked',
            async () =>
            {
                const tree = await testRender()

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
        const testRender = async (title, skill, author, description) =>
        {
            let returnRender
            await act(
                async () =>
                {
                    returnRender = await render(
                        <MiniExercise title={title} skill={skill} author={author} description={description} />
                    )
                }
            )
            return returnRender
        }

        it("should show passed arguments",
            async () =>
            {
                const title = "test title"
                const skill = 2
                const author = 1
                const description = "test description"
                const tree = await testRender(title, skill, author, description)

                expect(tree.getByText(title)).toBeInTheDocument()
                expect(tree.getByText("skill 2")).toBeInTheDocument()
                expect(tree.getByText("Made By lincolnpepper")).toBeInTheDocument()
                expect(tree.getByText(description)).toBeInTheDocument()
            }
        )
    }
) 