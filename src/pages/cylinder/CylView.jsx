import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { FaEdit, FaArrowLeft } from "react-icons/fa";
import Moment from "moment";

import Layout from "../../layout/Layout";
import { ContextPanel } from "../../utils/ContextPanel";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";

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

          {/* Table Headers */}
          <div className="hidden sm:grid grid-cols-3 md:grid-cols-6 gap-4 font-bold border-b border-gray-300 py-2">
            <div>R K Serial No</div>
            <div>Cylinder No</div>
            <div>Manufacturer</div>
            <div>Month/Year</div>
            <div>Batch No</div>
            <div>Tare Weight</div>
          </div>

          {/* Table Rows */}
          {cylindersSub.map((cylinder, index) => (
            <div
              key={index}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 border-b border-gray-200 py-2"
            >
              <div>{cylinder.cylinder_sub_barcode}</div>
              <div>{cylinder.cylinder_sub_company_no}</div>
              <div>{cylinder.manufacturer_name}</div>
              <div>
                {cylinder.cylinder_sub_manufacturer_month} /{" "}
                {cylinder.cylinder_sub_manufacturer_year}
              </div>
              <div>{cylinder.cylinder_sub_batch_no}</div>
              <div>{cylinder.cylinder_sub_weight}</div>
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
            <Link to={`/cylinder-edit/${id}`}>
              <Button className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                <FaEdit className="mr-2" />
                Edit Cylinder
              </Button>
            </Link>
            <Link to="../cylinder">
              <Button className="flex items-center justify-center bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
                <FaArrowLeft className="mr-2" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CylView;
