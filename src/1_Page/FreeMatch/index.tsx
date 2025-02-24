import Button from "../../4_Shared/components/Button";

const FreeMatch = () => {
  return (
    <div className="flex w-full border-1">
      <div className="flex flex-col border-1">
        <div className="flex gap-4">
          {/* 매치 생성 / 선호 포지션 참여 / 랜덤 참여 버튼 */}
          <Button
            text="매치만들기"
            bg="white"
            height="36px"
            borderColor="blue"
            border={false}
            bold={true}
          />
          <Button
            text="선호 포지션 참여"
            bg="blue"
            textColor="white"
            height="36px"
            bold={true}
          />
          <Button
            text="랜덤 참여"
            bg="blue"
            textColor="white"
            height="36px"
            bold={true}
          />
        </div>
        <h4 className=" text-blue">현재 경기</h4>
        <div>{/* 매치 목록 */}</div>
      </div>
      <div>{/* 참여 희망 인원 리스트... */}</div>
    </div>
  );
};

export default FreeMatch;
