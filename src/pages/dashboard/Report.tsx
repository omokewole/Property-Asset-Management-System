import { useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../../redux/slices/app";
import ReportTopWrapper from "../../components/dashboard/report/ReportTopWrapper";
import MaintenanceReport from "../../components/dashboard/report/MaintenanceReport";
import PaymentReport from "../../components/dashboard/report/PaymentReport";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import useMaintenance from "../../hooks/useMaintenance";
import useProperty from "../../hooks/useProperty";
import { AxiosResponse } from "axios";
import { RootState } from "../../redux/store";
import useTenant from "../../hooks/useTenant";
import useAuth from "../../hooks/useAuth";

const Report = () => {
  const dispatch = useDispatch();
  const [maintenancesPage, setMaintenancesPage] = useState(1);
  const [tenantsPage, setTenantsPage] = useState(1);
  const [sortMaintenancesBy, setMaintenancesSortBy] = useState({
    column: "",
    direction: "descending",
  });
  const [sortTenantsBy, setTenantsSortBy] = useState({
    column: "",
    direction: "descending",
  });
  const { allMaintenancesHandler } = useMaintenance();
  const { allProperties } = useProperty();
  const { allTenantsHandler } = useTenant();
  const { stats } = useSelector((state: RootState) => state.user);
  const { handleUserReports } = useAuth();

  const { data: maintenanceData, isLoading: isMaintenancesLoading } = useQuery<
    AxiosResponse,
    Error
  >({
    queryKey: [
      "maintenances",
      maintenancesPage,
      sortMaintenancesBy.column,
      sortMaintenancesBy.direction,
    ],
    queryFn: () =>
      allMaintenancesHandler(
        maintenancesPage,
        sortMaintenancesBy.column,
        sortMaintenancesBy.direction
      ),
  } as UseQueryOptions<AxiosResponse, Error>);

  const { data: propertiesData } = useQuery<AxiosResponse, Error>({
    queryKey: ["properties"],
    queryFn: allProperties,
  } as UseQueryOptions<AxiosResponse, Error>);

  const { data: reportsData } = useQuery<AxiosResponse, Error>({
    queryKey: ["user_reports"],
    queryFn: handleUserReports,
  } as UseQueryOptions<AxiosResponse, Error>);

  const { data: tenantsData, isLoading: isTenantsLoading } = useQuery<
    AxiosResponse,
    Error
  >({
    queryKey: [
      "tenants",
      undefined,
      tenantsPage,
      sortTenantsBy.column,
      sortTenantsBy.direction,
    ],
    queryFn: () =>
      allTenantsHandler(
        undefined,
        tenantsPage,
        sortTenantsBy.column,
        sortTenantsBy.direction
      ),
  } as UseQueryOptions<AxiosResponse, Error>);

  useLayoutEffect(() => {
    dispatch(setTitle({ title: "Report", showIcon: false }));
  }, []);

  return (
    <div className="bg-lightBg min-h-screen px-3 md:px-5 py-5">
      <ReportTopWrapper
        total_maintenance_cost={stats?.total_maintenance_cost as number}
        total_properties={stats?.total_properties as number}
        overdue_maintenance={stats?.overdue_maintenance as number}
        occupancy_rate={stats?.occupancy_rate as string}
        properties={propertiesData?.data.properties}
        reports={reportsData?.data}
      />
      <PaymentReport
        setPage={setTenantsPage}
        setSortBy={setTenantsSortBy}
        tenants={tenantsData?.data.tenants}
        isLoading={isTenantsLoading}
        page={tenantsPage}
        totalPage={tenantsData?.data.meta.total_page}
      />
      <MaintenanceReport
        maintenances={maintenanceData?.data.maintenances}
        rowLoading={isMaintenancesLoading}
        totalPage={maintenanceData?.data.meta.total_page}
        page={maintenancesPage}
        setPage={setMaintenancesPage}
        setSortBy={setMaintenancesSortBy}
      />
    </div>
  );
};

export default Report;
