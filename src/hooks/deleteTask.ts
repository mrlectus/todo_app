import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../services/api_service";
import toast from "react-hot-toast";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-task"],
    mutationFn: (id: number | undefined) => deleteTask(id as number),
    onSuccess: () => {
      toast.success("task deleted successfully");
      queryClient.invalidateQueries(["task"]);
    },
  });
};
