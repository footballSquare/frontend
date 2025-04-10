import useGetChampionshipInfo from "../../../../3_Entity/Championship/useGetChampionshipInfo";
import useGetChampionshipEndData from "../../../../3_Entity/Championship/useGetChampionshipEndData";
import useEditChampionshipStore from "../../../../4_Shared/zustand/useEditChampionshipStore";
import { convertToChampionshipForm } from "./util/convert";

const ChampionshipEdit = (props: ChampionshipEditProps) => {
  const { child } = props;
  const { championshipListIdx } = useEditChampionshipStore();

  const [championshipEndData] = useGetChampionshipEndData(
    championshipListIdx || 0
  );
    const [championshipInfo] = useGetChampionshipInfo(championshipListIdx || 0);
    
    const defaultValues =  convertToChampionshipForm(championshipEndData,championshipInfo)

    
    
    return (
      
  )
};
export default ChampionshipEdit;
