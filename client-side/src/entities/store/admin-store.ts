import { makeAutoObservable } from "mobx";
import { adminApi } from "../endpoints/admin-api";

class AdminStore {
  isAdmin: boolean = false;
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setAdmin = (status: boolean): void => {
    this.isAdmin = status;
  };
  setLoading = (loading: boolean): void => {
    this.isLoading = loading;
  };
  setError = (error: string | null): void => {
    this.error = error;
  };

  checkAdminStatus = async (): Promise<void> => {
    this.setLoading(true);
    this.setError(null);

    try {
      const isAdmin = await adminApi.getAdmin();
      this.setAdmin(isAdmin.admin);
    } catch (error: any) {
      this.setAdmin(false);
      this.setError(error.response?.data?.message || error.message);
    } finally {
      this.setLoading(false);
    }
  };

  reset = (): void => {
    this.setAdmin(false);
    this.setLoading(false);
    this.setError(null);
  };
}

export const adminStore = new AdminStore();
