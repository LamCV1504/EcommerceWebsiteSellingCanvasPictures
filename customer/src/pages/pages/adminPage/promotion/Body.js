import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  getPromotions,
  updatePromotion,
  deletePromotion,
  getCategories,
} from "../../../redux/actions/adminActions";
import { Link } from "react-router-dom";
import * as classes from "../../../utils/styles";
import Swal from "sweetalert2";
import {
  SET_ERRORS,
  UPDATE_PROMOTION,
  DELETE_PROMOTION,
} from "../../../redux/actionTypes";
import { MenuItem, Select } from "@mui/material";
import { AiFillEdit, AiFillDelete, AiOutlineInfoCircle } from "react-icons/ai";
import ReactSelect from "react-select";
import { APIV1 } from "../../../redux/config/config";
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
  const promotions = useSelector((state) => state.admin.allPromotion);
  const [selectedPromotion, setSelectedPromotion] = useState("");
  const [error, setError] = useState({});
  const initialPromotions = promotions;
  const [filteredList, setFilteredList] = new useState([]);
  const [searchValue, setSearchValue] = useState("");
  const categories = useSelector((state) => state.admin.allCategory);

  const user = JSON.parse(localStorage.getItem("user"));

  const categoryOptions = categories?.map((category) => ({
    value: category.categoryId,
    label: category.categoryName,
  }));

  const [selectedOptions, setSelectedOptions] = useState([]);

  const filterBySearch = (event) => {
    const query = event.target.value;
    setSearchValue(query);
    var updatedList = [...promotions];
    updatedList = updatedList.filter((item) => {
      return (
        item?.promotionName?.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    });
    setFilteredList(updatedList);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPromotions());
    dispatch(getCategories());
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
  const [value, setValue] = useState({
    promotionName: "",
    promotionId: "",
    startDate: "",
    endDate: "",
    discount: "",
    categoryList: [],
    userId: user?.userId,
  });

  const handleEditClick = async (promotion) => {
    setSelectedPromotion(promotion);
    setIsModalOpen(true);

    try {
      const { data } = await APIV1.get(
        "/promotion_details/promotion/" + promotion.promotionId
      );
      setSelectedOptions(() =>
        data.map((item) => ({
          value: item.categoryId,
          label: categories.find(
            (category) => category.categoryId === item.categoryId
          ).categoryName,
        }))
      );
      console.log("OK");
    } catch (error) {}
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
    if (value.promotionName !== "") {
      updatedValue.promotionName = value.promotionName;
    } else {
      updatedValue.promotionName = selectedPromotion.promotionName;
    }
    if (value.startDate !== "") {
      updatedValue.startDate = value.startDate;
    } else {
      updatedValue.startDate = selectedPromotion.startDate;
    }

    if (value.endDate !== "") {
      updatedValue.endDate = value.endDate;
    } else {
      updatedValue.endDate = selectedPromotion.endDate;
    }

    if (value.discount !== "") {
      updatedValue.discount = value.discount;
    } else {
      updatedValue.discount = selectedPromotion.discount;
    }
    if (value.categoryList !== "") {
      updatedValue.categoryList = value.categoryList;
    } else {
      updatedValue.categoryList = selectedPromotion.categoryList;
    }

    dispatch(
      updatePromotion(selectedPromotion.promotionId, {
        promotionId: selectedPromotion.promotionId,
        ...selectedPromotion,
        ...updatedValue,
        categoryIds: selectedOptions.map((category) => category.value),
      })
    );
    dispatch({ type: UPDATE_PROMOTION, payload: false });
  };

  useEffect(() => {
    if (store.admin.updatedPromotion) {
      setError({});
      closeModal();
      dispatch(getPromotions());
    }
  }, [dispatch, store.errors, store.admin.updatedPromotion]);

  const handleModalError = () => {
    setError({});
    closeModal();
  };

  // End edit

  // Begin delete
  const dltPromotion = (id) => {
    Swal.fire({
      title: "Are you sure to detele?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deletePromotion([id]));
      }
    });
  };

  useEffect(() => {
    if (store.admin.promotionDeleted) {
      dispatch(getPromotions());
      dispatch({ type: DELETE_PROMOTION, payload: false });
    } else {
      setError({});
    }
  }, [store.admin.promotionDeleted, store.errors]);

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="flex mt-4">
        <Link to="/add-promotion" className="btn btn-primary">
          <button
            className="items-center gap-[9px]  w-[88px] h-[40px] hover:bg-[#603304] block py-2 font-bold text-white rounded-lg px-4 
          bg-[#784e3d] focus:outline-none focus:shadow-outline "
          >
            ADD
          </button>
        </Link>
        <div className="flex rounded-lg border border-[#eee5e1] ml-3">
          <input
            type="text"
            className="w-[300px] block  px-4 py-2 bg-white  rounded-lg text-primary focus:border-[#f4866ac9] focus:ring-[#753815] focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Find Promotion..."
            onChange={filterBySearch}
          />
        </div>
      </div>
      <div className="w-full my-8 mt-6">
        {searchValue ? (
          <div className="overflow-auto max-h-[530px]">
            <table className="w-full table-auto ">
              <thead className="bg-[rgba(169,126,109,0.46)] items-center sticky">
                <tr>
                  <th className="px-4 py-1">STT</th>
                  <th className="px-4 py-1">Promotion Name</th>
                  <th className="px-4 py-1">Discount</th>
                  <th className="px-4 py-1">Start Date</th>
                  <th className="px-4 py-1">End Date</th>
                  <th className="px-4 py-1">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {filteredList?.map((promotion, idx) => (
                  <tr
                    className="justify-center item-center  hover:bg-[rgb(208,184,177)]"
                    key={idx}
                  >
                    <td className="px-4 py-1 text-center border ">{idx + 1}</td>

                    <td className="px-4 py-1 text-center border">
                      {promotion.promotionName}
                    </td>
                    <td className="px-4 py-1 text-center border">
                      {promotion.discount}
                    </td>
                    <td className="px-4 py-2 text-center border">
                      {new Date(promotion.startDate).toLocaleDateString(
                        "en-GB"
                      )}
                    </td>
                    <td className="px-4 py-2 text-center border">
                      {new Date(promotion.endDate).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-1 py-1 mr-0 space-x-3 text-center border">
                      <button onClick={() => handleEditClick(promotion)}>
                        <AiFillEdit size={20} />
                      </button>
                      <button
                        onClick={() => dltPromotion(promotion.promotionId)}
                      >
                        <AiFillDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-auto max-h-[530px]">
            {initialPromotions?.length !== 0 && (
              <table className="w-full table-auto ">
                <thead className="bg-[rgba(169,126,109,0.46)]  items-center">
                  <tr>
                    <th className="px-4 py-1">#</th>
                    <th className="px-4 py-1">Promotion Name</th>
                    <th className="px-4 py-1">Discount</th>
                    <th className="px-4 py-1">Start Date</th>
                    <th className="px-4 py-1">End Date</th>
                    <th className="px-4 py-1">Actions</th>
                  </tr>
                </thead>
                <tbody className="">
                  {promotions?.map((promotion, idx) => (
                    <tr
                      className="justify-center item-center   hover:bg-[rgb(208,184,177)]"
                      key={idx}
                    >
                      <td className="px-4 py-1 text-center border ">
                        {idx + 1}
                      </td>

                      <td className="px-4 py-1 text-center border">
                        {promotion.promotionName}
                      </td>
                      <td className="px-4 py-1 text-center border">
                        {promotion.discount}
                      </td>
                      <td className="px-4 py-2 text-center border">
                        {new Date(promotion.startDate).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>
                      <td className="px-4 py-2 text-center border">
                        {new Date(promotion.endDate).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>
                      <td className="px-1 py-1 mr-0 space-x-3 text-center border">
                        <button onClick={() => handleEditClick(promotion)}>
                          <AiFillEdit size={20} />
                        </button>
                        <button
                          onClick={() => dltPromotion(promotion.promotionId)}
                        >
                          <AiFillDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
      {/* modal edit */}
      {selectedPromotion ? (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className="flex flex-col mx-5 mt-10 rounded-xl">
            <form
              className="w-[1050px] h-[500px] py-5 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
              onSubmit={handleFormSubmit}
            >
              <div className="grid grid-cols-2 mt-8 gap-x-10">
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Promotion Name:</h1>
                  <input
                    placeholder={selectedPromotion?.promotionName}
                    required
                    className={classes.InputStyle}
                    type="text"
                    value={
                      value.promotionName || selectedPromotion?.promotionName
                    }
                    onChange={(e) =>
                      setValue({
                        ...value,
                        promotionName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Discount:</h1>
                  <input
                    placeholder={selectedPromotion?.discount}
                    required
                    className={classes.InputStyle}
                    type="number"
                    value={value.discount || selectedPromotion?.discount}
                    onChange={(e) =>
                      setValue({ ...value, discount: e.target.value })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Start Date:</h1>
                  <input
                    placeholder={new Date(
                      selectedPromotion.startDate
                    ).toLocaleDateString("en-GB")}
                    className={classes.InputStyle}
                    value={value.startDate}
                    onChange={(e) =>
                      setValue({ ...value, startDate: e.target.value })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>End Date:</h1>
                  <input
                    placeholder={new Date(
                      selectedPromotion.endDate
                    ).toLocaleDateString("en-GB")}
                    className={classes.InputStyle}
                    value={value.endDate}
                    onChange={(e) =>
                      setValue({ ...value, endDate: e.target.value })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Category:</h1>
                  <ReactSelect
                    isMulti
                    displayEmpty
                    name="values"
                    options={categoryOptions}
                    value={selectedOptions}
                    onChange={(selectedOptions) => {
                      setSelectedOptions(selectedOptions);
                      const selectedValues = selectedOptions.map(
                        (option) => option.value
                      );
                      setValue((prevValue) => ({
                        ...prevValue,
                        categoryList: [...selectedValues],
                      }));
                    }}
                    classNamePrefix="select"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center mt-10 space-x-6">
                <button className={classes.adminFormSubmitButton} type="submit">
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
            </form>
          </div>
          {/* <div className="flex flex-col bg-white rounded-xl ">
            <form
              className="w-full min-h-[300px] py-10 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
              onSubmit={handleFormSubmit}
            >
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Promotion Name:</h1>
                <input
                  placeholder={selectedPromotion?.promotionName}
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={
                    value.promotionName || selectedPromotion?.promotionName
                  }
                  onChange={(e) =>
                    setValue({
                      ...value,
                      promotionName: e.target.value,
                    })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Discount:</h1>
                <input
                  placeholder={selectedPromotion?.discount}
                  required
                  className={classes.InputStyle}
                  type="number"
                  value={value.discount || selectedPromotion?.discount}
                  onChange={(e) =>
                    setValue({ ...value, discount: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Start Date :</h1>
                <input
                  placeholder={new Date(
                    selectedPromotion.startDate
                  ).toLocaleDateString("en-GB")}
                  className={classes.InputStyle}
                  value={value.startDate}
                  onChange={(e) =>
                    setValue({ ...value, startDate: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>End Date :</h1>
                <input
                  placeholder={new Date(
                    selectedPromotion.endDate
                  ).toLocaleDateString("en-GB")}
                  className={classes.InputStyle}
                  value={value.endDate}
                  onChange={(e) =>
                    setValue({ ...value, endDate: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center justify-center mt-10 space-x-6">
                <button className={classes.adminFormSubmitButton} type="submit">
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
          </div> */}
        </ReactModal>
      ) : null}
    </div>
  );
};

export default Body;
