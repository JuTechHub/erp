import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomeLandingPage from "./components/WelcomeLandingPage";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import DashboardSelection from "./components/DashboardSelection";
import HRDashboard from "./components/HRDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import FinanceDashboard from "./components/FinanceDashboard";
import UploadMedia from "./components/Media/UploadMedia";
import GalleryMedia from "./components/Media/GalleryMedia";
import SuperAdminLayout from "./components/SuperAdminLayout";
import EmployeeLayout from "./components/EmployeeLayout";
import AllOfficeLocations from "./components/OfficeLocation/AllOfficeLocations";
import AddOfficeLocation from "./components/OfficeLocation/AddOfficeLocation";
import OfficeLocationMain from "./components/OfficeLocation/OfficeLocationMain";
import ViewTypes from "./components/Leavetype/ViewTypes";
import AddTypes from "./components/Leavetype/AddTypes";
import ViewDepartments from "./components/Department/ViewDepartments";
import AddDepartments from "./components/Department/AddDepartments";
import ViewDesignations from "./components/Designations/ViewDesignations";
import AddDesignations from "./components/Designations/AddDesignations";
import ViewEmployee from "./components/Employee/ViewEmployee";
import AddEmployee from "./components/Employee/AddEmployee";
import LeaveRequests from "./components/Leave/LeaveRequests";
import LeaveCalender from "./components/Leave/LeaveCalender";
import LeaveReports from "./components/Leave/LeaveReports";
import ViewShifts from "./components/Shifts/ViewShifts";
import AddShifts from "./components/Shifts/AddShifts";
import AssignShifts from "./components/Shifts/AssignShifts";
import ViewPayrolls from "./components/PayrollComponent/ViewPayrolls";
import AddPayrolls from "./components/PayrollComponent/AddPayrolls";
import PayrollHistory from "./components/Payroll/PayrollHistory";
import PayrollAdd from "./components/Payroll/PayrollAdd";
import PayrollGenerate from "./components/Payroll/PayrollGenerate";
import HolidayList from "./components/Holiday/List";
import HolidayCalender from "./components/Holiday/HolidayCalender";
import ViewAttendance from "./components/Attendance/ViewAttendance";
import ReportAndGraphs from "./components/Attendance/Report&Graphs";
import AttendanceLog from "./components/Attendance/AttendanceLog";
import AttendanceApproval from "./components/Attendance/AttendanceApproval";
import ApplyForLeave from "./components/ApplyLeave/ApplyForLeave";
import LeaveStatus from "./components/ApplyLeave/LeaveStatus";
import MasterDataConfig from "./components/MasterDataConfig";
import ClaimsMain from "./components/Claims/ClaimsMain";
import CollectionsMain from "./components/Claims/CollectionsMain";
import CRMDashboard from "./components/CRMDashboard";
import CRMLayout from "./components/CRMLayout";
import LeadsPage from "./pages/crm/LeadsPage";
import OpportunitiesPage from "./pages/crm/OpportunitiesPage";
import AccountsPage from "./pages/crm/AccountsPage";
import ProposalsPage from "./pages/crm/ProposalsPage";
import CRMAnalyticsPage from "./pages/crm/CRMAnalyticsPage";


const App = () => {
  return (
    <Router>
      <div className="min-h-screen w-full">
        <Routes>
          <Route path="/" element={<WelcomeLandingPage />} />
          <Route path="/features" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/superadmin/dashboard-selection" element={<DashboardSelection />} />
          <Route path="/superadmin/crm-dashboard" element={<CRMLayout />}>
            <Route path="leads" element={<LeadsPage />} />
            <Route path="opportunities" element={<OpportunitiesPage />} />
            <Route path="accounts" element={<AccountsPage />} />
            <Route path="proposals" element={<ProposalsPage />} />
            <Route path="analytics" element={<CRMAnalyticsPage />} />
            <Route index element={<LeadsPage />} />
          </Route>
          
          {/* Employee layout with sidebar for all employee pages */}
          <Route path="/employee" element={<EmployeeLayout />}>
            <Route index element={<EmployeeDashboard />} />
            <Route path="dashboard" element={<EmployeeDashboard />} />
            <Route path="claims" element={<ClaimsMain />} />
            <Route path="collections" element={<CollectionsMain />} />
          </Route>

          {/* SuperAdmin layout with sidebar for all superadmin pages */}
          <Route path="/superadmin" element={<SuperAdminLayout />}>
            <Route index element={<HRDashboard />} />
            <Route path="dashboard" element={<HRDashboard />} />
            <Route path="hr-dashboard" element={<HRDashboard />} />
            <Route path="media/upload" element={<UploadMedia />} />
            <Route path="media/gallery" element={<GalleryMedia />} />
            <Route path="office-location" element={<OfficeLocationMain />} />
            <Route path="office-location/all" element={<AllOfficeLocations />} />
            <Route path="office-location/add" element={<AddOfficeLocation />} />
            <Route path="leave-type/list" element={<ViewTypes />} />
            <Route path="leave-type/add" element={<AddTypes />} />
            <Route path="department/list" element={<ViewDepartments />} />
            <Route path="department/add" element={<AddDepartments />} />
            <Route path="designation/list" element={<ViewDesignations />} />
            <Route path="designation/add" element={<AddDesignations />} />
            <Route path="employee/list" element={<ViewEmployee />} />
            <Route path="employee/add" element={<AddEmployee />} />
            <Route path="leave/requests" element={<LeaveRequests />} />
            <Route path="leave/calendar" element={<LeaveCalender />} />
            <Route path="leave/reports" element={<LeaveReports />} />
            <Route path="shift/list" element={<ViewShifts />} />
            <Route path="shift/add" element={<AddShifts />} />
            <Route path="shift/assign" element={<AssignShifts />} />
            <Route path="payroll-component/list" element={<ViewPayrolls />} />
            <Route path="payroll-component/add" element={<AddPayrolls />} />
            <Route path="payroll/add" element={<PayrollAdd />} />
            <Route path="payroll/history" element={<PayrollHistory />} />
            <Route path="payroll/generate" element={<PayrollGenerate />} />
            <Route path="holiday/list" element={<HolidayList />} />
            <Route path="holiday/calendar" element={<HolidayCalender />} />
            <Route path="attendance/view" element={<ViewAttendance />} />
            <Route path="attendance/reports-graphs" element={<ReportAndGraphs />} />
            <Route path="attendance/log" element={<AttendanceLog />} />
            <Route path="attendance/approval" element={<AttendanceApproval />} />
            <Route path="apply-leave" element={<ApplyForLeave />} />
            <Route path="apply-leave/new" element={<ApplyForLeave />} />
            <Route path="apply-leave/status" element={<LeaveStatus />} />
            <Route path="leave-status" element={<LeaveStatus />} />
            <Route path="claims" element={<ClaimsMain />} />
            <Route path="collections" element={<CollectionsMain />} />
            <Route path="master-data-config" element={<MasterDataConfig />} />
            <Route path="superadmin/master-data-config" element={<MasterDataConfig />} />
            <Route path="finance-dashboard" element={<FinanceDashboard />} />
            {/* Add more nested routes here as needed */}
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
