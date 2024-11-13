import { ReactNode } from "react";

import Sidebar from "./Sidebar/Sidebar";

import styles from "./container.module.css";

type Props = {
  children?: ReactNode;
};

export default function ContainerSidebar({ children }: Props) {
  return (
    <div className={styles.container}>
      <Sidebar />
      {children}
    </div>
  );
}
