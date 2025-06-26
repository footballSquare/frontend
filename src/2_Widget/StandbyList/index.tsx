import useGetStandbyList from "../../3_Entity/Match/useGetStandbyList";
import StandbyPlayerCard from "./ui/StandbyPlayerCard";

const WaitingPlayerList = () => {
  const [standbyList] = useGetStandbyList();

  return (
    <div className="flex flex-col overflow-y-auto h-full w-full gap-2 bg-gray-500 rounded-lg p-4">
      {standbyList.map((elem, index) => {
        return (
          <StandbyPlayerCard
            {...elem}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default WaitingPlayerList;
