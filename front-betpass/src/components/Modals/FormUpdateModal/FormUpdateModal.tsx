/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { FaX } from "react-icons/fa6";

import styles from "./modal.module.css";

import { InputCreateForm } from "../../../types/InputCreateForm";
import { useDeals } from "../../../context/DealsContext";

type Props = {
  onCloseFunction: (e: MouseEvent<HTMLButtonElement>) => void;
  id: number;
};

export default function FormUpdateModal({ id, onCloseFunction }: Props) {
  const { updateDeal, getDealById, deal, loading } = useDeals()!;

  const [formValues, setFormValues] = useState<InputCreateForm>({
    name: "",
    description: "",
    score: 0,
    isExhausted: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    score: "",
  });

  useEffect(() => {
    getDealById(id);
  }, [id, getDealById]);

  useEffect(() => {
    if (deal) {
      setFormValues({
        name: deal.name,
        description: deal.description,
        score: deal.score,
        isExhausted: deal.isExhausted,
      });
    }
  }, [deal]);

  // Handles
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement> | any) => {
    const { name } = e.target;
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors: any = {};

    if (formValues.name.length < 5 || formValues.name.length > 100)
      newErrors.name = "Nome precisa ter entre 5-25 caractereres!";

    if (formValues.description.length < 5 || formValues.description.length > 80)
      newErrors.description = "Descrição precisa ter entre 5-80 caractereres!";

    if (!formValues.score || formValues.score <= 0 || formValues.score > 10_000)
      newErrors.score = "Valor precisa ser um número positivo entre 1-10.000!";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) await updateDeal(id, formValues);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3>Editar Deal</h3>
          <button onClick={onCloseFunction}>
            <FaX />
          </button>
        </div>

        <form className={styles.form}>
          <div className={styles.labelContainer}>
            <label>Nome da Casa</label>
            <input
              value={formValues.name}
              type="text"
              placeholder="Exemplo: ABC BET"
              name="name"
              onChange={handleInputChange}
              onFocus={handleFocus}
            />

            {errors.name && <span className={styles.err}>{errors.name}</span>}
          </div>
          <div className={styles.labelContainer}>
            <label>Descrição</label>
            <textarea
              value={formValues.description}
              placeholder="Descrição do deal"
              name="description"
              onChange={handleInputChange}
              onFocus={handleFocus}
            />

            {errors.description && (
              <span className={styles.err}>{errors.description}</span>
            )}
          </div>
          <div className={styles.labelContainer}>
            <label>Nota</label>
            <input
              value={formValues.score}
              type="number"
              name="score"
              id={styles.scoreInput}
              placeholder="5"
              onChange={handleInputChange}
              onFocus={handleFocus}
            />

            {errors.score && <span className={styles.err}>{errors.score}</span>}
          </div>

          <div className={styles.checkbox}>
            <input
              checked={formValues.isExhausted}
              type="checkbox"
              id="toggle"
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  isExhausted: e.target.checked,
                })
              }
              className={styles.toggleInput}
            />
            <label htmlFor="toggle" className={styles.toggleLabel}>
              <span className={styles.toggleCircle}></span>
            </label>
            <span>Esgotar Deal</span>
          </div>

          <div className={styles.formButtons}>
            <button onClick={onCloseFunction}>Cancelar</button>
            <button onClick={handleSubmit} disabled={loading}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
