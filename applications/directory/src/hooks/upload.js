import { useHttpClient } from '@artistdirectory/react-hooks';

const useUpload = () => {
  const { httpClient } = useHttpClient();

  const getSignedProfileUrl = async (mimeType) => {
    try {
      const url = `/uploads/signed-url/profile`;
      const data = await httpClient.post(url, { mimeType });

      return {
        data,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  };

  const uploadFile = async (signedUrl, file) => {
    const body = new Blob([file], { type: file.type });

    try {
      const response = await fetch(signedUrl, {
        method: 'PUT',
        body,
      });
      return { response };
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
