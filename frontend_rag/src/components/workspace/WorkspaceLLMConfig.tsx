import React, { useState } from 'react';

export type LLMConfig = {
  id: string;
  model: string;
  provider: string;
  apiKey: string;
};

type Props = {
  llms: LLMConfig[];
  setLlms: React.Dispatch<React.SetStateAction<LLMConfig[]>>;
};

const providers = ['OpenAI', 'Azure', 'Google'];

const WorkspaceLLMConfig: React.FC<Props> = ({ llms, setLlms }) => {
  const [adding, setAdding] = useState(false);
  const [fields, setFields] = useState({ model: '', provider: providers[0], apiKey: '' });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  const validate = () => {
    const errs: { [k: string]: string } = {};
    if (!fields.model) errs.model = 'Modelo obrigatório';
    if (!fields.apiKey) errs.apiKey = 'API key obrigatória';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAdd = () => {
    if (!validate()) return;
    setLlms([...llms, { ...fields, id: Date.now().toString() }]);
    setFields({ model: '', provider: providers[0], apiKey: '' });
    setAdding(false);
  };

  const handleEdit = (id: string) => {
    const llm = llms.find(l => l.id === id);
    if (llm) setFields({ model: llm.model, provider: llm.provider, apiKey: llm.apiKey });
    setEditingId(id);
  };

  const handleEditSave = () => {
    if (!validate() || !editingId) return;
    setLlms(llms.map(l => l.id === editingId ? { ...l, ...fields } : l));
    setEditingId(null);
    setFields({ model: '', provider: providers[0], apiKey: '' });
  };

  const handleDelete = (id: string) => {
    setLlms(llms.filter(l => l.id !== id));
  };

  return (
    <div>
      <h2>LLMs do Workspace</h2>
      <button onClick={() => { setAdding(true); setFields({ model: '', provider: providers[0], apiKey: '' }); }}>Adicionar LLM</button>
      {adding && (
        <div>
          <input placeholder="Modelo" value={fields.model} onChange={e => setFields(f => ({ ...f, model: e.target.value }))} />
          {errors.model && <span>{errors.model}</span>}
          <select value={fields.provider} onChange={e => setFields(f => ({ ...f, provider: e.target.value }))}>
            {providers.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <input placeholder="API Key" value={fields.apiKey} onChange={e => setFields(f => ({ ...f, apiKey: e.target.value }))} />
          {errors.apiKey && <span>{errors.apiKey}</span>}
          <button onClick={handleAdd}>Salvar</button>
        </div>
      )}
      <ul>
        {llms.map(llm => (
          <li key={llm.id}>
            {editingId === llm.id ? (
              <>
                <input value={fields.model} onChange={e => setFields(f => ({ ...f, model: e.target.value }))} />
                {errors.model && <span>{errors.model}</span>}
                <select value={fields.provider} onChange={e => setFields(f => ({ ...f, provider: e.target.value }))}>
                  {providers.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <input value={fields.apiKey} onChange={e => setFields(f => ({ ...f, apiKey: e.target.value }))} />
                {errors.apiKey && <span>{errors.apiKey}</span>}
                <button onClick={handleEditSave}>Salvar</button>
              </>
            ) : (
              <>
                {llm.model} ({llm.provider})
                <button onClick={() => handleEdit(llm.id)}>Editar</button>
                <button onClick={() => handleDelete(llm.id)}>Remover</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkspaceLLMConfig;
