import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaEdit, FaTrash, FaShoppingBag } from "react-icons/fa";
import { useDeals } from "../../context/DealsContext";

import { Deal } from "../../types/Deal";

import Loading from "../../components/Loading/Loading";
import FormCreateModal from "../../components/Modals/FormCreateModal/FormCreateModal";
import FormUpdateModal from "../../components/Modals/FormUpdateModal/FormUpdateModal";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal";
import Pagination from "../../components/Pagination/Pagination";

import styles from "./deals.module.css";

const parseData = (date: Date) => {
  const splitedDate = String(date).split("T");
  const parts = splitedDate[0].split("-");

  return `${parts[2]}/${parts[1]}/${parts[0]}`;
};

export default function Deals() {
  const { deals, getDeals, getDealsByName, totalItems, loading, itemsPerPage } =
    useDeals()!;
  const [page, setPage] = useState(1);
  const [searchedName, setSearchedName] = useState("");
  const [selectedDealId, setSelectedDealId] = useState(-1);

  const [formCreateModal, setFormCreateModal] = useState(false);
  const [formUpdateModal, setFormUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const debounceTm = useRef<number | null>(null);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    if (debounceTm.current) clearTimeout(debounceTm.current);

    debounceTm.current = setTimeout(() => {
      if (searchedName.length === 0) {
        getDeals(page);
      } else getDealsByName(page, searchedName);
    }, 200);

    return () => {
      if (debounceTm.current) clearTimeout(debounceTm.current);
    };
  }, [page, getDeals, getDealsByName, searchedName]);

  // Handlers
  const handleCloseModal = () => {
    setFormCreateModal(false);
    setDeleteModal(false);
    setFormUpdateModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <a href="/">
          <FaShoppingBag />
          <span>Loja de Deals</span>
        </a>
      </div>

      <div className={styles.box}>
        <div className={styles.header}>
          <h2>DEALS</h2>
          <button onClick={() => setFormCreateModal(true)}>CRIAR DEAL</button>
        </div>

        <hr />

        <input
          onInput={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchedName(e.target.value)
          }
          className={styles.inpt}
          placeholder="Pesquisar por nome"
          type="text"
        />

        {loading ? (
          <div className={styles.loadingContainer}>
            <Loading />
          </div>
        ) : (
          <>
            <div className={styles.deals}>
              {deals.map((deal: Deal) => (
                <div className={styles.deal} key={deal.id}>
                  <div className={styles.dealHeader}>
                    <div className={styles.dealName}>
                      <div className={styles.smallIcon}></div>
                      <span>{deal.name}</span>
                    </div>

                    <div className={styles.dealButtons}>
                      <button
                        onClick={() => {
                          setSelectedDealId(deal.id);
                          setFormUpdateModal(true);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedDealId(deal.id);
                          setDeleteModal(true);
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <div className={styles.dealInfo}>
                    <p>{deal.description}</p>

                    <div className={styles.dealStatus}>
                      <div>
                        <strong>Nota: </strong>
                        <span>{deal.score}</span>
                      </div>

                      <div>
                        <strong>Esgotado: </strong>
                        <span>{deal.isExhausted ? "✅" : "❌"}</span>
                      </div>

                      <div>
                        <strong>Data de Criação: </strong>
                        <span>{parseData(deal.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onClickFunction={(e) => setPage(e)}
            />
          </>
        )}
      </div>

      {formCreateModal && (
        <FormCreateModal onCloseFunction={handleCloseModal} />
      )}

      {deleteModal && (
        <DeleteModal onCloseFunction={handleCloseModal} id={selectedDealId} />
      )}

      {formUpdateModal && (
        <FormUpdateModal
          onCloseFunction={handleCloseModal}
          id={selectedDealId}
        />
      )}
    </div>
  );
}
