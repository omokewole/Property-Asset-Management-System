import { yup } from "../../../configs/services";

export const tenantSchema = yup.object().shape({
	name: yup.string().required("Tenant name is required!"),
	phone: yup.string().required("Tenant phone number is required!"),
	assigned_unit: yup.string().required("Assigned unit is required!"),
	assigned_property: yup.string().required("Assigned Property is required!"),
	start_date: yup
		.date()
		.typeError("Please enter a valid date for the start date.")
		.required("Lease/Rent start date is required!"),
	end_date: yup
		.date()
		.typeError("Please enter a valid date for the end date.")
		.min(yup.ref("start_date"), "End date must be after start date.")
		.required("Lease/Rent end date required!"),
});
