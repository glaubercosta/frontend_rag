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
  // Add connection
  const addDbBtn = screen.getByRole('button', { name: /add database/i });
  fireEvent.click(addDbBtn);
  const dbNameInput = await screen.findByLabelText(/database name/i);
  fireEvent.change(dbNameInput, { target: { value: 'TestDB' } });
  // Fill required fields
  fireEvent.change(screen.getByLabelText(/host/i), { target: { value: 'localhost' } });
  fireEvent.change(screen.getByLabelText(/user/i), { target: { value: 'admin' } });
  const saveBtn = screen.getByRole('button', { name: /save/i });
  fireEvent.click(saveBtn);
  expect(await screen.findByText('TestDB')).toBeInTheDocument();
  // Edit connection
  const editBtn = screen.getByRole('button', { name: /edit/i });
  fireEvent.click(editBtn);
  const editDbNameInput = screen.getByLabelText(/database name/i);
  fireEvent.change(editDbNameInput, { target: { value: 'RenamedDB' } });
  // Fill required fields again (host/user)
  fireEvent.change(screen.getByLabelText(/host/i), { target: { value: 'localhost' } });
  fireEvent.change(screen.getByLabelText(/user/i), { target: { value: 'admin' } });
  const saveEditBtn = screen.getByRole('button', { name: /save/i });
  fireEvent.click(saveEditBtn);
  expect(await screen.findByText('RenamedDB')).toBeInTheDocument();
  // Remove connection
  const deleteBtn = screen.getByRole('button', { name: /delete/i });
  fireEvent.click(deleteBtn);
  expect(screen.queryByText('RenamedDB')).not.toBeInTheDocument();
  });

  // ...existing code...
});
