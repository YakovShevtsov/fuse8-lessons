import Button from '../../../shared/ui/button/button';
import useRandomPostTitle from '../api/use-random-post-title';

const PostPage = () => {
  const { fetchPostTitle, postTitle, loading, error } = useRandomPostTitle();

  return (
    <article>
      <h1>Random post title!</h1>

      {error && <p>{error}</p>}
      {postTitle ? (
        <p>{postTitle}</p>
      ) : (
        <Button onClick={fetchPostTitle} disabled={loading}>
          {loading ? 'Loading...' : 'Generate title'}
        </Button>
      )}
    </article>
  );
};

export default PostPage;
