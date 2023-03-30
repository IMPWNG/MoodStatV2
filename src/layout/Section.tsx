import type { ReactNode } from 'react';

type ISection = {
  children: ReactNode;
};

const Section = (props: ISection) => (
  <div className="my-8 px-3 sm:px-5 lg:px-6">{props.children}</div>
);

export { Section };
