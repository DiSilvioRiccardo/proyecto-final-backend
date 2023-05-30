export const categories = ["tecnologia", "herramienta", "belleza", "oficina"];
export function isValidCategory(category){
    return categories.includes(category);
}

export function areValidCategories(userCategories){
    return userCategories.every(isValidCategory);
}