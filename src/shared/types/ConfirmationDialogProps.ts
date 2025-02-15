export interface ConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    entityName: string;
    message: string;
    title?: string;
}
