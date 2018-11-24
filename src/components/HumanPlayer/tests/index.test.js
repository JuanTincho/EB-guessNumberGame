import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import HumanPlayer, { messages } from '../index';

describe('<HumanPlayer /> tests', () => {
  let component;
  let componentInstance;
  beforeEach(() => {
    component = shallow(<HumanPlayer />).dive();
    componentInstance = component.instance();
  });

  it('HumanPlayer shoud match snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Error label on TextField', () => {
    component.find('TextField').simulate('change', { target: { value: 105 } });

    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('handleKeyPress with EnterKey', () => {
    const mockedKeyValue = { which: 13 };
    componentInstance.checkAnswer = jest.fn();
    componentInstance.handleKeyPress(mockedKeyValue);
    expect(componentInstance.checkAnswer).toHaveBeenCalledTimes(1);
  });

  it('handleKeyPress with other KeyPress', () => {
    const mockedKeyValue = { e: { which: 14 } };
    componentInstance.checkAnswer = jest.fn();
    componentInstance.handleKeyPress(mockedKeyValue);
    expect(componentInstance.checkAnswer).toHaveBeenCalledTimes(0);
  });

  describe('checkAnswer', () => {
    it('should win the game when numberValue equals numberAnswer', () => {
      componentInstance.setState({ numberAnswer: 20, numberValue: '20' });
      expect(componentInstance.state.winState).toBeFalsy();
      componentInstance.checkAnswer();
      expect(componentInstance.state.winState).toBeTruthy();
    });

    it('should set the bigger message when numberValue is smaller than numberAnswer', () => {
      componentInstance.setState({ numberAnswer: 20, numberValue: '15' });
      expect(componentInstance.state.message).toEqual('');
      componentInstance.checkAnswer();
      expect(componentInstance.state.message).toEqual(messages.bigger);
    });

    it('should set the smaller message when numberValue is bigger than numberAnswer', () => {
      componentInstance.setState({ numberAnswer: 20, numberValue: '35' });
      expect(componentInstance.state.message).toEqual('');
      componentInstance.checkAnswer();
      expect(componentInstance.state.message).toEqual(messages.smaller);
    });
  });

  it('restartGame', () => {
    const mockedRandomNumber = 50;
    componentInstance.setState = jest.fn();
    Math.floor = jest.fn(() => mockedRandomNumber);
    const mockedValues = {
      winState: false,
      numberAnswer: mockedRandomNumber,
      numberValue: 0,
      message: '',
    };
    componentInstance.restartGame();
    expect(componentInstance.setState).toBeCalledTimes(1);
    expect(componentInstance.setState).toHaveBeenCalledWith(mockedValues);
  });
});
