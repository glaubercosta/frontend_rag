import React from 'react';
import { LLMService, LLM } from '../../services/LLMService';

type Props = { workspaceId: string };

const WorkspaceLLMConfig: React.FC<Props> = ({ workspaceId }) => {
	const [llms, setLlms] = React.useState<LLM[]>([]);
	const [name, setName] = React.useState('');
	const [editingId, setEditingId] = React.useState<string | null>(null);
	const [editName, setEditName] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	React.useEffect(() => {
		if (!workspaceId) return;
		setLoading(true);
		LLMService.listLLMs(workspaceId)
			.then(setLlms)
			.catch(() => setError('Erro ao carregar LLMs'))
			.finally(() => setLoading(false));
	}, [workspaceId]);

	const handleAdd = async () => {
		if (name.trim()) {
			setLoading(true);
			try {
				const newLLM = await LLMService.createLLM(workspaceId, name);
				setLlms([...llms, newLLM]);
				setName('');
			} catch {
				setError('Erro ao adicionar LLM');
			} finally {
				setLoading(false);
			}
		}
	};

	const handleEdit = (id: string, currentName: string) => {
		setEditingId(id);
		setEditName(currentName);
	};

	const handleSave = async (id: string) => {
		setLoading(true);
		try {
			const updated = await LLMService.updateLLM(workspaceId, id, editName);
			setLlms(llms.map(llm => llm.id === id ? updated : llm));
			setEditingId(null);
			setEditName('');
		} catch {
			setError('Erro ao editar LLM');
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		setLoading(true);
		try {
			await LLMService.deleteLLM(workspaceId, id);
			setLlms(llms.filter(llm => llm.id !== id));
		} catch {
			setError('Erro ao remover LLM');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h2>LLMs</h2>
			{error && <div style={{ color: 'red' }}>{error}</div>}
			<input
				placeholder="LLM name"
				value={name}
				onChange={e => setName(e.target.value)}
				disabled={loading}
			/>
			<button onClick={handleAdd} disabled={loading}>Add</button>
			{loading && <div>Loading...</div>}
			<ul>
				{llms.map(llm => (
					<li key={llm.id}>
						{editingId === llm.id ? (
							<>
								<input
									value={editName}
									onChange={e => setEditName(e.target.value)}
									disabled={loading}
								/>
								<button onClick={() => handleSave(llm.id)} disabled={loading}>Save</button>
							</>
						) : (
							<>
								{llm.name}
								<button onClick={() => handleEdit(llm.id, llm.name)} disabled={loading}>Edit</button>
								<button onClick={() => handleDelete(llm.id)} disabled={loading}>Delete</button>
							</>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default WorkspaceLLMConfig;
