
import React, { useState } from 'react';
import WorkspaceResourceConfig, { DbConnection } from './WorkspaceResourceConfig';

type Workspace = { id: string; name: string };

interface WorkspaceManagerProps {
  workspaces?: Workspace[];
}

const WorkspaceManager: React.FC<WorkspaceManagerProps> = ({ workspaces = [] }) => {
  const [list, setList] = useState<Workspace[]>(workspaces);
  const [name, setName] = useState('');

  const handleAdd = () => {
    if (name.trim()) {
      setList([...list, { id: Date.now().toString(), name }]);
      setName('');
    }
  };

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleRename = (id: string, currentName: string) => {
    setEditingId(id);
    setEditName(currentName);
  };

  const handleSave = (id: string) => {
    setList(list.map(ws => ws.id === id ? { ...ws, name: editName } : ws));
    setEditingId(null);
    setEditName('');
  };

  const handleDelete = (id: string) => {
    setList(list.filter(ws => ws.id !== id));
  };


  const [selectedId, setSelectedId] = useState<string | null>(null);
  // Estado de recursos por workspace
  const [resources, setResources] = useState<Record<string, DbConnection[]>>({});

  return (
    <div>
      <input
        placeholder="Workspace name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {list.map(ws => (
          <li key={ws.id}>
            <button
              style={{ fontWeight: selectedId === ws.id ? 'bold' : 'normal' }}
              onClick={() => setSelectedId(ws.id)}
            >
              {ws.name}
            </button>
            {editingId === ws.id ? (
              <>
                <input
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                />
                <button onClick={() => handleSave(ws.id)}>Save</button>
              </>
            ) : (
              <>
                <button onClick={() => handleRename(ws.id, ws.name)}>Rename</button>
                <button onClick={() => handleDelete(ws.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      {selectedId && (
        <div style={{ marginTop: 24 }}>
          <h3>Resources for workspace: {list.find(ws => ws.id === selectedId)?.name}</h3>
          <WorkspaceResourceConfig
            dbs={resources[selectedId] || []}
            setDbs={newDbs => setResources(r => ({ ...r, [selectedId]: newDbs }))}
          />
        </div>
      )}
    </div>
  );
};

export default WorkspaceManager;
