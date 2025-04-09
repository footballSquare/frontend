type UseHandleTeamClickProps = {
  championshipType: number;
  watch: (name: string) => number[];
  setValue: (name: string, value: number[]) => void;
};
