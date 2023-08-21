import { useQuery } from "@tanstack/react-query";
import { getAllTask } from "../services/api_service";

export const useAllTask = () => {
  return useQuery({
    queryKey: ["task"],
    queryFn: getAllTask,
  });
};
