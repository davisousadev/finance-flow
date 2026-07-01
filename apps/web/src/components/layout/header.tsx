import { InputSearch } from "../inputSearch";
export function Header() {
    return (
        <header className="flex items-center justify-between px-20 py-2 bg-neutral-950 border-b  border-neutral-900">
            <InputSearch />
        </header>
    )
}