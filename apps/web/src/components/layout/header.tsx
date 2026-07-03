import { SidebarTrigger } from "@/components/ui/sidebar";
import { InputSearch } from "../inputSearch";
export function Header() {
    return (
        <header className="flex items-center gap-4 border-b border-neutral-900 bg-neutral-950 px-6 py-3 md:px-10">
            <SidebarTrigger className="shrink-0" />
            <div className="min-w-0 flex-1">
                <InputSearch />
            </div>
        </header>
    )
}