import {loadFront} from "yaml-front-matter";

export type PageMarkdown = {
    title: string,
    menu: boolean,
    menuOrder: number,
    route: string,
    content: string,
}

export function createPageMarkdown(rawMarkdown: string): PageMarkdown {
    const yamlMetadata = loadFront(rawMarkdown);

    const isRouteValid = typeof yamlMetadata.route === 'string' && yamlMetadata.route.startsWith('/');
    const isTitleValid = typeof yamlMetadata.title === 'string' && yamlMetadata.title.length > 0;
    const isMenuValid = typeof yamlMetadata.menu === 'boolean';
    const isMenuOrderValid = yamlMetadata.menuOrder === undefined
        || (typeof yamlMetadata.menuOrder === 'number' && yamlMetadata.menuOrder >= 0);

    if (!isRouteValid) {
        throw new Error("'route' field is invalid. Must be a non-empty string starting with '/'");
    }

    if (!isTitleValid) {
        throw new Error("'title' field is invalid. Must be a non-empty string.");
    }

    if (!isMenuValid) {
        throw new Error("'menu' field is invalid. Must be boolean.");
    }

    if (!isMenuOrderValid) {
        throw new Error("'menuOrder' field is invalid. Must be numeric, if specified.");
    }

    return {
        title: yamlMetadata.title,
        menu: yamlMetadata.menu,
        menuOrder: yamlMetadata.menuOrder,
        route: yamlMetadata.route,
        content: rawMarkdown,
    } as PageMarkdown;
}