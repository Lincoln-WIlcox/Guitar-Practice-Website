import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, render } from '@testing-library/react'
import { act } from 'react-test-renderer'
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
            returnRender = await render(<SkillSelect />)
        }
    )
    return returnRender
}

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
    }
)
