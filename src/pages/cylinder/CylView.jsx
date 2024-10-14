import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { FaEdit, FaArrowLeft } from "react-icons/fa";
import Moment from "moment";

import Layout from "../../layout/Layout";
import { ContextPanel } from "../../utils/ContextPanel";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import MUIDataTable from "mui-datatables";

const CylView = () => {
  const { id } = useParams();

  const [cylinders, setCylinders] = useState({
    cylinder_date: "",
    cylinder_batch_nos: "",
  });

  const [vendor, setVendor] = useState({
    vendor_name: "",
  });

  const [cylindersSub, setCylindersSub] = useState([
    {
      cylinder_sub_barcode: "",
      cylinder_sub_company_no: "",
      manufacturer_name: "",
      cylinder_sub_manufacturer_month: "",
      cylinder_sub_manufacturer_year: "",
      cylinder_sub_batch_no: "",
      cylinder_sub_weight: "",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();
  const branchId = Number(localStorage.getItem("branchId"));

  useEffect(() => {
    const fetchManuData = async () => {
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

        setCylindersSub(response.data.cylinderSub);
        setVendor(response.data.vendor);
        setCylinders(response.data.cylinder);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchManuData();
    setLoading(false);
  }, []);

  const columns = [
    ...(branchId === 1
      ? [
          {
            name: "cylinder_sub_barcode",
            label: "R K Serial No",
            options: {
              filter: true,
              sort: false,
            },
          },
        ]
      : []),
    {
      name: "cylinder_sub_company_no",
      label: "Cylinder No",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "manufacturer_name",
      label: "Manufacturer",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: "cylinder_sub_manufacturer_month",
      label: "Month/Year",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const cylinder_sub_manufacturer_month = tableMeta.rowData[3];
          const cylinder_sub_manufacturer_year = tableMeta.rowData[4];
          return `${cylinder_sub_manufacturer_month}/${cylinder_sub_manufacturer_year}`;
        },
      },
    },
    {
      name: "cylinder_sub_manufacturer_year",
      label: "Year",
      options: {
        display: false,
      },
    },
    {
      name: "cylinder_sub_batch_no",
      label: "Batch No",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "cylinder_sub_weight",
      label: "Tare Weight",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "id",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (id) => {
          return (
            <div className="flex items-center space-x-2">
              <FaEdit
                onClick={() => navigate(`/cylinder-edit/${id}`)}
                title="Edit Sub Cylinder"
                className="h-5 w-5 cursor-pointer"
              />
            </div>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: "none",
    elevation: 0,
    print: false,
    download: false,
    search: true,
    filter: true,
    // pagination: false,
    responsive: "standard",
    viewColumns: false,
  };

  return (
    <Layout>
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl font-bold">View Cylinder</h3>
        </div>
        <div className="bg-white p-4 sm:p-6 shadow rounded-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center">
              <label className="font-bold">Date: </label>
              <span className="ml-2">
                {Moment(cylinders.cylinder_date).format("DD-MM-YYYY")}
              </span>
            </div>
            <div className="flex items-center">
              <label className="font-bold">R K Batch No: </label>
              <span className="ml-2">{cylinders.cylinder_batch_nos}</span>
            </div>
            <div className="flex items-center">
              <label className="font-bold">Vendor: </label>
              <span className="ml-2">{vendor.vendor_name}</span>
            </div>
          </div>

          <div className="mt-5">
            <MUIDataTable
              data={cylindersSub ? cylindersSub : []}
              columns={columns}
              options={options}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CylView;
