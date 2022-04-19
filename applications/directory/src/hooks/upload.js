import { useHttpClient } from "@artistdirectory/react-hooks";

const useUpload = () => {
  const { httpClient } = useHttpClient();
  const getSignedProfileUrl = async (metadata) => {
    try {
      const url = `/uploads/signed-url/profile`;
      const signedUrl = await httpClient.post(url, metadata);

      return {
        signedUrl,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  };

  const uploadFile = async (signedUrl, file) => {
    const body = new FormData();
    body.append("image", file);
    try {
      const uploadedImageUrl = await httpClient.put(signedUrl, body);
      return { uploadedImageUrl };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  };

  return {
    getSignedProfileUrl,
    uploadFile,
  };
};

export default useUpload;
