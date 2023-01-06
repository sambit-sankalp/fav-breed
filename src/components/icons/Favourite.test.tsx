import * as React from 'react'
import { shallow } from 'enzyme'
import Favourite from './Favourite'

describe('<Favourite />', () => {
  const mockProps = {
    icon: 'redHeartIcon',
    alt: 'My fake alt text',
    onFavourite: jest.fn(),
  }

  it('renders without crashing', () => {
    shallow(<Favourite {...mockProps} />)
  })

  it('renders the correct icon', () => {
    const wrapper = shallow(<Favourite {...mockProps} />)
    expect(wrapper.prop('alt')).toBe(mockProps.alt)
  })
})
