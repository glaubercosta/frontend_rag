import React, { useState } from 'react';


export type DbConnection = { id: string; name: string };

interface WorkspaceResourceConfigProps {
  dbs: DbConnection[];
  setDbs: React.Dispatch<React.SetStateAction<DbConnection[]>>;
}

const WorkspaceResourceConfig: React.FC<WorkspaceResourceConfigProps> = ({ dbs, setDbs }) => {
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleAdd = () => {
    if (newName.trim()) {
      setDbs([...dbs, { id: Date.now().toString(), name: newName }]);
      setNewName('');
      setAdding(false);
    }
  };
  const handleEdit = (id: string, name: string) => {
    setEditingId(id);
    setEditName(name);
  };
  const handleSave = (id: string) => {
    setDbs(dbs.map(db => db.id === id ? { ...db, name: editName } : db));
    setEditingId(null);
    setEditName('');
  };
  const handleDelete = (id: string) => {
    setDbs(dbs.filter(db => db.id !== id));
  };

  return (
    <div>
      <h2>Database Connections</h2>
      <button onClick={() => setAdding(true)}>Add Database</button>
      {adding && (
        <div>
          <input
            placeholder="Database name"
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
          <button onClick={handleAdd}>Save</button>
        </div>
      )}
      <ul>
        {dbs.map(db => (
          <li key={db.id}>
            {editingId === db.id ? (
              <>
                <input
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                />
                <button onClick={() => handleSave(db.id)}>Save</button>
              </>
            ) : (
              <>
                {db.name}
                <button onClick={() => handleEdit(db.id, db.name)}>Edit</button>
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
