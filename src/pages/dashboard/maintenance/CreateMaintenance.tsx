import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../../../redux/slices/app";
import { useEffect, useState } from "react";
import MaintenanceForm from "../../../components/dashboard/maintenance/MaintenanceForm";
import { Helmet } from "react-helmet-async";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { CustomModal } from "../../../components/ui/Modal";
import SuccessModal from "../../../components/common/SuccessModal";
import { MaintenanceFormState } from "../../../types/forms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useMaintenance from "../../../hooks/useMaintenance";
import { toast } from "../../../../configs/services";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { resetMaintenanceForm } from "../../../redux/slices/forms/maintenanceForm";

export default function CreateMaintenance() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const formDefaultValue = useSelector(
		(state: RootState) => state.maintenanceForm
	);
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const { createMaintenanceHandler } = useMaintenance();
	const [formKey, setFormKey] = useState(new Date().toISOString());

	const mutation = useMutation({
		mutationKey: ["create_maintenance"],
		mutationFn: async (data: MaintenanceFormState) =>
			createMaintenanceHandler(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["auth_user"] });
			queryClient.invalidateQueries({ queryKey: ["maintenances"] });
			onOpen();
			setFormKey(new Date().toISOString());
		},
		onError: (error: AxiosError) => {
			console.log(error);
			if (error.response?.data) {
				return toast.error(
					(error.response.data as { message: string }).message
				);
			}
			return toast.error("An error occured, please try again!");
		},
	});

	useEffect(() => {
		dispatch(setTitle({ title: "Create Maintenance", showIcon: true }));
	}, []);

	const onFormSubmit = (data: MaintenanceFormState) => mutation.mutate(data);

	const successModalHandler = () => {
		onClose();
		navigate("/dashboard/maintenances");
		dispatch(resetMaintenanceForm());
	};

	return (
		<div className="bg-lightBg h-[calc(100dvh-126px)] w-full lg:h-[calc(100dvh-86px)] sm:p-3 lg:p-5">
			<Helmet>
				<title>Upvillehomes | Schedule Maintenance - Dashboard</title>
			</Helmet>
			<div className="bg-white rounded-md shadow-lg shadow-dark py-12 px-5 lg:px-10 w-full overflow-auto scrollbar-hide">
				<MaintenanceForm
					formDefaultValue={formDefaultValue}
					isLoading={mutation.isPending}
					onFormSubmit={onFormSubmit}
					key={formKey}
				/>
			</div>
			<CustomModal isOpen={isOpen} onOpenChange={onOpenChange}>
				<SuccessModal
					message="Maintenance Schedule created successfully"
					title="Successful!"
					onClose={successModalHandler}
					buttonLabel="Done"
				/>
			</CustomModal>
		</div>
	);
}
