type UsePostApproveMemberHandlerReturn = {
  handlePostApproveMember: (userIdx: number) => Promise<void>;
};

type UseDeleteApproveMemberHandlerReturn = {
  handleDeleteApproveMember: (userIdx: number) => Promise<void>;
};

type UseApproveMemberHandlerProps = {
  team_list_idx: number;
  excludePlayerById: (id: number) => void;
  includePayerById: (id: number) => void;
};
