import { AxiosResponse } from "axios";
import customAxios from "../../configs/axios";
import {
	SignupFormState,
	LoginFormState,
	ChangePasswordFormState,
} from "../types/forms";
import { ImageUrl } from "../types/common";

export default function useAuth(): {
	getAuthUser: () => Promise<AxiosResponse>;
	handleSignup: (args: Partial<SignupFormState>) => Promise<AxiosResponse>;
	handleLogin: (args: LoginFormState) => Promise<AxiosResponse>;
	handleRefreshToken: (arg: string) => Promise<AxiosResponse>;
	handleVerifyUser: (arg: string) => Promise<AxiosResponse>;
	handleUpdateUser: (args: FormData) => Promise<AxiosResponse>;
	handleUserReports: () => Promise<AxiosResponse>;
	handleChangePassword: (
		args: ChangePasswordFormState
	) => Promise<AxiosResponse>;
	handleUpdateSettings: (args: {
		key: string;
		value: boolean;
	}) => Promise<AxiosResponse>;
	handleResendVerification: (args: string) => Promise<AxiosResponse>;
	handleUpdateImage: (args: ImageUrl) => Promise<AxiosResponse>;
} {
	const handleSignup = async (
		userData: Partial<SignupFormState>
	): Promise<AxiosResponse> => {
		delete userData.confirmPassword;
		delete userData.termCondition;
		const newUser = await customAxios().post("user/create", userData);
		return newUser;
	};

	const getAuthUser = async () => {
		const authUser = await customAxios(false).get("user");
		return authUser;
	};

	const handleLogin = async (credentials: LoginFormState) => {
		const loginUser = await customAxios().post("user/login", credentials);
		return loginUser;
	};

	const handleRefreshToken = async (refresh_token: string) => {
		const newTokens = await customAxios().post("user/refresh_token", {
			refresh_token,
		});
		return newTokens;
	};

	const handleUpdateUser = async (updatedData: FormData) => {
		const updatedUser = await customAxios(false).put(
			"user/update",
			updatedData
		);

		return updatedUser;
	};

	const handleChangePassword = async ({
		current_password,
		new_password,
	}: ChangePasswordFormState) => {
		const response = await customAxios().post("user/change_password", {
			new_password,
			current_password,
		});

		return response;
	};

	const handleUpdateSettings = async ({
		key,
		value,
	}: {
		key: string;
		value: boolean;
	}) => {
		const response = await customAxios().patch("user/settings", {
			key,
			value,
		});

		return response;
	};

	const handleUserReports = async () => {
		const userReports = await customAxios().get("/user/reports");

		return userReports;
	};

	const handleVerifyUser = async (emailToken: string) => {
		const isVerify = await customAxios().post("/user/verify", {
			email_token: emailToken,
		});

		console.log(isVerify);

		return isVerify;
	};

	const handleResendVerification = async (email: string) => {
		const response = await customAxios().post("/user/verify-resend", {
			email,
		});

		return response;
	};

	const handleUpdateImage = async (image: ImageUrl) => {
		const response = await customAxios().patch("/user/upload", {
			image,
		});

		return response;
	};

	return {
		handleSignup,
		getAuthUser,
		handleRefreshToken,
		handleLogin,
		handleUpdateUser,
		handleChangePassword,
		handleUpdateSettings,
		handleUserReports,
		handleVerifyUser,
		handleResendVerification,
		handleUpdateImage,
	};
}
