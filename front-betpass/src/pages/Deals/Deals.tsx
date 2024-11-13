import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

import ContainerSidebar from "../../components/ContainerSidebar/ContainerSidebar";

import styles from "./deals.module.css";

const data = [
  {
    id: 1,
    name: "Lucas",
    status: "Válido",
    type: "CTT",
    paymentCycle: "Mensal",
    currency: "USD",
    createdAt: "22/04/2024",
  },
  {
    id: 2,
    name: "Vinicius",
    status: "Válido",
    type: "CDL",
    paymentCycle: "Semanal",
    currency: "BRL",
    createdAt: "24/11/2024",
  },
];

export default function Deals() {
  return (
    <ContainerSidebar>
      <div className={styles.box}>
        <div className={styles.presentation}>
          <h2>Visualizar todos os Deals</h2>
        </div>

        <div className={styles.dealsTableContainer}>
          <table className={styles.dealsTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Status</th>
                <th>Moeda</th>
                <th>Ciclo de Pagamento</th>
                <th>Data de Criação</th>

                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {data.map((deal) => (
                <tr key={deal.id}>
                  <td>{deal.id}</td>
                  <td>{deal.name}</td>
                  <td>{deal.type}</td>
                  <td>{deal.status}</td>
                  <td>{deal.currency}</td>
                  <td>{deal.paymentCycle}</td>
                  <td>{deal.createdAt}</td>

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
        </div>
      </div>
    </ContainerSidebar>
  );
}
