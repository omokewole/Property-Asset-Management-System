import { AxiosResponse } from "axios";
import customAxios from "../../configs/axios";
import { TenantFormState } from "../types/forms";

export default function useTenant() {
  const addTenantHandler = async (
    newTenantData: TenantFormState
  ): Promise<AxiosResponse> => {
    try {
      const { balance, rent_paid } = newTenantData;

      const rentPaidNum = rent_paid.replace(/,/g, "");
      const balanceNum = balance?.replace(/,/g, "");

      newTenantData.rent_paid = rentPaidNum;
      newTenantData.balance = balanceNum;

      const result = await customAxios(false).post("/tenants", newTenantData);

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const allTenantsHandler = async (
    propertyId?: string,
    page?: number,
    sortBy?: string,
    order?: string
  ) => {
    try {
      const params = new URLSearchParams();

      if (propertyId) params.append("property_id", propertyId);
      if (page !== undefined) params.append("page", page.toString());
      if (sortBy) params.append("sortBy", sortBy);
      if (order) params.append("order", order);

      const tenants = await customAxios(false).get(
        `/tenants?${params.toString()}`
      );
      return tenants;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const singleTenantHandler = async (tenantId: string) => {
    if (!tenantId) return;

    const tenant = await customAxios(false).get(`/tenants/${tenantId}`);

    return tenant;
  };

  const updateTenantHandler = async (
    tenantId: string,
    updatedTenantData: TenantFormState
  ) => {
    if (!tenantId || !updatedTenantData) return;

    const { balance, rent_paid } = updatedTenantData;

    const rentPaidNum = rent_paid.replace(/,/g, "");
    const balanceNum = balance?.replace(/,/g, "");

    updatedTenantData.rent_paid = rentPaidNum;
    updatedTenantData.balance = balanceNum;

    const updatedTenant = await customAxios(false).put(
      `/tenants/${tenantId}`,
      updatedTenantData
    );

    return updatedTenant;
  };

  const deleteTenantHandler = async (tenantId: string) => {
    if (!tenantId) return;

    const deletedTenant = await customAxios(false).delete(
      `/tenants/${tenantId}`
    );

    return deletedTenant;
  };

  return {
    addTenantHandler,
    allTenantsHandler,
    singleTenantHandler,
    updateTenantHandler,
    deleteTenantHandler,
  };
}
