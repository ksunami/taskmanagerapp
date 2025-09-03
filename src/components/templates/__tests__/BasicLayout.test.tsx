import React from 'react';
import { render, screen } from '@testing-library/react';
import BasicLayout from '@/components/templates/BasicLayout'; // usa '@/'; si no, '../BasicLayout'

describe('BasicLayout', () => {
  it('renders children inside container', () => {
    render(
      <BasicLayout>
        <div data-testid="child">Child</div>
      </BasicLayout>
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Child');
  });
});
