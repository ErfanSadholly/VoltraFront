import { DataTable } from "@/components/shared/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { GetAll } from "@/features/product/api/get-all";
import { productColumns } from "@/features/product/components/product-columns";

export default async function ProductPage() {
    const response = await GetAll({
        pageNo: 1,
        pageSize: 10
    });

    return (
        <div className="container mx-auto space-y-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">
                        محصولات
                    </h1>

                    <p className="text-muted-foreground">
                        مدیریت محصولات فروشگاه
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="success" className="rounded-lg px-4 py-2 text-primary-foreground">
                    Add
                </Button>

                <Button variant="warning" className="rounded-lg px-4 py-2 text-primary-foreground">
                    Update
                </Button>

                <Button variant="danger" className="rounded-lg px-4 py-2 text-primary-foreground">
                    Delete
                </Button>
            </div>

            <DataTable
                columns={productColumns}
                data={response.data}
            />
        </div>
    );
}