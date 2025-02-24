import React from "react";
import Button from "../../../../4_Shared/components/Button";
import useGetWaitingPlayerList from "../../../../3_Entity/Match/useGetWaitingPlayerList";
import WaitingPlayerCard from "./ui/WaitingPlayerCard";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";
import ronaldoBanner from "../../assets/svg/ronaldoBanner.svg";
const WaitingPlayerList = () => {
  const [page, setPage] = React.useState<number>(1);
  const [isWatingPlayerListOpen, setIsWaitingPlayerListOpen] =
    React.useState(false);
  const [waitingPlayerList, hasMoreContent, loading] =
    useGetWaitingPlayerList(page);
  const [observeRef] = useInfiniteScrollPaging(
    setPage,
    loading,
    hasMoreContent
  );

  return (
    <div className=" flex flex-col gap-4 w-[50%] h-[80vh] overflow-y-auto">
      {/* Button Wrapper */}
      <div className="w-[70%]">
        {isWatingPlayerListOpen ? (
          <Button
            text="매치 대기 인원 보기"
            bg="white"
            textColor="blue"
            bold={true}
            onClickHandler={() => {
              setIsWaitingPlayerListOpen(!isWatingPlayerListOpen);
            }}
          />
        ) : (
          <Button
            text="매치 대기 인원 보기"
            bg="blue"
            textColor="white"
            bold={true}
            onClickHandler={() => {
              setIsWaitingPlayerListOpen(!isWatingPlayerListOpen);
            }}
          />
        )}
      </div>
      
      {isWatingPlayerListOpen ? (
        <div className="flex flex-col overflow-y-auto h-[70vh]">
          {waitingPlayerList.map((elem, index) => {
            return (
              <WaitingPlayerCard
                {...elem}
                observeRef={
                  (waitingPlayerList.length === index + 1 && observeRef) ||
                  undefined
                }
                key={index}
              />
            );
          })}
        </div>
      ) :<img src={ronaldoBanner} alt="ronaldoBanner" className="w-full h-[70vh]"/>}
    </div>
  );
};

export default WaitingPlayerList;
