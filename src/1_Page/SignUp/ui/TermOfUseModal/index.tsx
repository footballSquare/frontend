import TERMS from "./constant/terms";
import { useNavigate } from "react-router-dom";
import useTerms from "./model/useTerms";

const TermOfUseModal = (props: TermOfUseModalProps) => {
  const { toggleModalHandler } = props;
  const navigate = useNavigate();

  const [
    isAllChecked,
    checkList,
    handleCheck,
    handleAllCheck,
    showDetail,
    setShowDetail,
  ] = useTerms();
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-auto">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm min-h-screen"></div>

      {/* Modal Content */}
      <div className="w-full max-w-lg backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl overflow-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl mb-3 shadow-lg">
            <span className="text-lg font-bold text-white">📋</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Terms of Service
          </h2>
          <p className="text-gray-300 text-sm">
            Please review and agree to the terms
          </p>
        </div>

        {/* Terms Content */}
        <div className="flex flex-col gap-2 mb-6 max-h-[50vh] overflow-auto">
          {TERMS.map((term) => (
            <div
              key={term.key}
              className="bg-gray-800/30 rounded-lg p-2 border border-gray-600"
            >
              <div className="flex items-center justify-center gap-2">
                <input
                  type="checkbox"
                  id={term.key}
                  checked={!!checkList[term.key]}
                  onChange={() => handleCheck(term.key)}
                  className="w-4 h-4 text-gray-600 bg-gray-700 border-gray-600 rounded focus:ring-gray-500 focus:ring-2"
                />
                <label
                  htmlFor={term.key}
                  className="font-medium text-white text-sm flex-1"
                >
                  {term.label}
                  {term.required && (
                    <span className="text-red-400 ml-1">*</span>
                  )}
                </label>
                <button
                  className="text-blue-400 hover:text-blue-300 underline text-xs transition-colors duration-200"
                  onClick={() => setShowDetail(term.key)}
                  type="button"
                >
                  자세히 보기
                </button>
              </div>
              {showDetail === term.key && (
                <div className="bg-gray-900/50 text-gray-200 p-3 rounded-lg text-xs border border-gray-700 mt-2 overflow-auto max-h-[200px] whitespace-pre-line">
                  {term.content}
                  <button
                    className="block ml-auto mt-2 text-blue-400 hover:text-blue-300 underline text-xs transition-colors duration-200"
                    onClick={() => setShowDetail(null)}
                    type="button"
                  >
                    닫기
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* All Agree Checkbox */}
        <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 mb-6">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="all"
              checked={isAllChecked}
              onChange={handleAllCheck}
              className="w-5 h-5 text-gray-600 bg-gray-700 border-gray-600 rounded focus:ring-gray-500 focus:ring-2"
            />
            <label htmlFor="all" className="font-bold text-white">
              전체 약관에 동의합니다
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            className={`w-full py-2.5 font-semibold rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 ${
              TERMS.filter((t) => t.required).every((t) => checkList[t.key])
                ? "bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] hover:from-gray-500 hover:to-gray-700 focus:ring-gray-500"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
            disabled={
              !TERMS.filter((t) => t.required).every((t) => checkList[t.key])
            }
            onClick={toggleModalHandler}
          >
            동의하고 계속하기
          </button>
          <button
            className="w-full py-2.5 bg-gray-700/50 border border-gray-600 text-white font-semibold rounded-lg hover:bg-gray-600/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
            onClick={() => {
              navigate("/");
            }}
          >
            가입 취소하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermOfUseModal;
