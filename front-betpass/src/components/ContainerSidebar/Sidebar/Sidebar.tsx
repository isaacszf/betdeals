import { FaFileContract, FaFile } from "react-icons/fa";

import styles from "./sidebar.module.css";

const items = [
  {
    name: "Visualizar Deals",
    icon: <FaFileContract />,
    path: "/deals",
  },
  {
    name: "Registrar Deal",
    icon: <FaFile />,
    path: "/register-deal",
  },
];

export default function Sidebar() {
  return (
    <div className={styles.sidebarContainer}>
      <div className="logo-container">
        <h2 className={styles.title}>
          <a href="/">
            <span>bet</span>deals
          </a>
        </h2>
      </div>

      <div className={styles.deals}>
        <h3>Deals</h3>

        {items.map((item, i) => (
          <a key={i} className={styles.dealItem} href={item.path}>
            {item.icon}
            <span>{item.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
