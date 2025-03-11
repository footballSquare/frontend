import useGetChampionshipList from "../../../../3_Entity/Community/useGetChampionshipList";
import { ChampionshipListProps } from "./type";
const ChampionShipList = (props: ChampionshipListProps) => {
  const {communityIdx} = props;
  const [championshipList] = useGetChampionshipList({communityIdx});
  return <div className="bg-white rounded-lg shadow">
    {championshipList.map((elem)=>{
      return(<div>
        {elem.championship_list_idx}
        {elem.championship_list_name}
        {elem.championship_list_throphy_img}
        {elem.championship_list_color}
        {elem.championship_type_name}
        {elem.championship_list_start_date}
        {elem.championship_list_end_date}
      </div>)
    })}
  </div>;
};

export default ChampionShipList;