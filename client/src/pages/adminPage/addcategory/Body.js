import { ADD_CATEGORY, SET_ERRORS } from "../../../redux/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import React, { useEffect, useMemo, useState } from "react";
import Spinner from "../../../utils/Spinner";
import { addCategory } from "../../../redux/actions/adminActions";
import { Link } from "react-router-dom";
import ImageUpload from "../../../components/ImageUpload";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";

const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [categoryDescription, setCategoryDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    categoryName: "",
    author: "",
    image: "",
  });

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
    setLoading(true);
    dispatch(addCategory({ ...value, categoryDescription }));
  };

  useEffect(() => {
    if (store.errors || store.admin.categoryAdded) {
      setLoading(false);
      if (store.admin.categoryAdded) {
        setValue({
          categoryName: "",
          author: "",
          image: "",
        });
        setCategoryDescription("");
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_CATEGORY, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.categoryAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="mx-5 mt-3 item-center ">
      <div className="space-y-3">
        <div className="flex flex-col">
          <div>
            <Link to="/manage-category" className="btn btn-primary">
              <button className="mt-2 px-4 py-2  font-bold text-white rounded bg-[#784e3d] mr-14 hover:bg-[#603304] first-line:focus:outline-none focus:shadow-outline">
                BACK
              </button>
            </Link>
            <h1 className="mt-5 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block ">
              Add new category
            </h1>
          </div>
        </div>
        <div className="flex flex-col bg-white rounded-xl">
          <form
            className="w-full min-h-[100px] py-9 px-7 text-center bg-white border rounded-md  shadow-2xl mx-auto"
            onSubmit={handleSubmit}
          >
            <div className={classes.WrapInputLabel}>
              <h1 className={classes.LabelStyle}>Category Name:</h1>
              <input
                placeholder="Category Name"
                required
                className={classes.InputStyle}
                type="text"
                value={value.categoryName}
                onChange={(e) =>
                  setValue({ ...value, categoryName: e.target.value })
                }
              />
            </div>
            <div className={classes.WrapInputLabel}>
              <h1 className={classes.LabelStyle}>Author:</h1>
              <input
                placeholder="Author"
                required
                className={classes.InputStyle}
                type="text"
                value={value.author}
                onChange={(e) => setValue({ ...value, author: e.target.value })}
              />
              <div>
                <div className={classes.WrapInputLabel}></div>
                <h1 className={classes.LabelStyle}>Description:</h1>
                <ReactQuill
                  placeholder="Write your description......"
                  type="text"
                  value={categoryDescription}
                  modules={modules}
                  theme="snow"
                  onChange={setCategoryDescription}
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
                  <h1 class="pb-2 text-sm font-medium text-left">Thumbnail:</h1>

                  <ImageUpload
                    onUploadSuccess={handleUploadSuccess}
                    onUploadError={handleUploadError}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center mt-10 space-x-6">
              <button className={classes.adminFormSubmitButton} type="submit">
                OK
              </button>
              <button
                onClick={() => {
                  setValue({
                    categoryName: "",
                    author: "",
                    categoryDescription: "",
                    image: "",
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
                  message="Loading"
                  height={30}
                  width={150}
                  color="#157572"
                  messageColor="#157572"
                />
              )}
              {error.message ? (
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
