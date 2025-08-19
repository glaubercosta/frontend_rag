import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WorkspaceResourceConfig, { DbConnection } from '../../src/components/workspace/WorkspaceResourceConfig';

describe('WorkspaceResourceConfig', () => {
  test('should add/edit/remove database connections per workspace', async () => {
    const Wrapper = () => {
      const [dbs, setDbs] = React.useState<DbConnection[]>([]);
      return <WorkspaceResourceConfig dbs={dbs} setDbs={setDbs} />;
    };
    render(<Wrapper />);
    // Adicionar conexão
    const addDbBtn = screen.getByRole('button', { name: /add database/i });
    fireEvent.click(addDbBtn);
    const dbInput = await screen.findByPlaceholderText(/database name/i);
    fireEvent.change(dbInput, { target: { value: 'TestDB' } });
    const saveBtn = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveBtn);
    expect(await screen.findByText('TestDB')).toBeInTheDocument();
    // Editar conexão
    const editBtn = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editBtn);
    const editInput = screen.getByDisplayValue('TestDB');
    fireEvent.change(editInput, { target: { value: 'RenamedDB' } });
    const saveEditBtn = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveEditBtn);
    expect(await screen.findByText('RenamedDB')).toBeInTheDocument();
    // Remover conexão
    const deleteBtn = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteBtn);
    expect(screen.queryByText('RenamedDB')).not.toBeInTheDocument();
  });

  // ...existing code...
});
