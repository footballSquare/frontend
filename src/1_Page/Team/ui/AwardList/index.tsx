import HoverTrophy from "./ui/HoverTrophy";
import useGetTeamAwards from "../../../../3_Entity/Team/useGetTeamAwards";
const AwardList = () => {
  const [teamAwards] = useGetTeamAwards();
  return (
    <div className="hidden flex-wrap gap-4 lg:flex ">
      {teamAwards.map((trophyData, index) => (
        <HoverTrophy
          trophyData={trophyData}
          index={index}
          length={teamAwards.length}
        />
      ))}
    </div>
  );
};
export default AwardList;
