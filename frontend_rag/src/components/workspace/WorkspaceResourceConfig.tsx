

import React, { useState } from 'react';
import DatabaseConnectionForm from './DatabaseConnectionForm';

export type DatabaseConnection = {
  id: string;
  type: string;
  host: string;
  port: string;
  user: string;
  password: string;
  dbName: string;
};

export type DbConnection = DatabaseConnection;


interface WorkspaceResourceConfigProps {
  dbs: DbConnection[];
  setDbs: React.Dispatch<React.SetStateAction<DbConnection[]>>;
}


const WorkspaceResourceConfig: React.FC<WorkspaceResourceConfigProps> = ({ dbs, setDbs }) => {
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAdd = (data: Omit<DatabaseConnection, 'id'>) => {
    setDbs([
      ...dbs,
      { ...data, id: Date.now().toString() },
    ]);
    setAdding(false);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleEditSave = (data: Omit<DatabaseConnection, 'id'>) => {
    if (!editingId) return;
    setDbs(dbs.map(db => db.id === editingId ? { ...db, ...data, id: editingId } : db));
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    setDbs(dbs.filter(db => db.id !== id));
  };

  return (
    <div>
      <h2>Database Connections</h2>
      <button onClick={() => setAdding(true)}>Add Database</button>
      {adding && (
        <DatabaseConnectionForm
          onSave={data => handleAdd(data)}
        />
      )}
      <ul>
        {dbs.map(db => (
          <li key={db.id}>
            {editingId === db.id ? (
              <DatabaseConnectionForm
                onSave={data => handleEditSave(data)}
                // Optionally, you could prefill the form with db's data by extending DatabaseConnectionForm
              />
            ) : (
              <>
                {db.dbName}
                <button onClick={() => handleEdit(db.id)}>Edit</button>
                <button onClick={() => handleDelete(db.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkspaceResourceConfig;
