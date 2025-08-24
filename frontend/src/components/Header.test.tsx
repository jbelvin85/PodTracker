// src/components/Header.test.tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { AuthProvider } from '../hooks/useAuth';

describe('Header', () => {
  it('renders the brand name', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/PodTracker/i)).toBeInTheDocument();
  });
});
