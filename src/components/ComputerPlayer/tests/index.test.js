import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ComputerPlayer from '../index';

describe('<ComputerPlayer /> tests', () => {
  let component;
  let componentInstance;
  beforeEach(() => {
    component = shallow(<ComputerPlayer />).dive();
    componentInstance = component.instance();
  });

  it('ComputerPlayer shoud match snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('start game ', () => {
    expect(componentInstance.state.gameStarted).toBeFalsy();
    componentInstance.getGuessNumber = jest.fn(() => 1);
    componentInstance.startGame();
    expect(componentInstance.state.gameStarted).toBeTruthy();
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Win state', () => {
    expect(componentInstance.state.gameStarted).toBeFalsy();
    expect(componentInstance.state.winState).toBeFalsy();
    componentInstance.startGame();
    componentInstance.winGame();
    expect(componentInstance.state.gameStarted).toBeTruthy();
    expect(componentInstance.state.winState).toBeTruthy();
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('setGuessNumber', () => {
    const mockedMinNumber = 1;
    const mockedMaxNumber = 10;
    componentInstance.getGuessNumber = jest.fn();
    componentInstance.setGuessNumber(mockedMinNumber, mockedMaxNumber);
    expect(componentInstance.state.minNumber).toEqual(mockedMinNumber);
    expect(componentInstance.state.maxNumber).toEqual(mockedMaxNumber);
    expect(componentInstance.getGuessNumber).toHaveBeenCalledTimes(1);
  });

  it('guetGuessNumber', () => {
    expect(componentInstance.getGuessNumber(1, 100)).toBe(50);
    expect(componentInstance.getGuessNumber(50, 100)).toBe(75);
    expect(componentInstance.getGuessNumber(1, 50)).toBe(25);
    expect(componentInstance.getGuessNumber(4, 9)).toBe(6);
  });

  it('restartGame', () => {
    componentInstance.setState({
      gameStarted: true,
      winState: true,
      minNumber: 12,
      maxNumber: 125,
    });
    componentInstance.restartGame();
    expect(componentInstance.state.gameStarted).toBeFalsy();
    expect(componentInstance.state.winState).toBeFalsy();
    expect(componentInstance.state.minNumber).toEqual(0);
    expect(componentInstance.state.maxNumber).toEqual(100);
  });
});
