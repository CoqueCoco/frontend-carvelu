import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';

const mockAuthContext = {
  login: vi.fn(),
  user: null,
};

const setup = () => {
  render(
    <AuthContext.Provider value={mockAuthContext}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

describe('Componente Login', () => {
  it('Debe renderizar el título "Iniciar Sesión"', () => {
    setup();
    const titles = screen.getAllByText(/Iniciar Sesión/i);
    // El primer elemento es el título (el otro es el botón)
    expect(titles[0]).toBeInTheDocument();
  });

  it('Debe renderizar los campos de Correo Electrónico y Contraseña', () => {
  setup();
  const emailInput = screen.getByLabelText(/Correo Electrónico/i);
  const passwordInput = screen.getByLabelText(/Contraseña/i);
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});


  it('Debe renderizar el botón "Iniciar Sesión"', () => {
    setup();
    const button = screen.getByRole('button', { name: /Iniciar Sesión/i });
    expect(button).toBeInTheDocument();
  });
});
