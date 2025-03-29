import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostOpenMatch = (): [(props: PostOpenMatchProps) => void] => {
  const [serverState, request, loading] = useFetchData();
  const postOpenMatch = (props: PostOpenMatchProps) => {
    const {
      match_formation_idx,
      match_match_participation_type,
      match_type_idx,
      match_match_start_time,
      match_match_duration,
    } = props;
    request(
      "POST",
      `/match/open`,
      {
        match_formation_idx,
        match_match_participation_type,
        match_type_idx,
        match_match_duration: "2 hours",
        match_match_start_time,
      },
      true
    );
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      if (serverState.status === 200) {
        alert("매치가 생성되었습니다.");
      } else {
        alert("매치 생성에 실패했습니다.");
      }
    }
  }, [loading, serverState]);

  return [postOpenMatch];
};
export default usePostOpenMatch;
