const AdminBtns = () => {
  return (
    <div>
      <div className="flex gap-2">
        <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100">
          대회 수정
        </button>
        <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100">
          대회 마감
        </button>
      </div>
    </div>
  );
};
export default AdminBtns;
