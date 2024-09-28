import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import FormProvider from "@/app/ui/providers/create-provider";

export default function Page(){
    return <main>
        <Breadcrumbs breadcrumbs={[ { label: 'Providers', href: '/dashboard/providers' },
          { label: 'Create Provider', href: '/dashboard/providers/create', active: true, },]}>
        
        </Breadcrumbs>

        <FormProvider/>
    </main>
}