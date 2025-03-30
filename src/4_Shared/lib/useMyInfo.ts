import { useCookies } from 'react-cookie';

export const useIsLogin =(): [boolean] => {
    const [cookies] = useCookies(['access_token']);
    return [!!cookies.access_token];
}

export const useMyCommunityRoleIdx = (): [number | null] => {
    const [cookies] = useCookies(['community_role_idx']);
    return [cookies.community_role_idx];
}

export const useMyTeamRoleIdx = (): [number | null] => {
    const [cookies] = useCookies(['team_role_idx']);
    return [cookies.team_role_idx];
}

export const useMyTeamIdx = (): [number | null] => {  
    const [cookies] = useCookies(['team_idx']);
    return [cookies.team_idx];
}

export const useMyUserIdx = (): [number | null] => {
    const [cookies] = useCookies(['user_idx']);
    return [cookies.user_idx];
}