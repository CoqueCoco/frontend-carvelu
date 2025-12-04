import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Checkout from '../src/pages/Checkout';
import { CartContext } from '../src/context/CartContext';
import { AuthContext } from '../src/context/AuthContext';

// Mock de mocks para los contextos
const mockClearCart = vi.fn();
const mockAddPoints = vi.fn();
const mockNavigate = vi.fn();

// Mock de useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Checkout Component', () => {
  
  it('Muestra mensaje de carrito vacío si no hay items', () => {
    render(
      <AuthContext.Provider value={{ user: { points: 0 }, addPoints: mockAddPoints }}>
        <CartContext.Provider value={{ cartItems: [], totalPrice: 0, clearCart: mockClearCart }}>
          <MemoryRouter>
            <Checkout />
          </MemoryRouter>
        </CartContext.Provider>
      </AuthContext.Provider>
    );

    expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
  });

  it('Renderiza el formulario y calcula puntos si hay items', () => {
    // Simulamos un carrito con 1 item de $20.000
    const cartItems = [{ id: 1, name: 'Pala', price: 20000, quantity: 1 }];
    
    render(
      <AuthContext.Provider value={{ user: { points: 50 }, addPoints: mockAddPoints }}>
        {/* CORRECCIÓN AQUÍ: Pasamos la variable cartItems en lugar de un array vacío [] */}
        <CartContext.Provider value={{ cartItems: cartItems, totalPrice: 20000, clearCart: mockClearCart }}>
          <MemoryRouter>
            <Checkout />
          </MemoryRouter>
        </CartContext.Provider>
      </AuthContext.Provider>
    );

    // Verificamos que aparezca el total (puede ser "Total a pagar:" o similar, la regex /Total a pagar/i lo encontrará)
    expect(screen.getByText(/Total a pagar/i)).toBeInTheDocument();
    
    // Verificamos que calcule los puntos ganados (1% de 20.000 = 200)
    // Buscamos el texto que contiene "200"
    expect(screen.getByText(/200/)).toBeInTheDocument();

    // Verificamos que aparezca el input de nombre
    expect(screen.getByRole('textbox', { name: /Nombre Completo/i })).toBeInTheDocument();
  });
});