import { UserButton } from "@clerk/clerk-react";
import { useForm } from "react-hook-form";
import { Button } from "./component/ui/button";
import { Todo } from "./store/db";
import { useAddTask } from "./hooks/addTask";
import TaskTable from "./component/ui/TaskTable";

const Root = () => {
  const { register, handleSubmit } = useForm<Todo>();
  const addTask = useAddTask();
  return (
    <main className="p-10 flex flex-col gap-8">
      <section className="flex flex-col gap-2">
        <UserButton />
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit((data) => {
            console.log(data);
            addTask.mutate(data);
          })}
        >
          <fieldset className="flex flex-col gap-4 sm:flex-row">
            <legend>Add a Task</legend>
            <input
              {...register("name", {
                required: true,
              })}
              type="text"
              className="h-10 border border-black/20 outline-none rounded-md p-2"
              placeholder="Enter task"
              autoComplete="task"
            />
            <input
              {...register("project", {
                required: true,
              })}
              type="text"
              className="h-10 border border-black/20 outline-none rounded-md p-2"
              placeholder="project type"
            />
          </fieldset>
          <fieldset>
            <select
              className="p-2 outline-none rounded-md"
              {...register("status", {
                required: true,
              })}
            >
              <option>todo</option>
              <option>in progress</option>
              <option>done</option>
            </select>
          </fieldset>
          <div className="flex justify-start">
            <Button
              loading={addTask?.isLoading ? 1 : 0}
              disabled={addTask?.isLoading}
              type="submit"
              className="p-2 w-48 outline-none h-10 bg-blue-500 text-white rounded-md"
            >
              Submit
            </Button>
          </div>
        </form>
      </section>
      <section>
        <TaskTable />
      </section>
    </main>
  );
};

export default Root;
