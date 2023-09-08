import { useSelector } from "react-redux";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import React from "react";
import CategoryIcon from "@mui/icons-material/Category";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Income from "../../components/Income";

const Body = () => {
  const products = useSelector((state) => state.admin.allProduct);
  const orders = useSelector((state) => state.admin.allOrder);
  const categories = useSelector((state) => state.admin.allCategory);
  const users = useSelector((state) => state.admin.allUsers);

  return (
    <div className="mx-5 mt-1">
      <div className="space-y-3">
        <br></br>
        <div className="grid grid-cols-4 gap-x-4 gap-y-6">
          <div className="p-3 bg-white rounded-lg">
            <div className="">
              <h1>PRODUCTS</h1>
            </div>
            <div className="mt-10 mb-6 border-b-2"></div>
            <div className="flex justify-between w-full h-full">
              <div>
                <h2 className="text-4xl font-bold">{products?.length}</h2>
                <span>TOTAL</span>
              </div>

              <div className="relative">
                <Inventory2Icon
                  className="text-primary"
                  sx={{ fontSize: 60 }}
                />
              </div>
            </div>
          </div>
          <div className="p-3 bg-white rounded-lg">
            <div className="">
              <h1>CATEGORY</h1>
            </div>
            <div className="mt-10 mb-6 border-b-2"></div>
            <div className="flex justify-between w-full h-full">
              <div>
                <h2 className="text-4xl font-bold">{categories?.length}</h2>
                <span>TOTAL</span>
              </div>

              <div className="relative">
                <CategoryIcon className="text-primary " sx={{ fontSize: 60 }} />
              </div>
            </div>
          </div>
          <div className="p-3 bg-white rounded-lg">
            <div className="">
              <h1>ORDER</h1>
            </div>
            <div className="mt-10 mb-6 border-b-2"></div>

            <div className="flex justify-between w-full h-full">
              <div>
                <h2 className="text-4xl font-bold">{orders?.length}</h2>
                <span>TOTAL</span>
              </div>

              <div className="relative">
                <AddShoppingCartIcon
                  className="text-primary"
                  sx={{ fontSize: 60 }}
                />
              </div>
            </div>
          </div>
          <div className="p-3 bg-white rounded-lg">
            <div className="">
              <h1>USER</h1>
            </div>
            <div className="mt-10 mb-6 border-b-2"></div>

            <div className="flex justify-between w-full h-full">
              <div>
                <h2 className="text-4xl font-bold">{users?.length}</h2>
                <span>TOTAL</span>
              </div>

              <div className="relative">
                <GroupIcon className="text-primary" sx={{ fontSize: 60 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Income />
    </div>
  );
};

export default Body;
