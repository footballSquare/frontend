import React from "react";
import AutoMatchModal from "./ui/AutoMatchModal";

const AutoMatchModalBtn = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const handleToggle = () => setIsModalOpen((prev) => !prev);
  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-semibold text-gray-700">Team Info</h2>
      <p className="text-sm text-gray-500">
        Edit or update team details below.
      </p>
      <button
        type="button"
        onClick={handleToggle}
        className="py-2 px-6 bg-gray-300 text-gray-700 rounded-md shadow-md hover:bg-gray-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
        팀 매치 자동화
      </button>

      {isModalOpen && <AutoMatchModal onClose={handleToggle} />}
    </div>
  );
};
export default AutoMatchModalBtn;
