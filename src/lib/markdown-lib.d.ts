export type PageMarkdown = {
    title: string;
    menu: boolean;
    menuOrder: number;
    route: string;
    content: string;
};
export declare function createPageMarkdown(rawMarkdown: string): PageMarkdown;
