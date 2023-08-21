import { useAllTask } from "@/hooks/getAllTask";
import { Button } from "./button";
import { useDeleteTask } from "@/hooks/deleteTask";
import { dateFormater } from "@/utils/loader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Todo } from "@/store/db";
import { useUpdateTask } from "@/hooks/updateTask";

const header = ["id", "Task", "Project", "Status", "createdAt", "action"];
const TaskTable = () => {
  const { data } = useAllTask();
  const { register, handleSubmit } = useForm<Todo>();
  const deleteTask = useDeleteTask();
  const updateTask = useUpdateTask();
  if (data?.length == 0) return null;
  return (
    <>
      <Table>
        <TableHeader className="">
          <TableRow>
            {header.map((head) => (
              <TableHead key={head}>{head}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((task) => (
            <Dialog key={task.id}>
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.project}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{dateFormater(task.createdAt)}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => deleteTask.mutate(task?.id)}
                    className="bg-red-600 text-white outline-none rounded-md m-2 p-1"
                  >
                    delete
                  </Button>
                </TableCell>
                <TableCell>
                  <DialogTrigger className="bg-black text-white outline-none rounded-md m-2 p-1">
                    edit
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update task no {task.id}</DialogTitle>
                      <form className="flex flex-col gap-4">
                        <fieldset className="flex gap-4 flex-col">
                          <legend>Add a Task</legend>
                          <input
                            {...register("name", {
                              required: true,
                              value: task.name,
                            })}
                            type="text"
                            className="h-10 border border-black/20 outline-none rounded-md p-2"
                            placeholder="Enter task"
                            autoComplete="task"
                          />
                          <input
                            {...register("project", {
                              required: true,
                              value: task.project,
                            })}
                            type="text"
                            className="h-10 border border-black/20 outline-none rounded-md p-2"
                            placeholder="project type"
                          />
                        </fieldset>
                        <fieldset className="flex">
                          <select
                            className="p-2 outline-none rounded-md"
                            {...register("status", {
                              required: true,
                              value: task.status,
                            })}
                          >
                            <option>todo</option>
                            <option>in progress</option>
                            <option>done</option>
                          </select>
                        </fieldset>
                      </form>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        onClick={handleSubmit((data) =>
                          updateTask.mutate({ id: task.id, ...data })
                        )}
                        className="bg-black text-white rounded-md p-2 outline-none"
                        type="submit"
                      >
                        Update
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </TableCell>
              </TableRow>
            </Dialog>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TaskTable;
