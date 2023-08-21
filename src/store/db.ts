import Dexie, { Table } from "dexie";

export type TodoType = Omit<Todo, "createdAt">;
export interface Todo {
  id?: number;
  name: string;
  project: string;
  status: "in progress" | "done" | "todo";
  createdAt: Date;
}

export class MySubClassedDexie extends Dexie {
  task!: Table<Todo>;

  constructor() {
    super("TaskDatabase");
    this.version(1).stores({
      task: "++id, name, project, status, createdAt", // Primary key and indexed props
    });
  }
}
export const database = new MySubClassedDexie();
