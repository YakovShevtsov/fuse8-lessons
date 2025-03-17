import { forwardRef } from 'react';
import styles from './screen.module.scss';
import classNames from 'classnames';

interface ScreenProps {
  id?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const Screen = forwardRef<HTMLElement, ScreenProps>(
  ({ id, children, className, style }, ref) => {
    return (
      <section
        ref={ref as React.Ref<HTMLElement>}
        id={id}
        className={classNames(styles.screen, className)}
        style={style}
      >
        {children}
      </section>
    );
  }
);

export default Screen;
