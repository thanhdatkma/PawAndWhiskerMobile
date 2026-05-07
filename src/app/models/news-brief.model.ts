export interface NewsBriefModel {
    id: number | string;
    title: string;
    summary: string;
    image_url: string;
    created_at: string;
    author: string;
    content?: string;
    /** Alias for image_url — kept for backward compat with existing templates */
    thumbnailImage?: string;
}

export interface NewsListResponse {
    data: NewsBriefModel[];
    total: number;
}