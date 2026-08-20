import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { AlertTriangle } from "@untitledui/icons";

/** Modal shell: title bar, scrollable body, footer. Matches how every CRUD page already lays its modals out. */
export const FormModal = ({ isOpen, onClose, title, children, footer, size = "md" }) => {
    const widths = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };

    return (
        <ModalOverlay isOpen={Boolean(isOpen)} onOpenChange={(open) => !open && onClose?.()} isDismissable>
            <Modal className={`w-full ${widths[size] ?? widths.md}`}>
                <Dialog>
                    <div className="flex items-start justify-between gap-4 border-b border-secondary px-6 py-4">
                        <h2 className="text-lg font-semibold text-primary">{title}</h2>
                        <CloseButton onClick={() => onClose?.()} size="sm" label="Close" />
                    </div>
                    <div className="flex flex-col gap-4 px-6 py-5">{children}</div>
                    {footer && <div className="flex justify-end gap-3 border-t border-secondary px-6 py-4">{footer}</div>}
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};

/** Submit/Cancel pair used by every add and edit form. */
export const FormFooter = ({ onSubmit, onCancel, isLoading = false, submitLabel = "Submit", loadingLabel = "Submitting..." }) => (
    <>
        <Button color="secondary" onClick={onCancel} isDisabled={isLoading}>
            Cancel
        </Button>
        <Button type="submit" onClick={onSubmit} isLoading={isLoading} isDisabled={isLoading}>
            {isLoading ? loadingLabel : submitLabel}
        </Button>
    </>
);

/**
 * Confirmation step. Defaults to the destructive treatment used by every
 * delete flow; `tone="brand"` is for confirmations that aren't dangerous, so
 * they don't borrow a red alert icon they haven't earned.
 */
export const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    isLoading = false,
    tone = "destructive",
    icon,
    title = "Are you sure?",
    description = "Are you sure you want to remove this record?",
    confirmLabel = "Remove",
    loadingLabel = "Removing...",
    children,
}) => {
    const isDestructive = tone === "destructive";

    return (
        <ModalOverlay isOpen={Boolean(isOpen)} onOpenChange={(open) => !open && !isLoading && onClose?.()} isDismissable={!isLoading}>
            <Modal className="w-full max-w-md">
                <Dialog>
                    <div className="flex flex-col gap-4 p-6">
                        <FeaturedIcon
                            color={isDestructive ? "error" : "brand"}
                            theme="light"
                            size="lg"
                            icon={icon ?? AlertTriangle}
                        />
                        <div className="flex flex-col gap-1">
                            <h2 className="text-lg font-semibold text-primary">{title}</h2>
                            {description && <p className="text-sm text-tertiary">{description}</p>}
                        </div>
                        {children}
                        <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <Button color="secondary" onClick={onClose} isDisabled={isLoading}>
                                Cancel
                            </Button>
                            <Button
                                color={isDestructive ? "primary-destructive" : "primary"}
                                onClick={onConfirm}
                                isLoading={isLoading}
                                isDisabled={isLoading}
                            >
                                {isLoading ? loadingLabel : confirmLabel}
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
