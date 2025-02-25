import useGetTeamMembers from "../../../../3_Entity/Team/useGetTeamMembers";
import MemberCard from "./ui/MemberCard";

const TeamMemberListBox = () => {
  const [teamMember] = useGetTeamMembers();
  return (
    <div className=" h-[200px] overflow-scroll">
      {teamMember.map((elem, index) => (
        <MemberCard {...elem} index={index} />
      ))}
    </div>
  );
};

export default TeamMemberListBox;
