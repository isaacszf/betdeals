/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { Deal } from "../types/Deal";
import { localUrl } from "../api/url";
import { InputCreateForm } from "../types/InputCreateForm";
import { InputUpdateForm } from "../types/InputUpdateForm";

type DealsProviderProps = {
  children: ReactNode;
};

type DealsContextType = {
  deals: Deal[];
  deal: Deal | null;

  getDeals: (page: number) => Promise<void>;
  getDealsByName: (page: number, name: string) => Promise<void>;
  getDealById: (id: number) => Promise<void>;
  postDeal: (formValues: InputCreateForm) => Promise<void>;
  updateDeal: (id: number, formValues: InputUpdateForm) => Promise<void>;
  deleteDeal: (id: number) => Promise<void>;

  totalItems: number;
  itemsPerPage: number;
  loading: boolean;
};

const showToast = (msg: string) => {
  return toast(msg, {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    theme: "dark",
  });
};

const DealsContext = createContext<DealsContextType | undefined>(undefined);

export const DealsProvider = ({ children }: DealsProviderProps) => {
  const [deals, setDeals] = useState([]);
  const [deal, setDeal] = useState<Deal | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 8;

  const handleRequest = useCallback(
    async (
      request: () => Promise<any>,
      toast: boolean,
      successMessage?: string,
      errorMessage?: string
    ) => {
      setLoading(true);
      try {
        const resp = await request();
        if (resp.data.success) {
          if (toast) showToast(successMessage!);
          return resp.data;
        }
      } catch (err) {
        console.error(err);
        if (toast) showToast(errorMessage!);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getDeals = useCallback(
    async (page: number) => {
      const data = await handleRequest(
        () =>
          axios.get(`${localUrl}/deals`, {
            params: { page, size: itemsPerPage },
          }),
        false
      );

      if (data) {
        setDeals(data.data.items);
        setTotalItems(data.data.totalItems);
      }
    },
    [handleRequest]
  );

  const getDealsByName = useCallback(
    async (page: number, name: string) => {
      const data = await handleRequest(
        () =>
          axios.get(`${localUrl}/deals/names/${name}`, {
            params: { page, size: itemsPerPage },
          }),
        false
      );

      if (data) {
        setDeals(data.data.items);
        setTotalItems(data.data.totalItems);
      }
    },
    [handleRequest]
  );

  const getDealById = useCallback(
    async (id: number) => {
      const data = await handleRequest(
        () => axios.get(`${localUrl}/deals/${id}`),
        false
      );

      if (data) {
        setDeal(data.data);
      }
    },
    [handleRequest]
  );

  const postDeal = async (formValues: InputCreateForm) => {
    await handleRequest(
      () => axios.post(`${localUrl}/deals`, formValues),
      true,
      "✅ Deal foi cadastrado com sucesso!",
      "❌ Falha ao tentar criar Deal, tente novamente mais tarde."
    );
    await getDeals(1);
  };

  const updateDeal = async (id: number, formValue: InputUpdateForm) => {
    await handleRequest(
      () => axios.patch(`${localUrl}/deals/${id}`, formValue),
      true,
      "✅ Deal foi editado com sucesso!",
      "❌ Falha ao tentar editar Deal, tente novamente mais tarde."
    );
    await getDeals(1);
  };

  const deleteDeal = async (id: number) => {
    await handleRequest(
      () => axios.delete(`${localUrl}/deals/${id}`),
      true,
      "✅ Deal foi deletado com sucesso!",
      "❌ Failed to delete deal. Please try again later."
    );
    await getDeals(1);
  };

  return (
    <DealsContext.Provider
      value={{
        deals,
        deal,
        getDeals,
        getDealsByName,
        getDealById,
        postDeal,
        updateDeal,
        deleteDeal,
        totalItems,
        loading,
        itemsPerPage,
      }}
    >
      {children}
    </DealsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDeals = () => useContext(DealsContext);
