import { AxiosResponse } from "axios";
import customAxios from "../../configs/axios";
import { MaintenanceFormState } from "../types/forms";

export default function useMaintenance() {
	const createMaintenanceHandler = async (
		newMaintenanceData: MaintenanceFormState
	): Promise<AxiosResponse> => {
		let maintenanceFeeStr: string = newMaintenanceData.maintenance_fee;

		const maintenanceFeeNum = maintenanceFeeStr.replace(/,/g, "");

		newMaintenanceData.maintenance_fee = maintenanceFeeNum;

		const result = await customAxios(false).post(
			"/maintenances",
			newMaintenanceData
		);

		return result;
	};

	const allMaintenancesHandler = async (
		page: number,
		sortBy: string,
		order: string
	) => {
		const maintenances = await customAxios(false).get(
			`/maintenances?page=${page}&sortBy=${sortBy}&order=${order}`
		);
		return maintenances;
	};

	const singleMaintenanceHandler = async (maintenanceId: string) => {
		if (!maintenanceId) return;

		const maintenance = await customAxios(false).get(
			`/maintenances/${maintenanceId}`
		);

		console.log(maintenance);

		return maintenance;
	};

	const updateMaintenanceHandler = async (
		maintenanceId: string,
		updatedMaintenanceData: MaintenanceFormState
	) => {
		if (!maintenanceId || !updatedMaintenanceData) return;

		let maintenanceFeeStr: string = updatedMaintenanceData.maintenance_fee;

		const maintenanceFeeNum = maintenanceFeeStr.replace(/,/g, "");

		updatedMaintenanceData.maintenance_fee = maintenanceFeeNum;

		const updatedMaintenance = await customAxios(false).put(
			`/maintenances/${maintenanceId}`,
			updatedMaintenanceData
		);

		return updatedMaintenance;
	};

	const deleteMaintenanceHandler = async (maintenanceId: string) => {
		if (!maintenanceId) return;

		const deletedMaintenance = await customAxios(false).delete(
			`/maintenances/${maintenanceId}`
		);

		return deletedMaintenance;
	};

	return {
		createMaintenanceHandler,
		allMaintenancesHandler,
		singleMaintenanceHandler,
		updateMaintenanceHandler,
		deleteMaintenanceHandler,
	};
}
