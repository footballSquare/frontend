import useGetTeamMembers from "../../../../3_Entity/Team/useGetTeamMembers";

const TeamMemberListBox = () => {
  const [teamMember] = useGetTeamMembers();
  return (
    <div className=" h-[200px] overflow-scroll">
      {teamMember.map((member, index) => (
        <div key={index} className="flex items-center space-x-2">
          <img
            src={member.player_list_profile_img}
            alt={member.player_list_nickname}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-xs">{member.player_list_nickname}</span>
        </div>
      ))}
    </div>
  );
};

export default TeamMemberListBox;
