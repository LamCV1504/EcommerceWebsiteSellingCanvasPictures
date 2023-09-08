import React, { useEffect, useMemo, useState } from "react";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  getUsers,
  updateProduct,
  updateUser,
} from "../../../redux/actions/adminActions";
import { Link } from "react-router-dom";
import * as classes from "../../../utils/styles";
import Swal from "sweetalert2";
import {
  SET_ERRORS,
  UPDATE_PRODUCT,
  UPDATE_USER,
} from "../../../redux/actionTypes";
import { MenuItem, Select } from "@mui/material";
import ReactSelect from "react-select";
import ReactQuill from "react-quill";
import ImageUpload from "../../../components/ImageUpload";
import { toast } from "react-toastify";
import { AiFillEdit, AiFillDelete, AiOutlineInfoCircle } from "react-icons/ai";
// import { Navigate } from "react-router-dom";

const modalStyles = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
    overflow: "auto",
  },
};

const Body = () => {
  const store = useSelector((state) => state);
  const users = useSelector((state) => state.admin.allUsers);

  const [selectedUser, setSelectedUser] = useState("");
  const [error, setError] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
    }
  }, [store.errors]);

  // Begin-edit

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);

  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
  });

  const handleEditClick = (user) => {
    setModalMode("edit");
    setSelectedUser(user);
    setIsModalOpen(true);
    setValue({
      firstName: "",
      lastName: "",
      phone: "",
      role: "",
      address: "",
      image: "",
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedValue = {};
    if (value.firstName !== "") {
      updatedValue.firstName = value.firstName;
    } else {
      updatedValue.firstName = selectedUser.firstName;
    }
    if (value.lastName !== "") {
      updatedValue.lastName = value.lastName;
    } else {
      updatedValue.lastName = selectedUser.lastName;
    }
    if (value.email !== "") {
      updatedValue.email = value.email;
    } else {
      updatedValue.email = selectedUser.email;
    }
    if (value.phone !== "") {
      updatedValue.phone = value.phone;
    } else {
      updatedValue.phone = selectedUser.phone;
    }
    if (value.role !== "") {
      updatedValue.role = value.role;
    } else {
      updatedValue.role = selectedUser.role;
    }
    dispatch(
      updateUser(selectedUser.userId, { ...selectedUser, ...updatedValue })
    );
    dispatch({ type: UPDATE_USER, payload: false });
  };

  useEffect(() => {
    if (store.admin.updatedUser) {
      setError({});
      closeModal();
      dispatch(getUsers());
    }
  }, [dispatch, store.errors, store.admin.updatedUser]);

  const handleModalError = () => {
    setError({});
    closeModal();
  };

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="flex mt-4">
        <h1 style={{ fontSize: "25px" }}>DANH SÁCH TÀI KHOẢN</h1>
        <br></br>
      </div>
      <div className="w-full my-8 mt-6">
        {users?.length !== 0 && (
          <table className="w-full table-auto ">
            <thead className="bg-[rgba(169,126,109,0.46)]  items-center">
              <tr>
                <th className="px-4 py-1">#</th>
                <th className="px-4 py-1">Name</th>
                <th className="px-4 py-1">Email</th>
                <th className="px-4 py-1">Phone</th>
                <th className="px-4 py-1">Address</th>
                <th className="px-4 py-1">Role</th>
                <th className="px-4 py-1">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {users?.map((user, idx) => (
                <tr
                  className="justify-center  text-center  hover:bg-[rgb(208,184,177)]"
                  key={idx}
                >
                  <td className="px-4 py-1 text-center border ">{idx + 1}</td>
                  <td className="px-4 py-1 border">
                    {user.lastName} {user.firstName}
                  </td>
                  <td className="px-4 py-1 text-center border ">
                    {user.email}
                  </td>
                  <td className="px-4 py-1 text-center border ">
                    {user.phone}
                  </td>
                  <td className="px-4 py-1 text-center border ">
                    {user.address}
                  </td>
                  <td className="px-4 py-1 text-center border ">{user.role}</td>
                  {/* <td className="px-4 py-1 text-center border ">{user.role}</td> */}
                  <td className="items-center justify-center px-4 py-1 mr-0 border">
                    <button
                      // className="px-3.5 py-1 font-bold text-white rounded hover:bg-[#784e3d] bg-[#784e3d] focus:outline-none focus:shadow-outline text-base"
                      onClick={() => handleEditClick(user)}
                    >
                      <AiFillEdit size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* modal edit */}
      {selectedUser && modalMode === "edit" ? (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className="flex flex-col mx-5 mt-10 rounded-xl">
            <form
              className="w-[800px] min-h-[300px] py-5 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
              onSubmit={handleFormSubmit}
            >
              <div className="grid grid-cols-2 gap-x-10">
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>FirstName :</h1>
                  <input
                    placeholder={selectedUser?.firstName}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>LastName :</h1>
                  <input
                    placeholder={selectedUser?.lastName}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>email :</h1>
                  <input
                    placeholder={selectedUser?.email}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Phone :</h1>
                  <input
                    placeholder={selectedUser?.phone}
                    className={classes.InputStyle}
                    disabled
                    type="text"
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Role *:</h1>
                  <Select
                    required
                    displayEmpty
                    placeholder={value.role || selectedUser?.role}
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.role || selectedUser?.role}
                    onChange={(e) =>
                      setValue({ ...value, role: e.target.value })
                    }
                    className={`${classes.InputStyle} hover:focus:border-none `}
                  >
                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                    <MenuItem value="CUSTOMER">CUSTOMER</MenuItem>
                    <MenuItem value="EMPLOYEE">EMPLOYEE</MenuItem>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-center mt-5 space-x-6">
                <button
                  className={classes.adminFormSubmitButton}
                  type="submit"
                  // onClick={() => handleEditClick(selectedUser)}
                >
                  SAVE
                </button>

                <button
                  className={classes.adminFormClearButton}
                  type="button"
                  onClick={() => handleModalError()}
                >
                  CANCEL
                </button>
              </div>
              <div className="mt-5">
                {error?.message ? (
                  <p className="text-red-500">{error?.message}</p>
                ) : null}
              </div>
            </form>
          </div>
        </ReactModal>
      ) : null}
    </div>
  );
};
export default Body;
