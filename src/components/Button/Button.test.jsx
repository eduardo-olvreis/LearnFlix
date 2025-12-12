import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Componente Button', () => {
  
  test('deve renderizar o botão com o texto informado', () => {
    render(<Button>Confirmar Compra</Button>);
    
    const botao = screen.getByRole('button', { name: /Confirmar Compra/i });
    expect(botao).toBeInTheDocument();
  });

  test('deve chamar a função onClick quando clicado', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clique Aqui</Button>);
    const botao = screen.getByRole('button', { name: /Clique Aqui/i });
    fireEvent.click(botao);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('deve estar desabilitado quando a prop disabled for true', () => {
    render(<Button disabled={true}>Botão Inativo</Button>);
    
    const botao = screen.getByRole('button', { name: /Botão Inativo/i });
    
    expect(botao).toBeDisabled();
  });

  test('deve ter o atributo type="button" por padrão', () => {
    render(<Button>Teste</Button>);
    const botao = screen.getByRole('button', { name: /Teste/i });
    expect(botao).toHaveAttribute('type', 'button');
  });
});