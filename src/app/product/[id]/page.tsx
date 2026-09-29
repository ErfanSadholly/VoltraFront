import { GetDetails } from "@/features/product/api/get-details";
import { ApiError } from "@/lib/ApiError";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function ProductDetailsPage({ params }: Props) {
    const { id } = await params;

    try {
        const response = await GetDetails(Number(id));
        console.log("DETAILS RESPONSE:", response);
        return (
            <div>
                <h1>{response.data?.product?.name}</h1>

                <p>{response.data?.product?.description}</p>
            </div>
        );
    } catch (error) {
        console.log(error);

        if (error instanceof ApiError) {
            return <div>{error.message}</div>;
        }

        return <div>{String(error)}</div>;
    }
}