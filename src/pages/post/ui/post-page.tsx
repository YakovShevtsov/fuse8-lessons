import Button from '@shared/ui/button/button';
import Error from '@shared/ui/error/error';
import useRandomPostTitle from '@pages/post/api/use-random-post-title';
import styles from './post-page.module.scss';

const PostPage = () => {
  const { fetchPostTitle, postTitle, loading, error } = useRandomPostTitle();

  return (
    <div className={styles['post-page']}>
      <h1>Random post title!</h1>
      <article>
        {error && <Error message={error} />}
        {postTitle ? (
          <p>{postTitle}</p>
        ) : (
          <Button
            className={styles['random-post-btn']}
            onClick={fetchPostTitle}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Generate title'}
          </Button>
        )}
      </article>
    </div>
  );
};

export default PostPage;
