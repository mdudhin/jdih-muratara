import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  return (
    <div className="bg-slate-800 flex flex-col gap-2 p-5 w-1/5">
      <ul className="space-y-2 font-medium">
        <li>
          <Link
            to={"/admin/"}
            className="flex items-center p-2 rounded-lg text-white hover:bg-gray-100 hover:text-gray-900 group"
          >
            <span className="ms-3">Dashboard</span>
          </Link>
        </li>
        <NestedSidebar
          label="Dokumen Hukum"
          items={[{ path: "/admin/peraturan", label: "Peraturan" }]}
        />
        <li>
          <Link
            to={"/admin/registeruser"}
            className="flex items-center p-2 rounded-lg text-white hover:bg-gray-100 hover:text-gray-900 group"
          >
            <span className="ms-3">Register User</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

interface Props {
  label: string;
  items: { path: string; label: string }[];
}

const NestedSidebar = (props: Props) => {
  const { label, items } = props;
  const [isNestedListVisible, setNestedListVisibility] = useState(false);

  const toggleNestedList = () => {
    setNestedListVisibility(!isNestedListVisible);
  };
  return (
    <li>
      <button
        type="button"
        className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group hover:bg-gray-100 text-white hover:text-gray-900"
        onClick={toggleNestedList}
      >
        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
          {label}
        </span>
        <svg
          className={`w-3 h-3 transform ${
            isNestedListVisible ? "rotate-180" : ""
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <ul className={`${isNestedListVisible ? "py-2" : "hidden"} space-y-2`}>
        {items.map((item) => (
          <li>
            <Link
              to={item.path}
              className="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 text-white hover:text-gray-900"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default Sidebar;
