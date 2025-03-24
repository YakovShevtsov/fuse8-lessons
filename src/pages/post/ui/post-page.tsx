import { Button } from '@shared/ui/button/button';
import { Error } from '@shared/ui/error/error';
import { useRandomPostTitle } from '@pages/post/api/use-random-post-title';
import styles from './post-page.module.scss';

export const PostPage = () => {
  const { fetchPostTitle, postTitle, loading, error } = useRandomPostTitle();

  return (
    <div className="container">
      <h1 className={styles['post-page-title']}>Random post title!</h1>

      {error && <Error message={error} isVisible={true} />}
      {postTitle ? (
        <article>
          <p className={styles['random-post-title']}>{postTitle}</p>
        </article>
      ) : (
        <Button
          className={styles['random-post-btn']}
          onClick={fetchPostTitle}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Generate title'}
        </Button>
      )}
    </div>
  );
};
