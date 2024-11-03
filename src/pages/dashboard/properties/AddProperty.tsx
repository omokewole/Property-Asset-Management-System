import PropertyForm from "../../../components/dashboard/properties/PropertyForm";
import { useEffect } from "react";
import { setTitle } from "../../../redux/slices/app";
import { useDispatch } from "react-redux";
import { addPropertySchema } from "../../../utils/schemas/properties";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useProperty from "../../../hooks/useProperty";
import { useDisclosure } from "@nextui-org/use-disclosure";
import ManagementModal from "../../../components/dashboard/properties/ManagePropertySuccessModal";
import { CustomModal } from "../../../components/ui/Modal";
import { ManagePropertyFormState } from "../../../types/forms";

function AddProperty() {
	const dispatch = useDispatch();
	const { addProperty } = useProperty();
	const queryClient = useQueryClient();
	const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();

	const mutation = useMutation({
		mutationFn: async (variables: FormData) => {
			return await addProperty(variables);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["properties"] });
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
			onOpen();
		},
		onError: (error) => {
			console.log("Error: ", error);
		},
	});

	const handleAddProperty = (data: ManagePropertyFormState) => {
		const formData = new FormData();

		Object.entries(data).forEach(([key, val]) => {
			if (key === "images") {
				Array.from(val).forEach((file) => {
					if (file instanceof File) {
						formData.append("images", file);
					}
				});
			} else if (val !== undefined) {
				formData.append(key, val);
			}
		});

		mutation.mutate(formData);
	};

	useEffect(() => {
		dispatch(setTitle({ showIcon: true, title: "Add Property" }));
	}, []);

	return (
		<div className="">
			<div className="rounded-md shadow-lg shadow-dark py-5 px-5 lg:px-10 h-[calc(100vh-116px)]  md:h-[calc(100vh-126px)]">
				<PropertyForm
					schema={addPropertySchema}
					onFormSubmit={handleAddProperty}
					isLoading={mutation.isPending}
				/>
			</div>

			<CustomModal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ManagementModal
					message="Property Added successfully"
					onClose={onClose}
				/>
			</CustomModal>
		</div>
	);
}

export default AddProperty;
