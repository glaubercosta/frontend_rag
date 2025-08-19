import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WorkspaceManager from '../../src/components/workspace/WorkspaceManager';

describe('WorkspaceManager', () => {
  test('should render list of workspaces', async () => {
    // Simulate initial workspaces
    const mockWorkspaces = [
      { id: '1', name: 'Workspace 1' },
      { id: '2', name: 'Workspace 2' }
    ];
    // TODO: Pass mockWorkspaces as prop or mock service
    render(<WorkspaceManager workspaces={mockWorkspaces} />);
    expect(screen.getByText('Workspace 1')).toBeInTheDocument();
    expect(screen.getByText('Workspace 2')).toBeInTheDocument();
  });

  test('should create new workspace', async () => {
    // TODO: Simulate user typing and clicking add
    render(<WorkspaceManager workspaces={[]} />);
    const input = screen.getByPlaceholderText(/workspace name/i);
    fireEvent.change(input, { target: { value: 'New Workspace' } });
    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addButton);
    expect(await screen.findByText('New Workspace')).toBeInTheDocument();
  });

  test('should rename and delete workspace', async () => {
    const mockWorkspaces = [
      { id: '1', name: 'Workspace 1' },
      { id: '2', name: 'Workspace 2' }
    ];
    render(<WorkspaceManager workspaces={mockWorkspaces} />);

    // Simular renomear
    const renameButton = screen.getAllByRole('button', { name: /rename/i })[0];
    fireEvent.click(renameButton);
    const renameInput = screen.getByDisplayValue('Workspace 1');
    fireEvent.change(renameInput, { target: { value: 'Renamed Workspace' } });
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);
    expect(await screen.findByText('Renamed Workspace')).toBeInTheDocument();

    // Simular exclusão
    const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
    fireEvent.click(deleteButton);
    expect(screen.queryByText('Renamed Workspace')).not.toBeInTheDocument();
  });
});
