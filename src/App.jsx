import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SIgnUp from "./pages/auth/SIgnUp";
import Maintenance from "./pages/maintenance/Maintenance";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Profile from "./pages/profile/Profile";
import ChangePassword from "./pages/profile/ChangePassword";
import Vendor from "./pages/master/vendor/Vendor";
import Manufacturer from "./pages/master/manufacturer/Manufacturer";
import Cylinder from "./pages/cylinder/Cylinder";
import AddManufacturer from "./pages/master/manufacturer/AddManufacturer";
import AddVendor from "./pages/master/vendor/AddVendor";
import AddCylinder from "./pages/cylinder/AddCylinder";
import EditManufacturer from "./pages/master/manufacturer/EditManufacturer";
import EditVendor from "./pages/master/vendor/EditVendor";
import AddCylinderSub from "./pages/cylinder/AddCylinderSub";
import CylView from "./pages/cylinder/CylView";
import CylinderEdit from "./pages/cylinder/CylinderEdit";
import ViewCylinder from "./pages/ViewCylinder/ViewCylinder";
import UserViewCylinder from "./pages/userPage/UserViewCylinder";
import { useContext, useEffect, useState } from "react";
import { ContextPanel } from "./utils/ContextPanel";
import ReportVendor from "./pages/reports/vendor/ReportVendor";
import ReportManufacturer from "./pages/reports/manufacturer/ReportManufacturer";
import ReportForm from "./pages/reports/report/ReportForm";
import ReportOne from "./pages/reports/report/ReportOne";
import ReportTwo from "./pages/reports/report/ReportTwo";
import FormCylinderDetails from "./pages/reports/cylinderReport/FormCylinderDetails";
import ReportCylinderDetails from "./pages/reports/cylinderReport/ReportCylinderDetails";

const App = () => {
  const { userInfo, setUserInfo } = useContext(ContextPanel);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const branchId = localStorage.getItem("branchId");
    const userTypeId = localStorage.getItem("userTypeId");

    if (token && branchId && userTypeId) {
      setUserInfo({
        branchId: Number(branchId),
        userTypeId: Number(userTypeId),
      });
    }
    setIsLoading(false);
  }, [setUserInfo]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SIgnUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path="/change-password"
          element={<ProtectedRoute element={<ChangePassword />} />}
        />

        {userInfo.branchId && userInfo.userTypeId && (
          <>
            {(userInfo.branchId === 1 || userInfo.branchId === 2) &&
              userInfo.userTypeId === 2 && (
                <>
                  <Route path="/vendor" element={<Vendor />} />
                  <Route path="/add-vendor" element={<AddVendor />} />
                  <Route path="/vendor-edit/:id" element={<EditVendor />} />
                  <Route path="/manufacturer" element={<Manufacturer />} />
                  <Route
                    path="/add-manufacturer"
                    element={<AddManufacturer />}
                  />
                  <Route
                    path="/manufacturer-edit/:id"
                    element={<EditManufacturer />}
                  />
                  <Route path="/cylinder" element={<Cylinder />} />
                  <Route path="/add-cylinder" element={<AddCylinder />} />
                  <Route
                    path="/add-sub-cylinder/:id"
                    element={<AddCylinderSub />}
                  />
                  <Route path="/cylinder-edit/:id" element={<CylinderEdit />} />
                  <Route path="/cylinder-view/:id" element={<CylView />} />
                  <Route path="/view-cylinder" element={<ViewCylinder />} />
                  <Route path="/vendor-report" element={<ReportVendor />} />
                  <Route
                    path="/manufacturer-report"
                    element={<ReportManufacturer />}
                  />
                  <Route path="/report-form" element={<ReportForm />} />
                  <Route path="/report-one" element={<ReportOne />} />
                  <Route path="/report-two" element={<ReportTwo />} />
                  <Route
                    path="/cylinder-details"
                    element={<FormCylinderDetails />}
                  />
                  <Route
                    path="/report-cylinder"
                    element={<ReportCylinderDetails />}
                  />
                </>
              )}
            {(userInfo.branchId === 1 || userInfo.branchId === 2) &&
              userInfo.userTypeId === 1 && (
                <Route
                  path="/user-view-cylinder"
                  element={<UserViewCylinder />}
                />
              )}
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
