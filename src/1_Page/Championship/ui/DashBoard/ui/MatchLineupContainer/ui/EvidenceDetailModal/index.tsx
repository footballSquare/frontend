import React from "react";
import useGetChampionshipEvidence from "../../../../../../../../3_Entity/Championship/useGetChampionshipEvidence";

const EvidenceDetailModal = (props: EvidenceDetailModalProps) => {
  const { championshipMatchIdx, selectTeamList, handleToggleModal } = props;

  // api
  const [evidenceImage] = useGetChampionshipEvidence(championshipMatchIdx);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  return (
    <div className="w-full flex justify-end">
      <div
        className="fixed inset-0 z-10 h-full bg-black/60 flex items-center justify-center p-4"
        onClick={handleToggleModal}>
        <div
          className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}>
          <div className="sticky top-0 bg-white z-10 border-b p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">증거 자료</h2>
            <button
              onClick={handleToggleModal}
              className="text-gray-600 hover:text-gray-900 transition-colors rounded-full p-2 hover:bg-gray-100">
              닫기
            </button>
          </div>

          <div className="p-6">
            {!evidenceImage ? (
              <div className="text-center text-gray-500 py-10">
                데이터 로딩 중...
              </div>
            ) : (
              <div className="space-y-6">
                {/* First Team Evidence */}
                <div>
                  <h3 className="text-lg font-semibold text-blue-700 mb-4">
                    {selectTeamList[0]} 기록
                  </h3>
                  {evidenceImage.first_team_evidence &&
                  evidenceImage.first_team_evidence.length > 0 ? (
                    <div className="overflow-x-auto w-full">
                      <div className="grid grid-cols-4 gap-4 p-1">
                        {evidenceImage.first_team_evidence.map((item) => (
                          <div
                            key={item.match_team_stats_evidence_img}
                            className="group relative cursor-pointer"
                            onClick={() =>
                              setSelectedImage(
                                item.match_team_stats_evidence_img
                              )
                            }>
                            <img
                              src={item.match_team_stats_evidence_img}
                              alt="First Team Evidence"
                              className="w-full rounded-lg transition-transform group-hover:scale-105 group-hover:shadow-lg"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      데이터가 없습니다.
                    </div>
                  )}
                </div>

                {/* Second Team Evidence */}
                <div>
                  <h3 className="text-lg font-semibold text-green-700 mb-4">
                    {selectTeamList[1]} 기록
                  </h3>
                  {evidenceImage.second_team_evidence &&
                  evidenceImage.second_team_evidence.length > 0 ? (
                    <div className="overflow-x-auto w-full">
                      <div className="grid grid-cols-4 gap-4 p-1">
                        {evidenceImage.second_team_evidence.map((item) => (
                          <div
                            key={item.match_team_stats_evidence_img}
                            className="group relative cursor-pointer"
                            onClick={() =>
                              setSelectedImage(
                                item.match_team_stats_evidence_img
                              )
                            }>
                            <img
                              src={item.match_team_stats_evidence_img}
                              alt="Second Team Evidence"
                              className="w-full rounded-lg transition-transform group-hover:scale-105 group-hover:shadow-lg"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      데이터가 없습니다.
                    </div>
                  )}
                </div>

                {/* Player Evidence */}
                <div>
                  <h3 className="text-lg font-semibold text-purple-700 mb-4">
                    Player Evidence
                  </h3>
                  {evidenceImage.player_evidence &&
                  evidenceImage.player_evidence.length > 0 ? (
                    <div className="overflow-x-auto w-full">
                      <div className="grid grid-cols-4 gap-4 p-1">
                        {evidenceImage.player_evidence.map((item) => (
                          <div
                            key={item.match_player_stats_evidence_img}
                            className="group relative cursor-pointer"
                            onClick={() =>
                              setSelectedImage(
                                item.match_player_stats_evidence_img
                              )
                            }>
                            <p className="font-semibold text-gray-600 mb-2">
                              {item.player_list_nickname}
                            </p>
                            <img
                              src={item.match_player_stats_evidence_img}
                              alt="Player Evidence"
                              className="w-full rounded-lg transition-transform group-hover:scale-105 group-hover:shadow-lg"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      데이터가 없습니다.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-10 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}>
          <div
            className="relative max-w-[90%] max-h-[90%] overflow-hidden"
            onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="Enlarged Evidence"
              className="w-full h-full object-contain rounded-xl shadow-2xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white bg-white/20 hover:bg-white/40 rounded-full px-4 py-2 transition-colors">
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvidenceDetailModal;
