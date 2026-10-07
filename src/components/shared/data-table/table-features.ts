import { columnFilteringFeature, columnPinningFeature, columnSizingFeature, filterFn_includesString, rowSortingFeature, tableFeatures, } from "@tanstack/react-table";

export const tableFeaturesConfig = tableFeatures({
    columnFilteringFeature,
    columnPinningFeature,
    columnSizingFeature,
    rowSortingFeature,

    filterFns: {
        includesString: filterFn_includesString,
    },
});