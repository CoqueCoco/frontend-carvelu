import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { CartContext } from './context/CartContext';
import Carrito from './pages/Carrito';

const mockCartContext = {
  cartItems: [],
  addToCart: vi.fn(),
  removeFromCart: vi.fn(),
  clearCart: vi.fn(),
};

const setup = () => {
  render(
    <BrowserRouter>
      <CartContext.Provider value={mockCartContext}>
        <Carrito />
      </CartContext.Provider>
    </BrowserRouter>
  );
};

describe('Componente Carrito', () => {
  it("Debe mostrar el título 'Mi Carrito'", () => {
    setup();
    const title = screen.getByText(/Mi Carrito/i);
    expect(title).toBeInTheDocument();
  });

  it("Debe mostrar el texto 'Tu carrito está vacío' cuando no hay productos", () => {
    setup();
    const emptyMessage = screen.getByText(/Tu carrito está vacío/i);
    expect(emptyMessage).toBeInTheDocument();
  });
});
