import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogHeader, DialogFooter, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Button } from '../ui/button';

const ConfirmModal = ({
    isOpen,
    onClose,
    title = 'Are you sure??',
    body,
    actionLabel,
    onAction,
    description = "",
    onDecline,
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
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" onClick={onDecline}>No</Button>
                    </DialogClose>
                    <Button className="bg-orange-500 text-white hover:bg-orange-700" onClick={onAction}>
                        {actionLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmModal;
