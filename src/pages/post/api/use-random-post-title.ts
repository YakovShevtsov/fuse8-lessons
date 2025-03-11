import { useState } from 'react';
import { apiClient } from '@shared/services/request';
import handleApiError from '@shared/helpers/api-error-handler';
import apiEndPoints from '@shared/services/api-end-points';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const useRandomPostTitle = () => {
  const [postTitle, setPostTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPostTitle = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await apiClient.get<Post[]>(`${apiEndPoints.posts}`);

      if (!response.data.length) {
        throw new Error('No posts found. Please try again later.');
      }

      const randomIndex = Math.floor(Math.random() * response.data.length);

      setPostTitle(response.data[randomIndex].title);
    } catch (error: unknown) {
      setPostTitle('');
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return { fetchPostTitle, postTitle, loading, error };
};

export default useRandomPostTitle;
