import type { ReactNode } from "react";

interface Props {
  child: ReactNode;
}
const formWrapper = ({ child }: Props) => {
  return <div className="p-2 pb-0">{child}</div>;
};

export default formWrapper;
