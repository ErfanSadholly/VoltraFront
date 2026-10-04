export type ProductGetByIdResponse = {
    id: number;
    name: string;
    description: string | null;
    brandId: number | null;
    brandName: string | null;
    isActive: boolean;
    createdBy: string;
    createdOn: string;
    modifiedBy: string | null;
    modifiedOn: string | null;
};