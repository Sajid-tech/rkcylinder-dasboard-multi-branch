import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { TextField, MenuItem, Button } from "@mui/material";
import { FiEdit } from "react-icons/fi";
import Layout from "../../layout/Layout";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";
import { ContextPanel } from "../../utils/ContextPanel";

const CylinderEdit = () => {
  //   const { id } = useParams(); // Get the id from the URL params

  //   // State for cylinder main data
  //   const [cylinder, setCylinder] = useState({
  //     cylinder_date: "",
  //     cylinder_batch_nos: "",
  //     cylinder_vendor_id: "",
  //   });

  //   // State for the list of users (sub-cylinders)
  //   const [users, setUsers] = useState([
  //     // Example user object structure for initializing
  //     {
  //       id: "",
  //       cylinder_sub_barcode: "",
  //       cylinder_sub_company_no: "",
  //       cylinder_sub_manufacturer_id: "",
  //       cylinder_sub_manufacturer_month: "",
  //       cylinder_sub_manufacturer_year: "",
  //       cylinder_sub_batch_no: "",
  //       cylinder_sub_weight: "",
  //     },
  //   ]);
  //   const [loading, setLoading] = useState(false);
  //   const { isPanelUp } = useContext(ContextPanel);
  //   const navigate = useNavigate();

  //   // State for dropdown options
  //   const [vendor, setVendor] = useState({
  //     vendor_name: "",
  //   });
  //   const [manufacturer, setManufacturer] = useState([]);
  //   const [month, setMonth] = useState([
  //     { label: "January", value: "01" },
  //     { label: "February", value: "02" },
  //     { label: "March", value: "03" },
  //     // Add more months as needed
  //   ]);

  //   // Button disable state
  //   const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  //   useEffect(() => {
  //     //setcylinder and set user
  //     const fetchCylVenUser = async () => {
  //       try {
  //         if (!isPanelUp) {
  //           navigate("/maintenance");
  //           return;
  //         }
  //         setLoading(true);
  //         const token = localStorage.getItem("token");
  //         const response = await axios.get(
  //           `${BASE_URL}/api/web-fetch-cylinder-by-id/${id}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );

  //         setUsers(response.data.cylinderSub);
  //         setVendor(response.data.vendor);
  //         setCylinder(response.data.cylinder);
  //       } catch (error) {
  //         console.error("Error fetching dashboard data", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchCylVenUser();
  //     setLoading(false);
  //   }, []);

  //   const checkButtonState = () => {
  //     // Logic to enable/disable the button
  //     const isFormValid =
  //       cylinder.cylinder_date &&
  //       users.every((user) => user.cylinder_sub_company_no);
  //     setIsButtonDisabled(!isFormValid);
  //   };

  //   // Handle changes for the main cylinder form
  //   const onInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setCylinder({
  //       ...cylinder,
  //       [name]: value,
  //     });
  //   };

  //   // Handle changes for users (sub-cylinders)
  //   const onChange = (e, index) => {
  //     const { name, value } = e.target;
  //     const updatedUsers = [...users];
  //     updatedUsers[index][name] = value;
  //     setUsers(updatedUsers);
  //   };

  //   // Form submit handler
  //   const onSubmit = (e) => {
  //     e.preventDefault();
  //     // Submit logic (e.g., API call to update the cylinder and users)
  //     console.log("Form submitted", { cylinder, users });
  //   };
  return (
    <Layout>
      <div className="p-6 bg-white mt-5 rounded-lg">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FiEdit className="text-lg" />
            Edit Cylinder
          </h3>
        </div>

        <form id="addIndiv" autoComplete="off" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-group">
              <TextField
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                type="date"
                label="Date"
                name="cylinder_date"
                // value={cylinder.cylinder_date}
                // onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="form-group">
              <TextField
                required
                label="R K Batch No"
                name="cylinder_batch_nos"
                // value={cylinder.cylinder_batch_nos}
                // onChange={(e) => onInputChange(e)}
                fullWidth
              />
            </div>

            <div className="form-group">
              <TextField
                fullWidth
                label="Vendor"
                required
                select
                name="cylinder_vendor_id"
                // value={cylinder.cylinder_vendor_id}
                // onChange={(e) => onInputChange(e)}
              >
                {/* {vendor.map((item, key) => (
                  <MenuItem key={key} value={item.id}>
                    {item.vendor_name}
                  </MenuItem>
                ))} */}
              </TextField>
            </div>
          </div>

          <hr className="my-6 border-t border-gray-300" />

          {/* {users.map((user, index) => (
            <div
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4"
              key={index}
            >
              <div className="form-group">
                <TextField
                  required
                  label="R K Serial No"
                  name="cylinder_sub_barcode"
                  InputLabelProps={{ shrink: true }}
                  value={user.cylinder_sub_barcode}
                  onChange={(e) => onChange(e, index)}
                  disabled
                  fullWidth
                />
              </div>

              <div className="form-group hidden">
                <TextField
                  required
                  label="id"
                  name="cylinder_sub_id"
                  value={user.id}
                  onChange={(e) => onChange(e, index)}
                  fullWidth
                />
              </div>

              <div className="form-group">
                <TextField
                  required
                  label="Cylinder No"
                  name="cylinder_sub_company_no"
                  inputProps={{ maxLength: 10, minLength: 1 }}
                  value={user.cylinder_sub_company_no}
                  onChange={(e) => onChange(e, index)}
                  fullWidth
                />
              </div>

              <div className="form-group">
                <TextField
                  required
                  label="Manufacturer"
                  name="cylinder_sub_manufacturer_id"
                  select
                  value={user.cylinder_sub_manufacturer_id}
                  onChange={(e) => onChange(e, index)}
                  fullWidth
                >
                  {manufacturer.map((c_manufacturer, key) => (
                    <MenuItem key={key} value={c_manufacturer.id}>
                      {c_manufacturer.manufacturer_name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className="form-group">
                <TextField
                  required
                  label="Month"
                  name="cylinder_sub_manufacturer_month"
                  select
                  value={user.cylinder_sub_manufacturer_month}
                  onChange={(e) => onChange(e, index)}
                  fullWidth
                >
                  {month.map((c_month, key) => (
                    <MenuItem key={key} value={c_month.value}>
                      {c_month.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className="form-group">
                <TextField
                  required
                  label="Year"
                  name="cylinder_sub_manufacturer_year"
                  inputProps={{ maxLength: 2, minLength: 2 }}
                  value={user.cylinder_sub_manufacturer_year}
                  onChange={(e) => onChange(e, index)}
                  fullWidth
                />
              </div>

              <div className="form-group">
                <TextField
                  required
                  label="Batch No"
                  name="cylinder_sub_batch_no"
                  value={user.cylinder_sub_batch_no}
                  onChange={(e) => onChange(e, index)}
                  fullWidth
                />
              </div>

              <div className="form-group">
                <TextField
                  required
                  label="Tare Weight"
                  name="cylinder_sub_weight"
                  inputProps={{ maxLength: 5 }}
                  value={user.cylinder_sub_weight}
                  onChange={(e) => onChange(e, index)}
                  fullWidth
                />
              </div>
            </div>
          ))} */}

          <div className="flex justify-start space-x-4">
            <Button
              type="submit"
              //   onClick={(e) => onSubmit(e)}
              //   disabled={isButtonDisabled}
              variant="contained"
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Update
            </Button>

            <Link to="../cylinder">
              <Button
                variant="outlined"
                className="border border-gray-400 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CylinderEdit;
