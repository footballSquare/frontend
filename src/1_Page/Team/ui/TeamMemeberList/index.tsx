import useGetTeamMembers from "../../../../3_Entity/Team/useGetTeamMembers";

const TeamMemberList = () => {
  const [teamMember] = useGetTeamMembers();
  return (
    <div>
      <h2 className="text-base font-semibold ">팀 현황</h2>
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
    </div>
  );
};

export default TeamMemberList;
