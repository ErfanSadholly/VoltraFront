import {columnFilteringFeature,columnPinningFeature,columnSizingFeature,filterFn_includesString,tableFeatures,} from "@tanstack/react-table";

export const tableFeaturesConfig = tableFeatures({
    columnFilteringFeature,
    columnPinningFeature,
    columnSizingFeature,

    filterFns: {
        includesString: filterFn_includesString,
    },
});