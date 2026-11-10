
import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import api from "../api/axios.js";
import { useAuth } from "./AuthContext";

type WorkspaceProvideProps = {
  children: React.ReactNode;
};

type memberType = {
  role: string;
};

type taskType = {
  assignedToId: number | null;
  status: string;
};

type workspaceCount = {
  members: number;
  tasks: number;
};

interface workspaceType {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  members: memberType[];
  tasks: taskType[];
  _count: workspaceCount;
}

interface WorkspaceContextType {
  workspaces: workspaceType[] | null;
  setWorkspaces: React.Dispatch<
    React.SetStateAction<workspaceType[] | null>
  >;
  loading: boolean;
}

const WorkspaceContext =
  createContext<WorkspaceContextType | null>(null);

export const WorkspaceProvider = ({
  children,
}: WorkspaceProvideProps) => {
  const { user, loading: authLoading } = useAuth();

  const [workspaces, setWorkspaces] =
    useState<workspaceType[] | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setWorkspaces(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchWorkspaces = async () => {
      setLoading(true);

      try {
        const response = await api.get("/workspace");

        if (!cancelled) {
          setWorkspaces(response.data);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Workspace fetch failed:", error);
          setWorkspaces(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchWorkspaces();

    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  return (
    <WorkspaceContext.Provider
      value={{ workspaces, setWorkspaces, loading }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error(
      "useWorkspace must be used within WorkspaceProvider"
    );
  }

  return context;
};
