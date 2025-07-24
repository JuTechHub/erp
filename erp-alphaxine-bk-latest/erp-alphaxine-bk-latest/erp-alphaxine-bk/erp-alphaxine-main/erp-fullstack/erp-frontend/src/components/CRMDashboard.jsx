import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function CRMDashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/superadmin/crm-dashboard/leads");
  }, [navigate]);
  return null;
} 