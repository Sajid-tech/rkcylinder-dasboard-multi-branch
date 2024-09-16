import { useState, useEffect, useContext } from "react";
import {
  useParams,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { TextField, MenuItem, Button } from "@mui/material";
import { FiEdit } from "react-icons/fi";
import Layout from "../../layout/Layout";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";
import { ContextPanel } from "../../utils/ContextPanel";

const CylinderEdit = () => {
  const { id } = useParams(); // Get the main cylinder ID from URL params
  const [searchParams] = useSearchParams();
  const subId = searchParams.get("subId"); // Get the sub-cylinder ID from the query params

  const [cylinder, setCylinder] = useState({
    cylinder_date: "",
    cylinder_batch_nos: "",
    cylinder_vendor_id: "",
  });

  const [subCylinder, setSubCylinder] = useState({
    cylinder_sub_barcode: "",
    cylinder_sub_company_no: "",
    cylinder_sub_manufacturer_id: "",
    cylinder_sub_manufacturer_month: "",
    cylinder_sub_manufacturer_year: "",
    cylinder_sub_batch_no: "",
    cylinder_sub_weight: "",
  });

  const [vendor, setVendor] = useState([]);

  // const [manufacturer, setManufacturer] = useState([]);
  const [month, setMonth] = useState([
    { label: "January", value: "01" },
    { label: "February", value: "02" },
    { label: "March", value: "03" },
    { label: "April", value: "04" },
    { label: "May", value: "05" },
    { label: "June", value: "06" },
    { label: "July", value: "07" },
    { label: "August", value: "08" },
    { label: "September", value: "09" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ]);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCylinderData = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/web-fetch-cylinder-by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { cylinder, cylinderSub } = response.data;
        setCylinder(cylinder);
        setVendor(response.data?.vendor);
        // setManufacturer(manufacturers);

        // If there's a sub-cylinder ID in the query params, filter the data to get that specific sub-cylinder
        if (subId) {
          const selectedSubCylinder = cylinderSub.find(
            (sub) => sub.id === parseInt(subId)
          );
          if (selectedSubCylinder) {
            setSubCylinder(selectedSubCylinder);
          }
        }
      } catch (error) {
        console.error("Error fetching cylinder data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCylinderData();
  }, [subId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSubCylinder((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCylinderChange = (event) => {
    const { name, value } = event.target;
    setCylinder((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      const response = await axios.put(
        `${BASE_URL}/api/web-update-cylinder/${id}`,
        {
          ...cylinder,
          ...subCylinder,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/cylinder-view/${id}`);
    } catch (error) {
      console.error("Error updating the cylinder data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl font-bold">
            {subId ? "Edit Sub-Cylinder" : "Edit Cylinder"}
          </h3>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 shadow rounded-md"
        >
          {/* Fields for main cylinder */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <TextField
              label="Date"
              name="cylinder_date"
              value={cylinder.cylinder_date}
              onChange={handleCylinderChange}
              fullWidth
              variant="outlined"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="R K Batch No"
              name="cylinder_batch_nos"
              value={cylinder.cylinder_batch_nos}
              onChange={handleCylinderChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              select
              label="Vendor"
              name="cylinder_vendor_id"
              value={cylinder.cylinder_vendor_id}
              onChange={handleCylinderChange}
              fullWidth
              variant="outlined"
            >
              {(Array.isArray(vendor) ? vendor : []).map((c_vendor, key) => (
                <MenuItem key={key} value={c_vendor.id}>
                  {c_vendor.vendor_name}
                </MenuItem>
              ))}
            </TextField>
          </div>

          {/* Fields for sub-cylinder */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <TextField
              label="R K Serial No"
              name="cylinder_sub_barcode"
              value={subCylinder.cylinder_sub_barcode}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Cylinder No"
              name="cylinder_sub_company_no"
              value={subCylinder.cylinder_sub_company_no}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            {/* <TextField
              select
              label="Manufacturer"
              name="cylinder_sub_manufacturer_id"
              value={subCylinder.cylinder_sub_manufacturer_id}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            >
              {manufacturer.map((manu) => (
                <MenuItem key={manu.id} value={manu.id}>
                  {manu.name}
                </MenuItem>
              ))}
            </TextField> */}
            <TextField
              select
              label="Month"
              name="cylinder_sub_manufacturer_month"
              value={subCylinder.cylinder_sub_manufacturer_month}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            >
              {month.map((m) => (
                <MenuItem key={m.value} value={m.value}>
                  {m.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Year"
              name="cylinder_sub_manufacturer_year"
              value={subCylinder.cylinder_sub_manufacturer_year}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Batch No"
              name="cylinder_sub_batch_no"
              value={subCylinder.cylinder_sub_batch_no}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Tare Weight"
              name="cylinder_sub_weight"
              value={subCylinder.cylinder_sub_weight}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </div>

          <div className="flex justify-end mt-6">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <Link to={`/cylinder-view/${id}`}>
            <Button variant="outlined" color="secondary">
              Back to Cylinder View
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default CylinderEdit;
