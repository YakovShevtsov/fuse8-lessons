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

const POSTS_AMOUNT = 100;

export const useRandomPostTitle = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPostTitle = async () => {
    setError(null);
    setLoading(true);
    try {
      const randomPostId = Math.floor(Math.random() * POSTS_AMOUNT) + 1;

      const response = await apiClient.get<Post>(
        `${apiEndPoints.posts}/${randomPostId}`
      );

      if (!response.data) {
        throw new Error('Cant find post. Please try again later.');
      }

      setPost(response.data);
    } catch (error: unknown) {
      setPost(null);
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return { fetchPostTitle, postTitle: post?.title, loading, error };
};

export default useRandomPostTitle;
