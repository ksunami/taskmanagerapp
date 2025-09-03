import React, { type ReactNode, type ElementType } from 'react';

type HeadingLevelNum = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingLevelStr = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type Props = {
  as?: HeadingLevelStr;
  level?: HeadingLevelNum;
  className?: string;
  children: ReactNode;
};

export default function Heading({ as, level, className, children }: Props) {
  const tag: HeadingLevelStr = (level
    ? (`h${level}` as HeadingLevelStr)
    : (as ?? 'h2'));
  const Tag = tag as ElementType;
  return <Tag className={className}>{children}</Tag>;
}
