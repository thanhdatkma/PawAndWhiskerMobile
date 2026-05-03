export interface PopupBannerModel {
    id: string;
    title: string;
    image_url: string;
    link_url: string;
    button_text: string | null;
    tagline: string | null;
    type: 'slider' | 'popup';
    sort_order: number;
    active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}
