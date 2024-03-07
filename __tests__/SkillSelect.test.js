import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { act } from 'react-test-renderer'
import SkillSelect from '../src/components/SkillSelect/SkillSelect'

const fakeSkills = [
    {
        "id": 1,
        "skill": "skill 1"
    },
    {
        "id": 2,
        "skill": "skill 2"
    },
    {
        "id": 3,
        "skill": "skill 3"
    }
]

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
            returnRender = await render(<SkillSelect skills={fakeSkills} onSkillSelected={onSkillSelected} />)
        }
    )
    return returnRender
}

const onSkillSelected = jest.fn()

describe('SkillSelect component works',
    () =>
    {

        it('renders',
            async () =>
            {
                const tree = await testRender()

                expect(tree.container).toBeInTheDocument()
            }
        )

        it('makes an option for each skill passed',
            async () =>
            {
                const tree = await testRender()

                const options = tree.getAllByRole('option')

                for(const skill of fakeSkills) 
                {
                    const thisOption = options.find(option => option.key = skill.id)
                    expect(thisOption).toBeInTheDocument()
                }
            }
        )

        it('calls callback function, passing value, on skill selected',
            async () =>
            {
                const tree = await testRender()

                const select = tree.getByRole('combobox')
                fireEvent.change(select, {target: {value: "test value"}})

                expect(onSkillSelected).toHaveBeenCalledWith("test value")
            }
        )

    }
)
