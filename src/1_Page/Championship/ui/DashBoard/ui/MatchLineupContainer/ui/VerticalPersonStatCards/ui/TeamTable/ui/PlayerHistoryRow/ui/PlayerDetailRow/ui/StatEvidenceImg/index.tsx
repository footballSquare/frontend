import useToggleState from "../../../../../../../../../../../../../../../../4_Shared/model/useToggleState";
import StatEvidenceImgForm from "../../../../../../../../../../../../../../../../2_Widget/StatEvidenceImgForm";

// 패널 컴포넌트 (기존 인터페이스 유지)
const StatEvidenceImgFormPanel = (props: StatEvidenceImgFormPanelProps) => {
  const { matchIdx, defaultValues } = props;
  const [isModalOpen, toggleModal] = useToggleState(false);

  // 총 이미지 개수 계산 (버튼 표시용)
  const totalImageCount = (defaultValues?.urls || []).length;

  const handleSubmit = (data: FinalData) => {
    console.log("Form submitted:", data, matchIdx);
    // 여기서 실제 API 호출 또는 상위 컴포넌트로 데이터 전달
    toggleModal(); // 성공 시 모달 닫기
  };

  return (
    <div>
      {/* 트리거 버튼 */}
      <button
        type="button"
        onClick={toggleModal}
        className="px-4 py-2 bg-[var(--color-thick-grass)]/20 border border-[var(--color-grass)]/30 text-[var(--color-grass)] rounded-lg hover:bg-[var(--color-thick-grass)]/40 hover:border-[var(--color-grass)] transition-all duration-200 flex items-center gap-2 text-sm font-medium">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        증빙자료 ({totalImageCount}/5개)
      </button>

      {isModalOpen && (
        <StatEvidenceImgForm
          onClose={toggleModal}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
        />
      )}
      {/* 모달 사용 */}
    </div>
  );
};

export default StatEvidenceImgFormPanel;
