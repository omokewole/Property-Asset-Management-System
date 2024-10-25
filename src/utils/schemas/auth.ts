import { yup } from "../../configs/services";

export const loginSchema: yup.ObjectSchema<{
	email: string;
	password: string;
}> = yup.object().shape({
	email: yup
		.string()
		.label("Email")
		.email("Invalid email format")
		.required("Email is required"),
	password: yup
		.string()
		.required("Password is required")
		.label("Password")
		.min(8, "password must be at least 8 characters"),
});

export const signupSchema: yup.ObjectSchema<{
	name: string;
	phone?: string;
	company?: string;
	password: string;
	email: string;
	confirmPassword: string;
	termCondition: boolean;
}> = yup.object().shape({
	name: yup.string().required("Full name is required"),
	phone: yup.string(),
	company: yup.string(),
	email: yup
		.string()
		.label("Email")
		.email("Invalid email format")
		.required("Email is required"),
	password: yup
		.string()
		.min(8, "password must be at least 8 characters")
		.label("Password")
		.matches(/[A-Z]/, "Password must contain at least one uppercase letter")
		.matches(/[a-z]/, "Password must contain at least one lowercase letter")
		.matches(/[0-9]/, "Password must contain at least one number")
		.matches(/[\W_]/, "Password must contain at least one special character")
		.required("Password is required"),

	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], "Passwords must match")
		.required("Confirm password is required"),
	termCondition: yup
		.bool()
		.oneOf([true], "You must accept the terms and conditions")
		.required("This field is required"),
});

export const resetPasswordSchema: yup.ObjectSchema<{ email: string }> = yup
	.object()
	.shape({
		email: yup
			.string()
			.required("Email is required")
			.email("Enter a valid email"),
	});