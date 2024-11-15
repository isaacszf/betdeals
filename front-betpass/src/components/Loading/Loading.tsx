import styles from "./loading.module.css";

type Props = {
  msg?: string;
};

export default function Loading({ msg }: Props) {
  return <div className={styles.loader}>{msg && <h4>msg</h4>}</div>;
}
