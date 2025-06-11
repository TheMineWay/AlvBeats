import clsx from "clsx";
import { HTMLAttributes } from "react";

export type ContainerProps = {
  children: React.ReactNode;
} & Pick<HTMLAttributes<HTMLDivElement>, "className">;

const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={clsx("container mx-auto px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
};

export default Container;
