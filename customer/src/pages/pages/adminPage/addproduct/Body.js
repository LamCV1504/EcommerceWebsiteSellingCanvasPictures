import Select from "@mui/material/Select";
import ReactQuill from "react-quill";
import React, { useEffect, useMemo, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import ImageUpload from "../../../components/ImageUpload";
import * as classes from "../../../utils/styles";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { addProduct } from "../../../redux/actions/adminActions";
import { ADD_PRODUCT, SET_ERRORS } from "../../../redux/actionTypes";
import "react-quill/dist/quill.snow.css";

const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const categories = useSelector((state) => state.admin.allCategory);
  const [error, setError] = useState({});
  const [productDescription, setProductDescription] = useState("");

  const [value, setValue] = useState({
    productName: "",
    categoryId: "",
    unitPrice: "",
    quantity: "",
    image: "",
    productStatus: "ACTIVE",
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({ ...value });
    }
  }, [store.errors]);

  const handleUploadSuccess = (url) => {
    setValue(() => ({
      ...value,
      image: url,
    }));
  };

  const handleUploadError = () => {
    toast.error("Error Upload!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});

    dispatch(addProduct({ ...value, productDescription }));
  };

  useEffect(() => {
    if (store.errors || store.admin.productAdded) {
      if (store.admin.productAdded) {
        setValue({
          productName: "",
          category: "",
          unitPrice: "",
          quantity: "",
          image: "",
          productStatus: "",
        });
        setProductDescription("");
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_PRODUCT, payload: false });
      }
    } else {
    }
  }, [store.errors, store.admin.productAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ],
    }),
    []
  );

  return (
    <div className="mx-5 mt-1 item-center bg-lite">
      <div className="space-y-5 ">
        <div className="flex flex-col bg-lite">
          <div>
            <Link to="/manage-products" className="btn btn-primary">
              <button className="mt-2 px-4 py-2  font-bold text-white rounded bg-[#784e3d] mr-14 hover:bg-[#392219] focus:outline-none focus:shadow-outline">
                Back
              </button>
            </Link>
            <h1 className="mt-5  bg-opacity-5 rounded-xl font-bold text-[25px] inline-block">
              Add a Product
            </h1>
          </div>
        </div>
        <div className={classes.Form1}>
          <form
            className="w-full min-h-[300px] py-8 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
            onSubmit={handleSubmit}
          >
            <div className={classes.FormItem}>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Product Name *:</h1>

                <input
                  placeholder="Product Name"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.productName}
                  onChange={(e) =>
                    setValue({ ...value, productName: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Category *:</h1>
                <Select
                  required
                  displayEmpty
                  sx={{ height: 36 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={value.categoryId}
                  onChange={(e) =>
                    setValue({ ...value, categoryId: e.target.value })
                  }
                  className={`${classes.InputStyle} hover:focus:border-none `}
                >
                  <MenuItem value="">None</MenuItem>
                  {categories?.map((cate, idx) => (
                    <MenuItem key={idx} value={cate.categoryId}>
                      {cate.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </div>

              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Price *:</h1>

                <input
                  placeholder="price"
                  required
                  className={classes.InputStyle}
                  type="number"
                  value={value.unitPrice}
                  onChange={(e) =>
                    setValue({ ...value, unitPrice: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Quantity *:</h1>

                <input
                  placeholder="Quantity"
                  required
                  className={classes.InputStyle}
                  type="number"
                  value={value.quantity}
                  onChange={(e) =>
                    setValue({ ...value, quantity: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <h1 className={classes.LabelStyle}>Description:</h1>
              <ReactQuill
                placeholder="Write your description......"
                modules={modules}
                theme="snow"
                value={productDescription}
                onChange={setProductDescription}
              />
            </div>

            <div class="flex items-center mt-10 gap-x-6">
              <div class="w-[180px] h-[180px] bg-[#DDDEEE] bg-opacity-50 aspect-w-1 aspect-h-1">
                <img
                  src={value?.image}
                  alt=""
                  class="object-cover w-full h-full"
                />
              </div>
              <div class="flex flex-col gap-y-5">
                <h1 class="pb-2 text-sm font-medium text-left">Image:</h1>

                <ImageUpload
                  onUploadSuccess={handleUploadSuccess}
                  onUploadError={handleUploadError}
                />
              </div>
            </div>
            <div className="flex gap-x-10">
              <div className={classes.WrapButton}>
                <button className={classes.adminFormSubmitButton} type="submit">
                  OK
                </button>
                <button
                  onClick={() => {
                    setValue({
                      productName: "",
                      categoryId: "",
                      unitPrice: "",
                      quantity: "",
                      description: "",
                      image: "",
                      productStatus: "",
                    });
                    setProductDescription("");
                    setError({});
                  }}
                  className={classes.adminFormClearButton}
                  type="button"
                >
                  CLEAR
                </button>
              </div>

              <div className={classes.loadingAndError}>
                {error.message ? (
                  <p className="text-red-500">{error.message}</p>
                ) : null}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Body;
