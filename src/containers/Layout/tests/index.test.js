import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Layout from '../index';

describe('<Layout /> tests', () => {
  it('Layout shoud match snapshot', () => {
    const component = shallow(<Layout />);
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Layout changes tab when clicked ', () => {
    const component = shallow(<Layout />).dive();
    expect(component.instance().state.tabValue).toEqual(0);
    component.instance().handleTabChange(null, 1);
    expect(component.instance().state.tabValue).toEqual(1);
  });
});
