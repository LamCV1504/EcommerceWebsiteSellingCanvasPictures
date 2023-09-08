import React from "react";
import ReactModal from "react-modal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-40%",
    transform: "translate(-50%, -50%)",
    padding: "0",
  },
};

const ProductDetail = ({ product, isOpen, onClose }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
      ariaHideApp={false}
    >
      <div className="items-center justify-center">
        <div className="w-[1400px] min-h-[100px] py-7 px-7 text-center bg-primary bg-opacity-10 rounded-md  shadow-md mx-auto">
          <div className="flex items-center justify-center gap-5 w-20  font-bold text-white rounded bg-[#784e3d] mr-14 hover:bg-[#392219] focus:outline-none focus:shadow-outline">
            <button
              // className={classes.adminFormClearButton}
              type="button"
              onClick={onClose}
            >
              BACK
            </button>
          </div>
          <div className="flex mt-10 mb-10 gap-x-16">
            <div className="flex flex-col">
              <h1>Image</h1>
              <div className="w-[180px] h-[180px] bg-[#DDDEEE] bg-opacity-50 object-cover mx-auto mb-2">
                <img
                  src={product?.image}
                  // alt="Thumbnail"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div
              className="flex flex-row gap-x-3 "
              style={{ alignItems: "baseline" }}
            >
              <div
                className="flex flex-col gap-y-5"
                style={{ width: "120px", textAlign: "left" }}
              >
                <span>Product:</span>
                <span>Category:</span>
                <span style={{ height: "40px" }}>Description:</span>
                <span>Price:</span>
                <span>Quantity:</span>
                <span>Status:</span>
              </div>
              <div
                className="flex flex-col gap-y-5"
                style={{ width: "1000px", textAlign: "left" }}
              >
                <span style={{ "font-weight": "bolder" }}>
                  {product.productName}
                </span>
                <span>{product.categoryId}</span>
                <span style={{ height: "40px" }}>
                  {product.productDescription}
                </span>
                <span>{product.unitPrice}</span>
                <span>{product.quantity}</span>
                <span>{product.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default ProductDetail;
