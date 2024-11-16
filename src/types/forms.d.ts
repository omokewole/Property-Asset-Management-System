export interface LoginFormState {
	email: string;
	password: string;
}

export interface SignupFormState {
	email: string;
	password: string;
	name: string;
	confirmPassword?: string;
	company?: string;
	phone?: string;
	termCondition?: boolean;
}

export interface ChangePasswordFormState {
	current_password: string;
	new_password: string;
	confirm_password: string;
}

export interface AddPropertyFormState {
	street: string;
	description: string;
	attraction?: string;
	images?: File[];
	title: string;
	location: string;
	property_type: string;
	unit_number: string;
  }
  
  export interface EditPropertyFormState extends AddPropertyFormState {
	images_url?: string[];
  }
  

export interface TenantFormState {
	name: string;
	assigned_unit: string;
	assigned_property: string;
	phone: string;
	start_date: Date | undefined;
	end_date: Date | undefined;
	rent_paid: string;
	balance: string | undefined;
}

export interface MaintenanceFormState {
	facility: string;
	maintenance_fee: string;
	technician: string;
	property: string;
	schedule_date: Date;
	status: "completed" | "overdue" | "schedule";
}
