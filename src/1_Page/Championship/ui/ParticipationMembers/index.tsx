type Participant = {
  id: number;
  name: string;
  rank?: number;
  result?: string;
};

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
        {dummyParticipants.map((player) => (
          <li
            key={player.id}
            className="flex items-center justify-between border-b last:border-b-0 py-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full" />
              <span className="font-medium">{player.name}</span>
            </div>
            <div className="text-sm text-gray-500">
              {player.result || "참가 중"}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default ParticipationMembers;
