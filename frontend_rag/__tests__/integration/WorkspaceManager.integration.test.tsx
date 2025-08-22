import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WorkspaceManager from '../../src/components/workspace/WorkspaceManager';

describe('WorkspaceManager + WorkspaceResourceConfig integration', () => {
  test('should show resource config for selected workspace and allow adding db connection', async () => {
    render(<WorkspaceManager workspaces={[{ id: '1', name: 'WS1' }, { id: '2', name: 'WS2' }]} />);
    // Seleciona o primeiro workspace
    const ws1Btn = screen.getByRole('button', { name: 'WS1' });
    fireEvent.click(ws1Btn);
    expect(screen.getByText(/resources for workspace: WS1/i)).toBeInTheDocument();
    // Adiciona conexão de banco
    const addDbBtn = screen.getByRole('button', { name: /add database/i });
    fireEvent.click(addDbBtn);
  const dbInput = await screen.findByLabelText(/database name/i);
  fireEvent.change(dbInput, { target: { value: 'DB_WS1' } });
  // Fill required fields
  fireEvent.change(screen.getByLabelText(/host/i), { target: { value: 'localhost' } });
  fireEvent.change(screen.getByLabelText(/user/i), { target: { value: 'admin' } });
    const saveBtn = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveBtn);
    expect(await screen.findByText('DB_WS1')).toBeInTheDocument();
    // Troca para o segundo workspace
    const ws2Btn = screen.getByRole('button', { name: 'WS2' });
    fireEvent.click(ws2Btn);
    expect(screen.getByText(/resources for workspace: WS2/i)).toBeInTheDocument();
    // Não deve mostrar conexão do outro workspace
    expect(screen.queryByText('DB_WS1')).not.toBeInTheDocument();
  });
});
