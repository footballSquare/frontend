import ModalLayer from "../../../../4_Shared/components/ModalLayer";
import TERMS from "./constant/terms";
import { useNavigate } from "react-router-dom";
import useTerms from "./model/useTerms";

const TermOfUseModal = (props: TermOfUseModalProps) => {
  const { toggleModalHandler } = props;
  const navigate = useNavigate();


  const [isAllChecked, checkList, handleCheck, handleAllCheck, showDetail, setShowDetail] = useTerms();

  return (
    <ModalLayer toggleModalHandler={()=>{}} shape="narrow" mode="white">
      <div className="flex flex-col gap-6 w-full items-center">
        <h2 className="text-xl font-bold mb-2">이용약관 동의</h2>
        <div className="w-full flex flex-col gap-4">
          {TERMS.map(term => (
            <div key={term.key} className="flex flex-col gap-2 border-b pb-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={term.key}
                  checked={!!checkList[term.key]}
                  onChange={() => handleCheck(term.key)}
                  className="w-4 h-4"
                />
                <label htmlFor={term.key} className="font-medium text-base">
                  {term.label}
                  {term.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <button
                  className="ml-auto text-blue-600 underline text-xs"
                  onClick={() => setShowDetail(term.key)}
                  type="button"
                >
                  자세히 보기
                </button>
              </div>
              {showDetail === term.key && (
                <div className="bg-gray-100 text-gray-800 p-2 rounded text-xs border mt-1">
                  {term.content}
                  <button
                    className="block ml-auto mt-2 text-blue-600 underline text-xs"
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
        <div className="flex items-center gap-2 mt-4 w-full">
          <input
            type="checkbox"
            id="all"
            checked={isAllChecked}
            onChange={handleAllCheck}
            className="w-4 h-4"
          />
          <label htmlFor="all" className="font-bold text-base">
            전체 약관에 동의합니다
          </label>
        </div>
        <button
          className={`w-full mt-4 p-2 rounded bg-blue-600 text-white font-bold disabled:bg-gray-400`}
          disabled={!TERMS.filter(t => t.required).every(t => checkList[t.key])}
          onClick={toggleModalHandler}
        >
          동의하고 계속하기
        </button>
        <button
          className={`w-full mt-4 p-2 rounded bg-blue-600 text-white font-bold disabled:bg-gray-400`}
          onClick={()=>{navigate("/")}}
        >
          가입 취소하기
        </button>
      </div>
    </ModalLayer>
  );
};

export default TermOfUseModal;