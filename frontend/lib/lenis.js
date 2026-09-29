let instance = null;
export const setLenis = (l) => { instance = l; };
export const getLenis = () => instance;
export function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el)
        return;
    if (instance)
        instance.scrollTo(el, { duration: 1.4 });
    else
        el.scrollIntoView({ behavior: "smooth" });
}
