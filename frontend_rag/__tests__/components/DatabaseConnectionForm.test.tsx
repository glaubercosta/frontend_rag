import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DatabaseConnectionForm from '../../src/components/workspace/DatabaseConnectionForm';

describe('DatabaseConnectionForm', () => {
  test('should render connection form with all database types', () => {
    render(<DatabaseConnectionForm onSave={jest.fn()} />);
    expect(screen.getByLabelText(/database type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/host/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/port/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/user/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/database name/i)).toBeInTheDocument();
  });

  test('should validate required fields before submission', () => {
    render(<DatabaseConnectionForm onSave={jest.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(screen.getByText(/host is required/i)).toBeInTheDocument();
    expect(screen.getByText(/user is required/i)).toBeInTheDocument();
    expect(screen.getByText(/database name is required/i)).toBeInTheDocument();
  });

  test('should show success message on valid connection', async () => {
    render(<DatabaseConnectionForm onSave={jest.fn()} />);
    fireEvent.change(screen.getByLabelText(/host/i), { target: { value: 'localhost' } });
    fireEvent.change(screen.getByLabelText(/port/i), { target: { value: '5432' } });
    fireEvent.change(screen.getByLabelText(/user/i), { target: { value: 'admin' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'secret' } });
    fireEvent.change(screen.getByLabelText(/database name/i), { target: { value: 'mydb' } });
    fireEvent.click(screen.getByRole('button', { name: /test connection/i }));
    expect(await screen.findByText(/connection successful/i)).toBeInTheDocument();
  });

  test('should handle connection errors gracefully', async () => {
    render(<DatabaseConnectionForm onSave={jest.fn()} simulateError />);
    fireEvent.change(screen.getByLabelText(/host/i), { target: { value: 'localhost' } });
    fireEvent.change(screen.getByLabelText(/port/i), { target: { value: '5432' } });
    fireEvent.change(screen.getByLabelText(/user/i), { target: { value: 'admin' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'secret' } });
    fireEvent.change(screen.getByLabelText(/database name/i), { target: { value: 'mydb' } });
    fireEvent.click(screen.getByRole('button', { name: /test connection/i }));
    expect(await screen.findByText(/connection failed/i)).toBeInTheDocument();
  });
});
