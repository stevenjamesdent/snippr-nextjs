import { getToken } from "firebase/app-check"
import { appCheckRef } from '@/hooks/useAppCheck';

export const get_app_check_token = async () => {
    if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'production') {
        const token_response = await getToken(
            appCheckRef.current,
            false
        );

        return token_response.token;
    }

    return null;
}