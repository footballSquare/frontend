import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";
import { useNavigate } from "react-router-dom";

const usePutChampionship = (
  communityIdx: number
): [
  putChampionship: (formData: FormData) => void,
  serverState: Record<string, unknown> | null
] => {
  const [serverState, request] = useFetchData();
  const navigate = useNavigate();

  const putChampionship = (formData: FormData) => {
    request("POST", `/community/${communityIdx}/championship`, formData, true);
  };

  React.useEffect(() => {
    if (!serverState) return;
    console.log(serverState);

    switch (serverState.status) {
      case 200: {
        const { championship_list_idx } = serverState as {
          championship_list_idx: number;
        };
        navigate(`/championship/${championship_list_idx}`);
        alert("챔피언십이 성공적으로 등록되었습니다.");
        break;
      }
      case 409:
        alert("이미 존재하는 대회명입니다");
        break;

      default:
        alert("챔피언십 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
        break;
    }
  }, [serverState]);

  return [putChampionship, serverState];
};

export default usePutChampionship;
