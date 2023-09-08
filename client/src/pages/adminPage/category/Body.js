import React, { useMemo, useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategories,
  updateCategory,
  deleteCategory,
} from "../../../redux/actions/adminActions";
import { Link } from "react-router-dom";
import * as classes from "../../../utils/styles";
import Swal from "sweetalert2";
import {
  SET_ERRORS,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "../../../redux/actionTypes";
import { AiFillEdit, AiFillDelete, AiOutlineInfoCircle } from "react-icons/ai";
import ImageUpload from "../../../components/ImageUpload";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";

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
    width: "80%",
  },
};

const Body = () => {
  const store = useSelector((state) => state);
  const categories = useSelector((state) => state.admin.allCategory);
  // categories?.sort(
  //   (a, b) => a.categoryName.charCodeAt(0) - b.categoryName.charCodeAt(0)
  // );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState({});
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
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
    categoryName: "",
    categoryId: "",
    author: "",
    image: "",
  });

  const handleEditClick = (cate) => {
    setSelectedCategory(cate);
    setIsModalOpen(true);
    setValue({
      categoryName: "",
      categoryId: cate.categoryId,
      author: "",
      image: "",
    });
  };

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

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedValue = {};
    if (value.categoryName !== "") {
      updatedValue.categoryName = value.categoryName;
    } else {
      updatedValue.categoryName = selectedCategory.categoryName;
    }
    if (value.categoryId !== "") {
      updatedValue.categoryId = value.categoryId;
    } else {
      updatedValue.categoryId = selectedCategory.categoryId;
    }
    if (value.author !== "") {
      updatedValue.author = value.author;
    } else {
      updatedValue.author = selectedCategory.author;
    }
    if (value.image !== "") {
      updatedValue.image = value.image;
    } else {
      updatedValue.image = selectedCategory.image;
    }

    dispatch(
      updateCategory(
        { ...selectedCategory, ...updatedValue },
        selectedCategory.categoryId
      )
    );
    dispatch({ type: UPDATE_CATEGORY, payload: false });
  };

  useEffect(() => {
    if (store.admin.updatedCategory) {
      setError({});
      closeModal();
      dispatch(getCategories());
    }
  }, [dispatch, store.errors, store.admin.updatedCategory]);

  const handleModalError = () => {
    setError({});
    closeModal();
  };

  const handleUploadSuccess = (url) => {
    setValue(() => ({
      ...value,
      image: url,
    }));
  };

  const handleUploadError = () => {
    toast.error("Error Upload!");
  };
  // End edit

  const dltCategory = (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      text: "Hành động này sẽ không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý, Xóa!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategory([id]));
      }
    });
  };

  useEffect(() => {
    if (store.admin.categoryDeleted) {
      dispatch(getCategories());
      dispatch({ type: DELETE_CATEGORY, payload: false });
    } else {
      setError({});
    }
  }, [store.admin.categoryDeleted, store.errors]);

  const initialCategories = categories;
  const [filteredList, setFilteredList] = new useState([]);
  const [searchValue, setSearchValue] = useState("");

  const filterBySearch = (event) => {
    const query = event.target.value;
    setSearchValue(query);
    var updatedList = [...categories];
    updatedList = updatedList.filter((item) => {
      return (
        item?.categoryName?.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    });
    setFilteredList(updatedList);
  };

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="flex mt-4">
        <Link to="/add-category" className="btn btn-primary">
          <button
            className="items-center gap-[9px]  w-[88px] h-[40px] hover:bg-[#603304] block py-2 font-bold text-white rounded-lg px-4 
            bg-[#784e3d]  focus:outline-none focus:shadow-outline "
          >
            ADD
          </button>
        </Link>
        <div className="flex rounded-lg border border-[#eee5e1] ml-3">
          <input
            type="text"
            className="w-[300px] block  px-4 py-2 bg-white  rounded-lg text-primary focus:border-[#f4866ac9] focus:ring-[#753815] focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Find Category..."
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
                  <th className="px-4 py-1">#</th>
                  <th className="px-4 py-1">Image</th>
                  <th className="px-4 py-1">Category Name</th>
                  <th className="px-4 py-1">Author</th>
                  <th className="px-4 py-1">Description</th>
                  <th className="px-4 py-1">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {filteredList?.map((cate, idx) => (
                  <tr
                    className="justify-center item-center  hover:bg-[rgb(208,184,177)]"
                    key={idx}
                  >
                    <td className="px-4 py-1 border">{idx + 1}</td>

                    <td className="px-2 py-2 mr-5 border">
                      <img className="w-20 mx-auto" src={cate.image} />
                    </td>

                    <td className="px-4 py-1 text-center border w-50">
                      {cate.categoryName}
                    </td>
                    <td className="px-4 py-1 text-center border w-60">
                      {cate.author}
                    </td>
                    <td className="px-4 py-1 text-left border">
                      {cate.categoryDescription.slice(
                        3,
                        cate?.categoryDescription.length - 4
                      )}
                    </td>
                    <td className="px-1 py-1 mr-0 space-x-3 text-center border">
                      <button onClick={() => handleEditClick(cate)}>
                        <AiFillEdit size={20} />
                      </button>
                      <button onClick={() => dltCategory(cate.categoryId)}>
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
            <table className="w-full table-auto ">
              <thead className="bg-[rgba(169,126,109,0.46)]  items-center">
                <tr>
                  <th className="px-4 py-1">#</th>
                  <th className="px-4 py-1">Image</th>
                  <th className="px-4 py-1">Category Name</th>
                  <th className="px-4 py-1">Author</th>
                  <th className="px-4 py-1">Description</th>
                  <th className="px-4 py-1">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {initialCategories?.map((cate, idx) => (
                  <tr
                    className="justify-center item-center  hover:bg-[rgb(208,184,177)]"
                    key={idx}
                  >
                    <td className="px-4 py-1 border">{idx + 1}</td>

                    <td className="px-2 py-2 mr-5 border">
                      <img className="w-20 mx-auto" src={cate.image} />
                    </td>

                    <td className="px-4 py-1 text-center border w-50">
                      {cate.categoryName}
                    </td>
                    <td className="px-4 py-1 text-center border w-60">
                      {cate.author}
                    </td>
                    <td className="px-4 py-1 text-left border">
                      {cate.categoryDescription.slice(
                        3,
                        cate?.categoryDescription.length - 4
                      )}
                    </td>
                    <td className="px-1 py-1 mr-0 space-x-3 text-center border">
                      <button onClick={() => handleEditClick(cate)}>
                        <AiFillEdit size={20} />
                      </button>
                      <button onClick={() => dltCategory(cate.categoryId)}>
                        <AiFillDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {selectedCategory ? (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className="flex flex-col bg-white rounded-xl">
            <form
              className="w-full min-h-[100px] py-9 px-7 text-center bg-white border rounded-md  shadow-2xl mx-auto"
              onSubmit={handleFormSubmit}
            >
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Category Name:</h1>
                <input
                  placeholder={selectedCategory?.categoryName}
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.categoryName || selectedCategory?.categoryName}
                  onChange={(e) =>
                    setValue({
                      ...value,
                      categoryName: e.target.value,
                    })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Author:</h1>
                <input
                  placeholder={selectedCategory?.author}
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.author || selectedCategory?.author}
                  onChange={(e) =>
                    setValue({ ...value, author: e.target.value })
                  }
                />
                <div>
                  <div className={classes.WrapInputLabel}></div>
                  <h1 className={classes.LabelStyle}>Description:</h1>
                  <ReactQuill
                    modules={modules}
                    theme="snow"
                    value={
                      description ||
                      selectedCategory?.categoryDescription.slice(
                        3,
                        selectedCategory?.categoryDescription.length - 4
                      )
                    }
                    onChange={setDescription}
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
              </div>
              <div className="flex items-center justify-center mt-10 space-x-6">
                <button className={classes.adminFormSubmitButton} type="submit">
                  OK
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
        </ReactModal>
      ) : null}
    </div>
  );
};
export default Body;
