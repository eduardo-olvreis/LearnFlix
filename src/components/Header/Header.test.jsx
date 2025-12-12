import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import '@testing-library/jest-dom';

describe('Componente Header', () => {
  
  // Dados falsos (mock) para o teste
  const mockName = "Eduardo Reis";
  const mockUser = "Estudante ADS";
  const mockLinks = [
    { path: '/home', label: 'Início' },
    { path: '/jogos', label: 'Jogos' }
  ];

  test('deve renderizar o nome do usuário e o cargo', () => {
    render(
      <MemoryRouter>
        <Header name={mockName} user={mockUser} navLinks={mockLinks} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Eduardo Reis/i)).toBeInTheDocument();
    expect(screen.getByText(/Estudante ADS/i)).toBeInTheDocument();
  });

  test('deve renderizar o botão de Sair', () => {
    render(
      <MemoryRouter>
        <Header name={mockName} user={mockUser} />
      </MemoryRouter>
    );

    const linkSair = screen.getByText(/Sair/i);
    expect(linkSair).toBeInTheDocument();
  });
});