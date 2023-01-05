import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
    const x = Date().length > 1;
    if (x) {
        return {
            ostemad: [1,2,3]
        }
    } else {
        return {
            kartoffel: "hej"
        }
    }
}