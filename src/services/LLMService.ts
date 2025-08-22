import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export type LLM = { id: string; name: string };

export class LLMService {
  static async listLLMs(workspaceId: string): Promise<LLM[]> {
    const res = await axios.get(`${API_URL}/workspaces/${workspaceId}/llms`);
    return res.data;
  }
  static async createLLM(workspaceId: string, name: string): Promise<LLM> {
    const res = await axios.post(`${API_URL}/workspaces/${workspaceId}/llms`, { name });
    return res.data;
  }
  static async updateLLM(workspaceId: string, llmId: string, name: string): Promise<LLM> {
    const res = await axios.put(`${API_URL}/workspaces/${workspaceId}/llms/${llmId}`, { name });
    return res.data;
  }
  static async deleteLLM(workspaceId: string, llmId: string): Promise<void> {
    await axios.delete(`${API_URL}/workspaces/${workspaceId}/llms/${llmId}`);
  }
}
