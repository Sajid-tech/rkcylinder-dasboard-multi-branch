import React, { useContext, useEffect, useState } from "react";
import { Button, TextField, MenuItem } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowRight, FaCheck, FaTimes } from "react-icons/fa";
import Layout from "../../layout/Layout";
import { ContextPanel } from "../../utils/ContextPanel";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";

const month = [
  {
    value: "01",
    label: "01",
  },
  {
    value: "02",
    label: "02",
  },
  {
    value: "03",
    label: "03",
  },
  {
    value: "04",
    label: "04",
  },
  {
    value: "05",
    label: "05",
  },
  {
    value: "06",
    label: "06",
  },
  {
    value: "07",
    label: "07",
  },
  {
    value: "08",
    label: "08",
  },
  {
    value: "09",
    label: "09",
  },
  {
    value: "10",
    label: "10",
  },
  {
    value: "11",
    label: "11",
  },
  {
    value: "12",
    label: "12",
  },
];

const AddCylinderSub = () => {
  // web-create-cylinder-sub , tofetch manufacture - web-fetch-manufacturer
  const [cylinder, setCylinder] = useState({
    cylinder_sub_barcode: "",
    cylinder_sub_company_no: "",
    cylinder_sub_manufacturer_id: "",
    cylinder_sub_manufacturer_id_new: "",
    cylinder_sub_manufacturer_month: "",
    cylinder_sub_manufacturer_year: "",
    cylinder_sub_batch_no: "",
    cylinder_sub_weight: "",
  });
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();
  const { id } = useParams();

  const [manufacturer, setManufacturer] = useState([]);
  useEffect(() => {
    const fetchManufactureData = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/web-fetch-manufacturer`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setManufacturer(response.data.manufacturer);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchManufactureData();
    setLoading(false);
  }, []);

  const onInputChange = (e) => {
    setCylinder({ ...cylinder, [e.target.name]: e.target.value });
  };

  const onSubmitNext = async (e) => {
    e.preventDefault();
    if (!isPanelUp) {
      navigate("/maintenance");
      return;
    }
    setLoading(true);
    try {
      let dataNext = {
        id: id,
        cylinder_sub_barcode: cylinder.cylinder_sub_barcode,
        cylinder_sub_batch_no: cylinder.cylinder_sub_batch_no,
        cylinder_sub_company_no: cylinder.cylinder_sub_company_no,
        cylinder_sub_manufacturer_id: cylinder.cylinder_sub_manufacturer_id,
        cylinder_sub_manufacturer_id_new:
          cylinder.cylinder_sub_manufacturer_id_new,
        cylinder_sub_manufacturer_month:
          cylinder.cylinder_sub_manufacturer_month,
        cylinder_sub_manufacturer_year: cylinder.cylinder_sub_manufacturer_year,
        cylinder_sub_weight: cylinder.cylinder_sub_weight,
      };
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/api/web-create-cylinder-sub`,
        dataNext,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.code == "200") {
        alert("success , sumbit and next");
        navigate(`/add-sub-cylinder/${id}`);
      } else {
        alert("error");
      }
    } catch (error) {
      console.error("Error creating maufacturer", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isPanelUp) {
      navigate("/maintenance");
      return;
    }
    setLoading(true);
    try {
      let dataSub = {
        id: id,
        cylinder_sub_barcode: cylinder.cylinder_sub_barcode,
        cylinder_sub_batch_no: cylinder.cylinder_sub_batch_no,
        cylinder_sub_company_no: cylinder.cylinder_sub_company_no,
        cylinder_sub_manufacturer_id: cylinder.cylinder_sub_manufacturer_id,
        cylinder_sub_manufacturer_id_new:
          cylinder.cylinder_sub_manufacturer_id_new,
        cylinder_sub_manufacturer_month:
          cylinder.cylinder_sub_manufacturer_month,
        cylinder_sub_manufacturer_year: cylinder.cylinder_sub_manufacturer_year,
        cylinder_sub_weight: cylinder.cylinder_sub_weight,
      };
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/api/web-create-cylinder-sub`,
        dataSub,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.code == "200") {
        alert("success");
        navigate("/cylinder");
      } else {
        alert("error");
      }
    } catch (error) {
      console.error("Error creating maufacturer", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-2xl font-bold">Add Sub Cylinder</h3>
        </div>
        <div className="bg-white p-6 shadow rounded-md">
          <form id="addIndiv" autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="mb-4">
                <TextField
                  id="select-corrpreffer"
                  required
                  label="R K Serial No"
                  name="cylinder_sub_barcode"
                  value={cylinder.cylinder_sub_barcode}
                  onChange={onInputChange}
                  fullWidth
                />
              </div>
              <div className="mb-4">
                <TextField
                  id="select-corrpreffer"
                  required
                  label="Cylinder No"
                  inputProps={{ maxLength: 10, minLength: 1 }}
                  name="cylinder_sub_company_no"
                  value={cylinder.cylinder_sub_company_no}
                  onChange={onInputChange}
                  fullWidth
                />
              </div>
              <div className="mb-4 col-span-2">
                {cylinder.cylinder_sub_manufacturer_id !== "1" && (
                  <TextField
                    id="select-corrpreffer"
                    required
                    SelectProps={{ MenuProps: {} }}
                    select
                    label="Manufacturer"
                    name="cylinder_sub_manufacturer_id"
                    value={cylinder.cylinder_sub_manufacturer_id}
                    onChange={onInputChange}
                    fullWidth
                  >
                    {manufacturer.map((c_manufacturer, key) => (
                      <MenuItem key={key} value={c_manufacturer.id}>
                        {c_manufacturer.manufacturer_name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                {cylinder.cylinder_sub_manufacturer_id === "1" && (
                  <TextField
                    label="Manufacturer"
                    required
                    name="cylinder_sub_manufacturer_id_new"
                    value={cylinder.cylinder_sub_manufacturer_id_new}
                    onChange={onInputChange}
                    fullWidth
                  />
                )}
              </div>
              <div className="mb-4">
                <TextField
                  id="select-corrpreffer"
                  required
                  SelectProps={{ MenuProps: {} }}
                  select
                  label="Month"
                  name="cylinder_sub_manufacturer_month"
                  value={cylinder.cylinder_sub_manufacturer_month}
                  onChange={onInputChange}
                  fullWidth
                >
                  {month.map((c_month, key) => (
                    <MenuItem key={key} value={c_month.value}>
                      {c_month.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="mb-4">
                <TextField
                  id="select-corrpreffer"
                  required
                  inputProps={{ maxLength: 2, minLength: 2 }}
                  label="Year"
                  name="cylinder_sub_manufacturer_year"
                  value={cylinder.cylinder_sub_manufacturer_year}
                  onChange={onInputChange}
                  fullWidth
                />
              </div>
              <div className="mb-4">
                <TextField
                  id="select-corrpreffer"
                  required
                  label="Batch No"
                  name="cylinder_sub_batch_no"
                  value={cylinder.cylinder_sub_batch_no}
                  onChange={onInputChange}
                  fullWidth
                />
              </div>
              <div className="mb-4">
                <TextField
                  id="select-corrpreffer"
                  required
                  label="Tare Weight"
                  name="cylinder_sub_weight"
                  inputProps={{ maxLength: 5 }}
                  value={cylinder.cylinder_sub_weight}
                  onChange={onInputChange}
                  fullWidth
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                type="submit"
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={onSubmitNext}
                disabled={loading}
              >
                {loading ? (
                  "Submit & Next..."
                ) : (
                  <>
                    <FaArrowRight className="mr-2" />
                    Submit & Next
                  </>
                )}
              </Button>
              <Button
                type="submit"
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={onSubmit}
                disabled={loading}
              >
                {loading ? (
                  "Finishing..."
                ) : (
                  <>
                    <FaCheck className="mr-2" />
                    Finish
                  </>
                )}
              </Button>
              <Link to="/cylinder">
                <Button className="flex items-center bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
                  <FaTimes className="mr-2" />
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddCylinderSub;
