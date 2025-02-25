import React from "react";
import { MatchFormData } from "../../../../../3_Entity/Match/type";

type FormRefs = {
  matchFormationRef: React.RefObject<HTMLSelectElement>;
  matchAttributeRef: React.RefObject<HTMLSelectElement>;
  matchTypeRefs: React.RefObject<HTMLInputElement[]>;
  matchParticipationRefs: React.RefObject<HTMLInputElement[]>;
  matchDateRef: React.RefObject<HTMLInputElement>;
  matchTimeRef: React.RefObject<HTMLInputElement>;
  matchDurationRefs: React.RefObject<HTMLInputElement[]>;
};

// ✅ 반환 타입을 명시한 버전
const useInputRefs = (): [FormRefs, () => MatchFormData] => {
  const refs: FormRefs = {
    matchFormationRef: React.useRef<HTMLSelectElement>(null),
    matchAttributeRef: React.useRef<HTMLSelectElement>(null),
    matchTypeRefs: React.useRef<HTMLInputElement[]>([]),
    matchParticipationRefs: React.useRef<HTMLInputElement[]>([]),
    matchDateRef: React.useRef<HTMLInputElement>(null),
    matchTimeRef: React.useRef<HTMLInputElement>(null),
    matchDurationRefs: React.useRef<HTMLInputElement[]>([]),
  };

  const getCheckedValue = (refs: React.RefObject<HTMLInputElement[]>) =>
    refs.current?.find((ref) => ref?.checked)?.value || null;

  const getSelectData = (): MatchFormData => ({
    match_formation_idx: Number(refs.matchFormationRef.current?.value) || 0,
    match_match_participation_type:
      Number(getCheckedValue(refs.matchParticipationRefs)) || 0,
    match_type_idx: Number(getCheckedValue(refs.matchTypeRefs)) || 0,
    match_match_attribute: Number(refs.matchAttributeRef.current?.value) || 0,
    match_match_start_time: `${refs.matchDateRef.current?.value ?? ""} ${
      refs.matchTimeRef.current?.value ?? ""
    }:00`,
    match_match_duration: getCheckedValue(refs.matchDurationRefs) ?? "",
  });

  return [refs, getSelectData];
};

export default useInputRefs;
