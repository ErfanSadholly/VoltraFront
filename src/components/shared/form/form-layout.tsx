import { FieldGroup } from "@/components/ui/field";

type FormLayoutProps = {
    children: React.ReactNode;
};

export function FormLayout({ children }: FormLayoutProps) {
    return (
        <FieldGroup className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {children}
        </FieldGroup>
    );
}