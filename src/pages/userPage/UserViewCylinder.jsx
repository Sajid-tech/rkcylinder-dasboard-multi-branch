import React, { useContext, useRef, useState } from "react";
import { ContextPanel } from "../../utils/ContextPanel";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { FaRegCalendarAlt, FaIndustry, FaWeightHanging } from "react-icons/fa";
import Moment from "moment";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";

const UserViewCylinder = () => {
  const [latestid, setLatestid] = useState("");
  const [cylinders, setCylinders] = useState([]);
  const [message, setMessage] = useState("");
  const testRef = useRef(null);
  const componentRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isPanelUp) {
        navigate("/maintenance");
        return;
      }
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-cylinder-by-scan/${latestid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.cylinderSub.length === 0) {
        setMessage("No cylinders found for the given ID.");
        setCylinders([]);
      } else {
        setCylinders(response.data.cylinderSub);
        setMessage("");
      }
      testRef.current.focus();
      setLatestid("");
    } catch (error) {
      console.error("Error fetching viewcylinder data", error);
      setMessage("Error fetching cylinder data.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="p-4">
      <div className="text-2xl font-semibold mb-4">View Cylinder(User)</div>
      <div className="mb-4">
        <div className="card bg-white shadow-md rounded-lg p-4">
          <form id="addIndiv" autoComplete="off" onSubmit={onSubmit}>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/3 mb-4">
                <TextField
                  id="select-corrpreffer"
                  autoFocus
                  inputRef={testRef}
                  required
                  label="R K Serial No"
                  name="cylinder_batch_nos"
                  value={latestid}
                  onChange={(e) => {
                    setLatestid(e.target.value);
                  }}
                  fullWidth
                  variant="outlined"
                />
              </div>
              <div className="w-full md:w-1/3 mb-4">
                <Button
                  type="submit"
                  className="bg-blue-200 text-white p-4 rounded"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Submit"}
                </Button>
              </div>
              <div className="w-full md:w-1/3 mb-4">
                <Button
                  type="submit"
                  className="bg-blue-200 text-white p-4 rounded"
                  color="primary"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </div>
          </form>
          {message && (
            <div className="text-red-500 font-semibold mb-4">{message}</div>
          )}
          <div className="mt-4" ref={componentRef}>
            <div className="space-y-4">
              {cylinders.length > 0
                ? cylinders.map((cylinder) => (
                    <div
                      key={cylinder.cylinder_sub_barcode}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex flex-wrap mb-4">
                        <div className="w-full md:w-1/2 mb-2 md:mb-0 flex items-center">
                          <FaIndustry className="mr-2" />
                          <span className="font-bold">Vendor:</span>{" "}
                          <span>{cylinder.vendor_name}</span>
                        </div>
                        <div className="w-full md:w-1/4 mb-2 md:mb-0 flex items-center">
                          <FaWeightHanging className="mr-2" />
                          <span className="font-bold">Weight:</span>{" "}
                          <span>{cylinder.cylinder_sub_weight}</span>
                        </div>
                        <div className="w-full md:w-1/4 flex items-center">
                          <FaRegCalendarAlt className="mr-2" />
                          <span className="font-bold">Date:</span>{" "}
                          <span>
                            {Moment(cylinder.cylinder_date).format(
                              "DD-MM-YYYY"
                            )}
                          </span>
                        </div>
                      </div>
                      <table className="w-full border border-gray-300 mb-4">
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="p-2 font-semibold">RK Serial No</td>
                            <td className="p-2">:</td>
                            <td className="p-2 font-semibold">
                              {cylinder.cylinder_sub_barcode}
                            </td>
                            <td className="p-2 font-semibold">Batch No</td>
                            <td className="p-2">:</td>
                            <td className="p-2 font-semibold">
                              {cylinder.cylinder_sub_batch_no}
                            </td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="p-2 font-semibold">Cylinder No</td>
                            <td className="p-2">:</td>
                            <td className="p-2 font-semibold">
                              {cylinder.cylinder_sub_company_no}
                            </td>
                            <td className="p-2 font-semibold">Month/Year</td>
                            <td className="p-2">:</td>
                            <td className="p-2 font-semibold">
                              {cylinder.cylinder_sub_manufacturer_month}/
                              {cylinder.cylinder_sub_manufacturer_year}
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 font-semibold">Manufacturer</td>
                            <td className="p-2">:</td>
                            <td className="p-2 font-semibold">
                              {cylinder.manufacturer_name}
                            </td>
                            <td className="p-2 font-semibold">R K Batch No</td>
                            <td className="p-2">:</td>
                            <td className="p-2 font-semibold">
                              {cylinder.cylinder_batch_nos}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserViewCylinder;
