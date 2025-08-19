"use client";
import React from "react";
import WorkspaceManager from "@/components/workspace/WorkspaceManager";

export default function WorkspacesPage() {
  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Workspaces</h1>
      <WorkspaceManager />
    </main>
  );
}
