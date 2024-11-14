/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  MouseEventHandler,
  useState,
} from "react";
import axios from "axios";
import { FaX } from "react-icons/fa6";
import { toast } from "react-toastify";

import styles from "./modal.module.css";

import { InputCreateForm } from "../../../types/InputCreateForm";
import { localUrl } from "../../../api/url";

const containNumber = (str: string) => /\d/.test(str);

type Props = {
  onCloseFunction: MouseEventHandler<HTMLButtonElement>;
};

export default function FormCreateModal({ onCloseFunction }: Props) {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<InputCreateForm>({
    name: "",
    bettingHouse: "",
    affiliate: "",
    currency: "",
    description: "",
    paymentCycle: "semanal",
    revenueSharePercentage: 0,
    status: "ativo",
    value: 0,
    type: "cpa",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    bettingHouse: "",
    affiliate: "",
    value: "",
    revenueSharePercentage: "",
    currency: "",
  });

  // Fetchs
  const postDeal = async () => {
    setLoading(true);

    try {
      const resp = await axios.post(`${localUrl}/deals`, formValues);

      if (resp.data.success) {
        toast("✅ Deal foi cadastrado com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      console.error(err);

      toast(
        "❌ Ocorreu um erro ao adicionar um deal, tente novamente mais tarde.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "light",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  // Handles
  const handleInputChange = (e: ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFocus = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors: any = {};

    if (formValues.name.length < 5 || formValues.name.length > 100)
      newErrors.name = "Nome precisa ter entre 5-100 caractereres!";

    if (!formValues.description)
      newErrors.description = "Descrição não pode estar vazia!";

    if (!formValues.affiliate)
      newErrors.affiliate = "Afiliado não pode estar vazio!";

    if (!formValues.bettingHouse)
      newErrors.bettingHouse = "Casa de Bet não pode estar vazia!";

    if (!formValues.value || formValues.value <= 0)
      newErrors.value = "Valor precisa ser um número positivo!";

    if (
      formValues.revenueSharePercentage <= 0 ||
      formValues.revenueSharePercentage > 100
    )
      newErrors.revenueSharePercentage =
        "Porcentagem precisa estar entre 0 e 100!";

    if (formValues.currency.length !== 3)
      newErrors.currency = "Tipo de moeda não pode passar de 3 caractereres!";

    if (containNumber(formValues.currency))
      newErrors.currency = "Tipo de moeda não pode conter números!";

    setErrors(newErrors);

    // up
    if (Object.keys(newErrors).length === 0) {
      await postDeal();
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3>Adicionar um novo Deal</h3>
          <button onClick={onCloseFunction}>
            <FaX />
          </button>
        </div>

        <form className={styles.createForm}>
          <div className={styles.field}>
            <h4>Detalhes Gerais</h4>

            <div className={styles.camps}>
              <div className={styles.labelContainer}>
                <label>Nome</label>
                <input
                  type="text"
                  placeholder="Digite o nome"
                  name="name"
                  onInput={handleInputChange}
                  onFocus={handleFocus}
                />
                {errors.name && <div className={styles.err}>{errors.name}</div>}
              </div>

              <div className={styles.labelContainer}>
                <label>Descrição</label>
                <textarea
                  placeholder="Digite a descrição"
                  name="description"
                  onInput={handleInputChange}
                  onFocus={handleFocus}
                />
                {errors.description && (
                  <div className={styles.err}>{errors.description}</div>
                )}
              </div>

              <div className={styles.labelContainer}>
                <label>Casa de Bet</label>
                <input
                  type="text"
                  placeholder="Digite o nome da Casa de Bet"
                  name="bettingHouse"
                  onInput={handleInputChange}
                  onFocus={handleFocus}
                />
                {errors.bettingHouse && (
                  <div className={styles.err}>{errors.bettingHouse}</div>
                )}
              </div>

              <div className={styles.labelContainer}>
                <label>Afiliado</label>
                <input
                  type="text"
                  placeholder="Digite o nome do Afiliado"
                  name="affiliate"
                  onInput={handleInputChange}
                  onFocus={handleFocus}
                />
                {errors.affiliate && (
                  <div className={styles.err}>{errors.affiliate}</div>
                )}
              </div>

              <div className={styles.labelContainer}>
                <label>Status</label>
                <select name="status" onChange={handleInputChange}>
                  <option value="ativo">Ativo</option>
                  <option value="pendente">Pendente</option>
                  <option value="suspenso">Suspenso</option>
                  <option value="expirado">Expirado</option>
                  <option value="encerrado">Encerrado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>

              <div className={styles.labelContainer}>
                <label>Tipo</label>
                <select name="type" onChange={handleInputChange}>
                  <option value="cpa">CPA</option>
                  <option value="revshare">Rev Share</option>
                  <option value="flat">Flat Free</option>
                  <option value="hybrid">Híbrido</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.field}>
            <h4>Detalhes Numerais</h4>

            <div className={styles.camps}>
              <div className={styles.labelContainer}>
                <label>Valor</label>
                <input
                  type="number"
                  min="1"
                  step="any"
                  placeholder="Digite o valor"
                  name="value"
                  onInput={handleInputChange}
                  onFocus={handleFocus}
                />
                {errors.value && (
                  <div className={styles.err}>{errors.value}</div>
                )}
              </div>

              <div className={styles.labelContainer}>
                <label>Porcenagem de Receita</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  placeholder="Digite a porcentagem"
                  name="revenueSharePercentage"
                  onInput={handleInputChange}
                  onFocus={handleFocus}
                />
                {errors.revenueSharePercentage && (
                  <div className={styles.err}>
                    {errors.revenueSharePercentage}
                  </div>
                )}
              </div>

              <div className={styles.labelContainer}>
                <label>Moeda</label>
                <input
                  type="text"
                  placeholder="Digite a sigla da moeda"
                  name="currency"
                  onInput={handleInputChange}
                  onFocus={handleFocus}
                />
                {errors.currency && (
                  <div className={styles.err}>{errors.currency}</div>
                )}
              </div>

              <div className={styles.labelContainer}>
                <label>Ciclo de Pagamento</label>
                <select name="paymentCycle" onChange={handleInputChange}>
                  <option value="semanal">Semanal</option>
                  <option value="quaternal">Quaternal</option>
                  <option value="mensal">Mensal</option>
                  <option value="mensal">Anual</option>
                </select>
              </div>
            </div>
          </div>

          <button
            className={styles.finishFormBtn}
            onClick={handleSubmit}
            disabled={loading}
          >
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
}
