import MemberCard from "./ui/MemberCard";
import { Participant } from "./type";

const dummyParticipants: Participant[] = [
  { id: 1, name: "playerA", rank: 1, result: "우승" },
  { id: 2, name: "playerB", rank: 2, result: "준우승" },
  { id: 3, name: "playerC", rank: 3, result: "4강" },
  { id: 4, name: "playerD", rank: 4, result: "4강" },
  { id: 5, name: "playerE", rank: 5, result: "8강" },
  { id: 6, name: "playerF", rank: 6, result: "8강" },
];

const ParticipationMembers = () => {
  return (
    <section className="bg-white rounded-md shadow p-4">
      <h2 className="text-lg font-semibold mb-4">출전 선수</h2>
      <ul className="space-y-2">
        {dummyParticipants.map((player, index) => (
          <MemberCard player={player} index={index} />
        ))}
      </ul>
    </section>
  );
};
export default ParticipationMembers;
