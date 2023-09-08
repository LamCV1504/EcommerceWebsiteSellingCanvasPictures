import { ADD_PROMOTION, SET_ERRORS } from "../../../redux/actionTypes";
import { addPromotion } from "../../../redux/actions/adminActions";
import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import React, { useEffect, useState } from "react";
import Spinner from "../../../utils/Spinner";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { getCategories } from "../../../redux/actions/adminActions";

const Body = () => {
  const categories = useSelector((state) => state.admin.allCategory);
  const user = JSON.parse(localStorage.getItem("user"));
  const categoryOptions = categories?.map((category) => ({
    value: category.categoryId,
    label: category.categoryName,
  }));

  const [selectedOptions, setSelectedOptions] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const store = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    promotionName: "",
    startDate: "",
    endDate: "",
    discount: "",
    categoryList: "",
    userId: user?.userId,
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({ ...value });
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addPromotion(value));
  };

  useEffect(() => {
    if (store.errors || store.admin.promotionAdded) {
      setLoading(false);
      if (store.admin.promotionAdded) {
        setValue({
          pricelistName: "",
          applyDate: "",
        });
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_PROMOTION, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.promotionAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="space-y-5">
        <div>
          <Link to="/manage-promotion" className="btn btn-primary">
            <button className="mt-2 px-4 py-2  font-bold text-white rounded bg-[#784e3d] mr-14 hover:bg-[#603304] first-line:focus:outline-none focus:shadow-outline">
              BACK
            </button>
          </Link>
          <h1 className="mt-5 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block ">
            Add new promotion
          </h1>
        </div>
        <div className="flex flex-col bg-white rounded-xl">
          <form
            className="w-full min-h-[300px] py-7 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-2 gap-x-10">
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Promotion Name:</h1>
                <input
                  placeholder="Promotion Name"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.promotionName}
                  onChange={(e) =>
                    setValue({ ...value, promotionName: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Discount:</h1>
                <input
                  placeholder="Discount"
                  required
                  className={classes.InputStyle}
                  type="number"
                  value={value.discount}
                  onChange={(e) =>
                    setValue({ ...value, discount: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Start Date:</h1>
                <input
                  placeholder="Start Date"
                  className={classes.InputStyle}
                  type="date"
                  value={value.startDate}
                  onChange={(e) =>
                    setValue({ ...value, startDate: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>End Date:</h1>
                <input
                  placeholder="End Date"
                  className={classes.InputStyle}
                  type="date"
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
                OK
              </button>
              <button
                onClick={() => {
                  setValue({
                    promotionName: "",
                    discount: "",
                    startDate: "",
                    endDate: "",
                    categoryList: "",
                    userId: user?.userId,
                  });
                  setError({});
                }}
                className={classes.adminFormClearButton}
                type="button"
              >
                CLEAR
              </button>
            </div>
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Đang thêm..."
                  height={30}
                  width={150}
                  color="#157572"
                  messageColor="#157572"
                />
              )}
              {error.mes ? (
                <p className="text-red-500">{error.message}</p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Body;
