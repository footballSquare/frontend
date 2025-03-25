import useGetChampionshipList from "../../../../3_Entity/Community/useGetChampionshipList";
const ChampionshipList = (props: ChampionshipListProps) => {
  const { communityIdx } = props;
  const [championshipList] = useGetChampionshipList({ communityIdx });
  return (
    <div className="bg-white rounded-lg shadow w-full flex flex-col gap-4 overflow-y-auto">
      {championshipList.map((elem, index) => {
        return (
          <div key={index} className=" border border-gray shadow-lg rounded-lg p-2 min-h-[120px]">
            {/* {elem.championship_list_idx} */}
            <h3>{elem.championship_list_name}</h3>
            <img
              src={elem.championship_list_throphy_img}
              className=" w-[32px] border-1"
              alt="throphy"
            />
            {/* {elem.championship_list_color} */}
            <p className=" text-sm">{elem.championship_type_name}</p>
            <p className=" text-xs">
              {`${elem.championship_list_start_date} ~ 
              ${elem.championship_list_end_date}`}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ChampionshipList;
