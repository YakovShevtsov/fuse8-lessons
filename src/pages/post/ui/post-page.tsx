import Button from '@shared/ui/button/button';
import Error from '@shared/ui/error/error';
import useRandomPostTitle from '@pages/post/api/use-random-post-title';

const PostPage = () => {
  const { fetchPostTitle, postTitle, loading, error } = useRandomPostTitle();

  return (
    <article>
      <h1>Random post title!</h1>

      {error && <Error message={error} />}
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
