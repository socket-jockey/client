import React from 'react';
import { render, cleanup } from '@testing-library/react';

describe('App component', () => {
  it('confirms that we are cool', () => {
    const us = 'cool';
    expect(us).toEqual('cool');
  });
});
