import axios from 'axios';

const DEFAULT_ERROR = 'An unexpected error occurred. Please try again later.';

const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;

    if (statusCode === 404) {
      return 'Cannot find data. Please try again later.';
    } else if (statusCode === 500) {
      return 'Server error! Please try again later.';
    } else {
      return error.message || DEFAULT_ERROR;
    }
  } else if (error instanceof Error) {
    return error.message || DEFAULT_ERROR;
  }

  return DEFAULT_ERROR;
};

export default handleApiError;
