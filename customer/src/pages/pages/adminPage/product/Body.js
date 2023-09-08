import React, { useEffect, useMemo, useState } from "react";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  updateProduct,
  deleteProduct,
} from "../../../redux/actions/adminActions";
import { Link } from "react-router-dom";
import * as classes from "../../../utils/styles";
import Swal from "sweetalert2";
import {
  SET_ERRORS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../../../redux/actionTypes";
import { MenuItem, Select } from "@mui/material";
import { AiFillEdit, AiFillDelete, AiOutlineInfoCircle } from "react-icons/ai";
import ReactQuill from "react-quill";
import ImageUpload from "../../../components/ImageUpload";
import { toast } from "react-toastify";
import ProductDetail from "./ProductDetail";
import { formatMoney } from "../../../convert_helper";

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
  const products = useSelector((state) => state.admin.allProduct);
  console.log("products", products);
  const categories = useSelector((state) => state.admin.allCategory);

  const [selectedProduct, setSelectedProduct] = useState("");
  const [error, setError] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
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

  const handleUploadSuccess = (url) => {
    setValue(() => ({
      ...value,
      image: url,
    }));
  };

  const handleUploadError = () => {
    toast.error("Error Upload!");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [description, setDescription] = useState("");

  const [value, setValue] = useState({
    productName: "",
    categoryId: "",
    unitPrice: "",
    quantity: "",
    image: "",
    productId: "",
    productStatus: "",
  });

  const handleEditClick = (pod) => {
    setModalMode("edit");
    setSelectedProduct(pod);
    setIsModalOpen(true);
    setValue({
      productName: "",
      categoryId: "",
      unitPrice: "",
      quantity: "",
      image: "",
      productId: pod.productId,
      productStatus: "",
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
    if (value.productId !== "") {
      updatedValue.productId = value.productId;
    } else {
      updatedValue.productId = selectedProduct.productId;
    }
    if (value.productName !== "") {
      updatedValue.productName = value.productName;
    } else {
      updatedValue.productName = selectedProduct.productName;
    }
    if (value.categoryId !== "") {
      updatedValue.categoryId = value.categoryId;
    } else {
      updatedValue.categoryId = selectedProduct.categoryId;
    }
    if (value.unitPrice !== "") {
      updatedValue.unitPrice = value.unitPrice;
    } else {
      updatedValue.unitPrice = selectedProduct.unitPrice;
    }
    if (value.quantity !== "") {
      updatedValue.quantity = value.quantity;
    } else {
      updatedValue.quantity = selectedProduct.quantity;
    }
    if (value.image !== "") {
      updatedValue.image = value.image;
    } else {
      updatedValue.image = selectedProduct.image;
    }
    if (value.productStatus !== "") {
      updatedValue.productStatus = value.productStatus;
    } else {
      updatedValue.productStatus = selectedProduct.productStatus;
    }

    dispatch(
      updateProduct(
        { ...selectedProduct, ...updatedValue },
        selectedProduct?.productId
      )
    );
    dispatch({ type: UPDATE_PRODUCT, payload: false });
  };
  console.log(" selectedProduct?.productId", selectedProduct?.productId);
  useEffect(() => {
    if (store.admin.updatedProduct) {
      setError({});
      closeModal();
      dispatch(getProducts());
    }
  }, [dispatch, store.errors, store.admin.updatedProduct]);

  const handleModalError = () => {
    setError({});
    closeModal();
  };
  // End edit

  // begin view
  const handleOpenViewModal = (product) => {
    setSelectedProduct(product);
    setModalMode("view");
    setIsModalOpen(true);
  };
  //end view

  // Begin delete

  const dltProduct = (id) => {
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
        dispatch(deleteProduct([id]));
      }
    });
  };

  console.log("store.admin.productDeleted", store.admin.productDeleted);
  useEffect(() => {
    if (store.admin.productDeleted) {
      dispatch(getProducts());

      dispatch({ type: DELETE_PRODUCT, payload: false });
    }
  }, [store.admin.productDeleted]);

  const initialProducts = products;
  const [filteredList, setFilteredList] = new useState([]);
  const [searchValue, setSearchValue] = useState("");

  const filterBySearch = (event) => {
    const query = event.target.value;
    setSearchValue(query);
    var updatedList = [...products];
    updatedList = updatedList.filter((item) => {
      return (
        item?.product.productName
          ?.toLowerCase()
          .indexOf(query.toLowerCase()) !== -1
      );
    });
    setFilteredList(updatedList);
  };
  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="flex mt-4">
        <Link to="/add-product" className="btn btn-primary">
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
            placeholder="Find Product..."
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
                  <th className="px-4 py-1">Product Name</th>
                  <th className="px-4 py-1">Category</th>
                  <th className="px-4 py-1">Price</th>
                  <th className="px-4 py-1">Quantity</th>
                  <th className="px-4 py-1">Status</th>
                  <th className="px-4 py-1">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {filteredList?.map((product, idx) => (
                  <tr
                    className="justify-center item-center hover:bg-[#d5ab986d]"
                    key={idx}
                  >
                    <td className="px-4 py-1 text-center border ">{idx + 1}</td>

                    <td className="px-2 py-2 mr-5 border">
                      <img
                        className="w-20 mx-auto"
                        src={product.product.image}
                      />
                    </td>

                    <td className="px-4 py-1 text-left border w-60 ">
                      {product.product.productName}
                    </td>
                    <td className="px-4 py-1 text-center border">
                      {product.categoryName}
                    </td>
                    <td className="px-4 py-1 text-center border">
                      {formatMoney(product.product.unitPrice)}đ
                    </td>
                    <td className="px-4 py-1 text-center border">
                      {product.product.quantity}
                    </td>
                    <td className="px-4 py-1 text-center border">
                      {product.product.productStatus}
                    </td>
                    <td className="px-1 py-1 mr-0 space-x-3 text-center border">
                      <button
                        onClick={() => handleOpenViewModal(product.product)}
                      >
                        <AiOutlineInfoCircle size={20} />
                      </button>
                      {modalMode === "view" && (
                        <ProductDetail
                          isOpen={isModalOpen}
                          onClose={closeModal}
                          product={selectedProduct}
                        />
                      )}
                      <button onClick={() => handleEditClick(product)}>
                        <AiFillEdit size={20} />
                      </button>
                      <button onClick={() => dltProduct(product._id)}>
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
              <thead className="bg-[rgb(169,126,109)] items-center sticky top-0">
                <tr>
                  <th className="px-4 py-1">#</th>
                  <th className="px-4 py-1">Image</th>
                  <th className="px-4 py-1">Product Name</th>
                  <th className="px-4 py-1">Category</th>
                  <th className="px-4 py-1">Price</th>
                  <th className="px-4 py-1">Quantity</th>
                  <th className="px-4 py-1">Status</th>
                  <th className="px-4 py-1">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {initialProducts?.map((product, idx) => (
                  <tr
                    className="justify-center item-center hover:bg-[#d5ab987c]"
                    key={idx}
                  >
                    <td className="px-4 py-1 text-center border ">{idx + 1}</td>

                    <td className="px-2 py-2 mr-5 border">
                      <img
                        className="w-20 mx-auto"
                        src={product.product.image}
                      />
                    </td>

                    <td className="px-4 py-1 text-left border w-60 ">
                      {product.product.productName}
                    </td>
                    <td className="px-4 py-1 text-center border">
                      {product.categoryName}
                    </td>
                    <td className="px-4 py-1 text-center border">
                      {formatMoney(product.product.unitPrice)}đ
                    </td>
                    <td className="px-4 py-1 text-center border">
                      {product.product.quantity}
                    </td>
                    <td className="px-4 py-1 text-center border">
                      {product.product.productStatus}
                    </td>
                    <td className="px-1 py-1 mr-0 space-x-3 text-center border">
                      <button
                        onClick={() => handleOpenViewModal(product.product)}
                      >
                        <AiOutlineInfoCircle size={20} />
                      </button>
                      {modalMode === "view" && (
                        <ProductDetail
                          isOpen={isModalOpen}
                          onClose={closeModal}
                          product={selectedProduct}
                        />
                      )}
                      <button onClick={() => handleEditClick(product.product)}>
                        <AiFillEdit size={20} />
                      </button>
                      <button>
                        <AiFillDelete
                          size={20}
                          onClick={() => dltProduct(product.product.productId)}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* modal edit */}
      {selectedProduct && modalMode === "edit" ? (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className="flex flex-col mx-5 mt-10 rounded-xl">
            <form
              className="w-[1450px] min-h-[600px] py-5 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
              onSubmit={handleFormSubmit}
            >
              <div className="grid grid-cols-3 gap-x-10">
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Product Name: </h1>
                  <input
                    placeholder={selectedProduct?.productName}
                    className={classes.InputStyle}
                    type="text"
                    value={value.productName || selectedProduct?.productName}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        productName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Category *:</h1>
                  <Select
                    required
                    displayEmpty
                    placeholder={
                      value.categoryId || selectedProduct?.categoryId
                    }
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.categoryId || selectedProduct?.categoryId}
                    onChange={(e) =>
                      setValue({ ...value, categoryId: e.target.value })
                    }
                    className={`${classes.InputStyle} hover:focus:border-none `}
                  >
                    <MenuItem value="">
                      {selectedProduct?.categoryName}
                    </MenuItem>
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
                    placeholder="Price"
                    required
                    className={classes.InputStyle}
                    type="number"
                    value={value.unitPrice || selectedProduct.unitPrice}
                    onChange={(e) =>
                      setValue({ ...value, unitPrice: e.target.value })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Status:</h1>
                  <Select
                    required
                    displayEmpty
                    placeholder={
                      value.productStatus || selectedProduct?.productStatus
                    }
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={
                      value.productStatus || selectedProduct?.productStatus
                    }
                    onChange={(e) =>
                      setValue({ ...value, productStatus: e.target.value })
                    }
                    className={`${classes.InputStyle} hover:focus:border-none `}
                  >
                    <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                    <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                  </Select>
                </div>
              </div>
              <div>
                <h1 className={classes.LabelStyle}>Description *:</h1>
                <ReactQuill
                  modules={modules}
                  theme="snow"
                  value={
                    description ||
                    selectedProduct?.productDescription.slice(
                      3,
                      selectedProduct?.productDescription.length - 4
                    )
                  }
                  onChange={setDescription}
                />
              </div>
              <div class="flex items-center mt-10 gap-x-6">
                <div class="w-[180px] h-[180px] bg-[#DDDEEE] bg-opacity-50 aspect-w-1 aspect-h-1">
                  <img
                    src={value?.image || selectedProduct.image}
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

              <div className="flex items-center justify-center mt-5 space-x-6">
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
          </div>
        </ReactModal>
      ) : null}
    </div>
  );
};
export default Body;
