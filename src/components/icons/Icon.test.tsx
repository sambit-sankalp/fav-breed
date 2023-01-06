import * as React from 'react'
import { shallow } from 'enzyme'
import Icon from './Icon'

describe('<Icon />', () => {
  const mockProps = {
    icon: 'redHeartIcon',
    alt: 'My fake alt text',
  }

  it('renders without crashing', () => {
    shallow(<Icon {...mockProps} />)
  })

  it('renders the correct icon', () => {
    const wrapper = shallow(<Icon {...mockProps} />)
    expect(wrapper.prop('alt')).toBe(mockProps.alt)
  })
})
