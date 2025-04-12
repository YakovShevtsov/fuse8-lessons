import styles from './article-creation-page.module.scss';

import { ArticleCreationForm } from './article-creation-form/article-creation-form';

export const ArticleCreation = () => {
  return (
    <div className="container">
      <h1 className={styles['create-article-title']}>Создать статью</h1>
      <ArticleCreationForm />
    </div>
  );
};
