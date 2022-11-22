export interface TodoProps {
  title: string;
  category: string;
  description: string;
  level: string;
  id: string;
  completed: boolean;
}

export type TodosAppliedFilterTypes = "all" | "completed" | "uncompleted";
