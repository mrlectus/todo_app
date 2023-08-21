import toast from "react-hot-toast";
import { Todo, TodoType, database } from "../store/db";

export const getAllTask = async () => {
  const task = await database.task.toArray();
  return task;
};

export const deleteTask = async (id: number) => {
  (id && (await database.task.where("id").equals(id).delete())) ||
    toast.error("cannot delete!");
};

export const addTask = async ({ name, project, status }: TodoType) => {
  await database.task.add({
    name,
    status,
    project,
    createdAt: new Date(),
  });
};

export const updateTask = async ({ id, name, project, status }: TodoType) => {
  console.log(id, name, project, status);
  const updated = await database.task.update(id as number, {
    name,
    project,
    status,
    createdAt: new Date(),
  });
  if (updated) console.log("updated");
  else console.log("noting was updated");
};
