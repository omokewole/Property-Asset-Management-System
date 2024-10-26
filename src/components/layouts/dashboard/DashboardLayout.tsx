import { Outlet } from "react-router-dom";
import { FC, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const AccountLayout: FC = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const { dashboardPageTitle } = useSelector((state: RootState) => state.state);
	return (
		<main className="w-full h-screen max-w-[1440px] mx-auto">
			<div className="flex h-full">
				<div
					className={`fixed z-10 bg-black/20 md:static left-0 top-0 overflow-hidden ${
						isSidebarOpen
							? "w-screen md:max-w-[280px]"
							: "w-0 md:w-full md:max-w-[280px] "
					} h-full`}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					aria-hidden={!isSidebarOpen}
				>
					<div
						className={`${
							isSidebarOpen
								? "w-full max-w-[80%] md:max-w-[280px]"
								: "w-0 md:w-full md:max-w-[280px]"
						} h-full bg-primary overflow-auto`}
						onClick={(event) => event.stopPropagation()}
					>
						<Sidebar />
					</div>
				</div>
				<div className="flex-1 relative h-screen overflow-auto">
					<Header title={dashboardPageTitle} />
					<Outlet />
				</div>
			</div>
		</main>
	);
};

export default AccountLayout;