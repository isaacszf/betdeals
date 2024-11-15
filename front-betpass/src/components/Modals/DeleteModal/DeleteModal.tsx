import { MouseEvent, useEffect } from "react";
import { FaX } from "react-icons/fa6";

import { useDeals } from "../../../context/DealsContext";

import styles from "./modal.module.css";

type Props = {
  onCloseFunction: (e: MouseEvent<HTMLButtonElement>) => void;
  id: number;
};

export default function DeleteModal({ id, onCloseFunction }: Props) {
  const { deleteDeal, getDealById, deal, loading } = useDeals()!;

  useEffect(() => {
    getDealById(id);
  }, [getDealById, id]);

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3>Excluir Deal</h3>
          <button onClick={onCloseFunction}>
            <FaX />
          </button>
        </div>

        <p className={styles.ask}>
          Você tem certeza de que deseja excluir o deal{" "}
          <strong>"{deal?.name}"</strong>? Esta ação não pode ser desfeita.
        </p>

        <div className={styles.buttons}>
          <button onClick={onCloseFunction}>Cancelar</button>

          <button
            className={styles.confirmBtn}
            disabled={loading}
            onClick={(e) => {
              deleteDeal(id);
              onCloseFunction(e);
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
