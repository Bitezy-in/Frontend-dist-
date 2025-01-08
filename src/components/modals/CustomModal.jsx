import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const CustomModal = ({
    isOpen,
    onClose,
    title = 'Modal Title',
    body,
    description = ""
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>
                        {description}
                    </DialogDescription>}
                </DialogHeader>
                <div className="modal-body">
                    {body}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CustomModal;
