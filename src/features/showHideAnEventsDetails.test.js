import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';


const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  let AppWrapper;
  test('An event element is collapsed by default.', ({ given, when, then }) => {
    given('A collapsed event element containing events is loaded on the page.', () => { 
    
    });

    when('The user opens up the app and performs no action.', () => {
      AppWrapper = mount(<App />)
    });

    then('The event element is collapsed by default.', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event.expanded')).toHaveLength(0);
    });
  });

  test('User can expand an event to see its details.', ({ given, when, then }) => {
    given('The event list and elements have loaded.', () => {
      AppWrapper = mount(<App />)
    });

    when('The user clicks on a details button in the event element.', () => {
      AppWrapper.update();
      AppWrapper.find('.event .details-button').at(0).simulate('click');
    });

    then('The event element expands to show details about the specific event.', () => {
      expect(AppWrapper.find('.event.expanded')).toHaveLength(1)
    });
  });

  test('User can collapse an event to hide its details.', ({ given, when, then }) => {
    given('The event element is showing event details.', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      AppWrapper.find('.event .details-button').at(0).simulate('click');
    });

    when('The user clicks on the details button again.', () => {
      AppWrapper.update();
      AppWrapper.find('.event .details-button').at(0).simulate('click');
    });

    then('The event details part of event element is collapsed.', () => {
      expect(AppWrapper.find('.event.expanded')).toHaveLength(0)
    });
  });


});