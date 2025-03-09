import { useState } from 'react';
import { apiClient } from '@shared/services/request';
import axios from 'axios';

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
      const response = await apiClient.get<Post[]>('/postsdsds');

      if (!response.data.length) {
        throw new Error('No posts found. Please try again later.');
      }

      const randomIndex = Math.floor(Math.random() * response.data.length);

      setPostTitle(response.data[randomIndex].title);
    } catch (error: unknown) {
      setPostTitle('');

      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;

        if (statusCode === 404) {
          setError('Cannot find posts. Please try again later.');
        } else if (statusCode === 500) {
          setError('Server error! Please try again later.');
        } else {
          setError(
            error.message ||
              'An unexpected error occurred. Please try again later.'
          );
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return { fetchPostTitle, postTitle, loading, error };
};

export default useRandomPostTitle;
