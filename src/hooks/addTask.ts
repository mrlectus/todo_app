import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addTask } from "../services/api_service";
import { TodoType } from "../store/db";

export const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-task"],
    mutationFn: ({ name, project, status }: TodoType) =>
      addTask({ name, project, status }),
    onSuccess: () => {
      queryClient.invalidateQueries(["task"]);
      toast.success("added successfully");
    },
  });
};
