import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import axios from "axios";

import { Deal } from "../../types/Deal";
import { localUrl } from "../../api/url";

import Logo from "../../components/Logo/Logo";
import Pagination from "../../components/Pagination/Pagination";

import styles from "./deals.module.css";
import FormCreateModal from "../../components/Modals/FormCreateModal/FormCreateModal";

const parseData = (date: Date) => {
  const splitedDate = String(date).split("T");
  return splitedDate[0];
};

const title = (str: string) => {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
};

export default function Deals() {
  const [name, setName] = useState("");
  const [deals, setDeals] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const [formCreateModal, setFormCreateModal] = useState(false);

  const itemsPerPage = 15;

  // Fetchs
  const getDeals = async (page: number) => {
    setLoading(true);

    try {
      const resp = await axios.get(`${localUrl}/deals`, {
        params: { page, size: itemsPerPage },
      });

      if (resp.data.success) {
        setDeals(resp.data.data.items);
        setTotalItems(resp.data.data.totalItems);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getDealsByName = async (page: number, name: string) => {
    setLoading(true);

    try {
      const resp = await axios.get(`${localUrl}/deals/names/${name}`, {
        params: { page, size: itemsPerPage },
      });

      if (resp.data.success) {
        setDeals(resp.data.data.items);
        setTotalItems(resp.data.data.totalItems);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDeals(page);
  }, [page]);

  // Handlers
  const handleSearchByName = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (name.length >= 1) {
      getDealsByName(page, name);
      setName("");
    } else getDeals(page);
  };

  const handleCloseModal = () => setFormCreateModal(false);

  // Others
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div>
      <div className={styles.box}>
        <div className={styles.presentation}>
          <a href="/">
            <Logo />
          </a>
        </div>

        <div className={styles.dealsTableContainer}>
          {loading ? (
            <div>Carregando</div>
          ) : (
            <>
              <div className={styles.fullForm}>
                <form className={styles.form}>
                  <input
                    type="text"
                    placeholder="Pesquisar por nome..."
                    onInput={(e: ChangeEvent<HTMLInputElement>) =>
                      setName(e.target.value)
                    }
                  />
                  <button onClick={handleSearchByName}>Pesquisar</button>
                </form>

                <hr className={styles.bar} />

                <button
                  className={styles.addBtn}
                  onClick={() => setFormCreateModal(true)}
                >
                  Adicionar Deal
                </button>
              </div>

              <table className={styles.dealsTable}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>Status</th>
                    <th>Casa de Bet</th>
                    <th>Afiliado</th>
                    <th>Moeda</th>
                    <th>Ciclo de Pagamento</th>
                    <th>Data de Criação</th>
                    <th>Última Edição</th>

                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {deals.map((deal: Deal) => (
                    <tr key={deal.id}>
                      <td>{deal.id}</td>
                      <td>{deal.name}</td>
                      <td>{deal.type.toUpperCase()}</td>
                      <td>{title(deal.status)}</td>
                      <td>{deal.bettingHouse}</td>
                      <td>{deal.affiliate}</td>
                      <td>{deal.currency.toUpperCase()}</td>
                      <td>{title(deal.paymentCycle)}</td>
                      <td>{parseData(deal.createdAt)}</td>
                      <td>{parseData(deal.updated!)}</td>

                      <td id={styles.buttons}>
                        <button id={styles.see}>
                          <FaEye />
                        </button>
                        <button id={styles.edit}>
                          <FaEdit />
                        </button>
                        <button id={styles.delete}>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div>
                <Pagination
                  onClickFunction={(n) => setPage(n)}
                  totalPages={totalPages}
                  currentPage={page}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {formCreateModal && (
        <FormCreateModal onCloseFunction={handleCloseModal} />
      )}
    </div>
  );
}
