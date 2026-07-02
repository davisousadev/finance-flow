import { ModalContainer } from "./modalContainer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type ModalCreateClientProps = {
    open: boolean;
    closeModal?: () => void;
}

export function ModalCreateClient({ open, closeModal }: ModalCreateClientProps) {
    return (
        <ModalContainer open={open}>
            <div className="flex flex-col gap-4 p-6 rounded-lg">
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-secondary-200">
                        Add New Client
                    </h3>
                    <p className="text-primary-100 text-sm">
                        Fill in the details to add a new client.
                    </p>
                </div>
                <form action="" className="flex flex-col gap-4">
                    <label className="text-primary-100 font-mono" htmlFor="name">
                        Name
                    </label>
                    <Input id="name" placeholder="Client Name" />
                    <label className="text-primary-100 font-mono" htmlFor="email">
                        Email
                    </label>
                    <Input id="email" placeholder="Client Email" />
                </form>
                <footer className="flex justify-end gap-2 mt-4">
                    <Button type="button" variant="ghost" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button>
                        Create Client
                    </Button>
                </footer>
            </div>
        </ModalContainer>
    )
}