import { Children, ReactNode } from 'react';

type EachRenderProps<T> = {
  render: (item: T, index: number) => ReactNode;
  of: T[];
};

export const EachRender = <T,>({ render, of }: EachRenderProps<T>) =>
  Children.toArray(of.map((item, index) => render(item, index)));

type EachArrayRenderProps = {
  render: (item: undefined, index: number) => ReactNode;
  size: number;
};

export const EachArrayRender = ({ render, size }: EachArrayRenderProps) =>
  Array.from({ length: size }, (_, index) => render(undefined, index));
