const TeamRecruitListSection = () => {
  return (
    <div className="lg:col-span-1">
      {/* 가입 신청한 팀 목록 */}
      {teamList.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3">가입 신청한 팀</h2>
          <div className="space-y-3">
            {teamList.map((team) => (
              <TeamCard key={team.team_list_idx} team={team} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
export default TeamRecruitListSection;
