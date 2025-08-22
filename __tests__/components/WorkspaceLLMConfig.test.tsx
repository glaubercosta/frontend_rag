// Corrige ambiente Node para URL (axios) antes de qualquer import de código de produção
if (typeof global.URL === 'undefined') {
  // @ts-expect-error jest-axios-node-url: Node.js não define global.URL, necessário para axios
  global.URL = require('url').URL;
}
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WorkspaceLLMConfig from '../../src/components/workspace/WorkspaceLLMConfig';
import * as LLMServiceModule from '../../src/services/LLMService';

// Corrige ambiente Node para URL
if (typeof global.URL === 'undefined') {
  // @ts-ignore
  global.URL = require('url').URL;
}

jest.mock('../../src/services/LLMService');
const mockListLLMs = LLMServiceModule.LLMService.listLLMs as jest.Mock;
const mockCreateLLM = LLMServiceModule.LLMService.createLLM as jest.Mock;
const mockUpdateLLM = LLMServiceModule.LLMService.updateLLM as jest.Mock;
const mockDeleteLLM = LLMServiceModule.LLMService.deleteLLM as jest.Mock;

describe('WorkspaceLLMConfig', () => {
  const workspaceId = 'ws1';
  beforeEach(() => {
    jest.clearAllMocks();
    mockListLLMs.mockResolvedValue([]);
  });

  it('deve exibir campo para adicionar LLM', async () => {
    render(<WorkspaceLLMConfig workspaceId={workspaceId} />);
    expect(await screen.findByPlaceholderText(/LLM name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('deve validar campo obrigatório ao adicionar', async () => {
    render(<WorkspaceLLMConfig workspaceId={workspaceId} />);
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    expect(mockCreateLLM).not.toHaveBeenCalled();
  });

  it('deve permitir salvar configuração de LLM', async () => {
    mockCreateLLM.mockResolvedValue({ id: 'llm1', name: 'GPT-4' });
    render(<WorkspaceLLMConfig workspaceId={workspaceId} />);
    const input = await screen.findByPlaceholderText(/LLM name/i);
    fireEvent.change(input, { target: { value: 'GPT-4' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    await waitFor(() => expect(mockCreateLLM).toHaveBeenCalledWith(workspaceId, 'GPT-4'));
    expect(await screen.findByText('GPT-4')).toBeInTheDocument();
  });

  it('deve permitir editar e remover configuração de LLM', async () => {
    mockListLLMs.mockResolvedValue([{ id: 'llm1', name: 'GPT-4' }]);
    mockUpdateLLM.mockResolvedValue({ id: 'llm1', name: 'Editado' });
    mockDeleteLLM.mockResolvedValue(undefined);
    render(<WorkspaceLLMConfig workspaceId={workspaceId} />);
    expect(await screen.findByText('GPT-4')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    const editInput = screen.getByDisplayValue('GPT-4');
    fireEvent.change(editInput, { target: { value: 'Editado' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    await waitFor(() => expect(mockUpdateLLM).toHaveBeenCalledWith(workspaceId, 'llm1', 'Editado'));
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    await waitFor(() => expect(mockDeleteLLM).toHaveBeenCalledWith(workspaceId, 'llm1'));
  });
});
