import { render, screen } from '@testing-library/react';
import Card from './Card';
import '@testing-library/jest-dom';

describe('Componente Card', () => {
  test('deve renderizar o conteúdo filho (children) corretamente', () => {
    render(
        <Card>
            <h1>Título do Card</h1>
            <p>Conteúdo de teste</p>
        </Card>
    );
    expect(screen.getByText('Título do Card')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo de teste')).toBeInTheDocument();
  });
});