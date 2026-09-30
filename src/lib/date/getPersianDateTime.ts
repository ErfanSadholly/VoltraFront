export function getPersianDateTime(value: string | Date | null) {
    if (!value) {
        return "-";
    }

    return new Intl.DateTimeFormat("fa-IR", {
        dateStyle: "short",
        timeStyle: "short",
        timeZone: "Asia/Tehran",
    }).format(new Date(value));
}