import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { TodoType } from "../store/db";
import { updateTask } from "@/services/api_service";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-task"],
    mutationFn: ({ id, name, project, status }: TodoType) =>
      updateTask({ id, name, project, status }),
    onSuccess: () => {
      queryClient.invalidateQueries(["task"]);
      toast.success("task updated successfully");
    },
  });
};
