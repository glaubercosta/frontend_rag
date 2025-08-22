// Service for workspace CRUD operations (placeholder)
export class WorkspaceService {
  static async listWorkspaces() {
    return [];
  }
  static async createWorkspace(name: string) {
    return { id: Date.now().toString(), name };
  }
  static async renameWorkspace(_id: string, newName: string) {
    return { id: _id, name: newName };
  }
  static async deleteWorkspace(id: string) {
    return true;
  }
}
