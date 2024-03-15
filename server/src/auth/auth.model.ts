export interface IFacebookCredential {
    id: string;
    name: string;
    email: string;
    picture: {
        data: {
            height: number;
            is_silhouette: boolean;
            url: string;
            width: string;
        }
    }
}

export type SocialLogin = 'google' | 'facebook'
