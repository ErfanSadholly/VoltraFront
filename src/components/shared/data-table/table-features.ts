import { columnFilteringFeature, filterFn_includesString, tableFeatures, } from "@tanstack/react-table";

export const tableFeaturesConfig = tableFeatures({
    columnFilteringFeature,

    filterFns: {
        includesString: filterFn_includesString,
    },
});