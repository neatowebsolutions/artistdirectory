import useSWR from "swr";
import { useHttpClient } from "@artistdirectory/react-hooks";

const useSkills = () => {
  const { httpClient } = useHttpClient();

  const { data: skills, error: skillsError } = useSWR(
    `/skills`,
    httpClient.get.bind(httpClient),
    {
      revalidateOnFocus: false,
    }
  );
  const skillsLoading = !skills && !skillsError;

  return {
    skills,
    skillsLoading,
    skillsError,
  };
};

export default useSkills;
