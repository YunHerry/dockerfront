export const isEmpty = function(text: string): boolean {
    return text === null || text.match(/^ *$/) !== null;
};