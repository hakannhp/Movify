/* eslint-disable */
// Disable ESLint because tests are run with jest binary, so there are many
// injections that ESLint cannot know and throw errors for.
import React from 'react';
import App from '../App';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});
