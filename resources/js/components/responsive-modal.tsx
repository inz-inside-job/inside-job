import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import React from 'react';

interface ResponsiveModalProps {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const withResponsiveComponent = (MobileComponent: React.ElementType, DesktopComponent: React.ElementType) => {
    return ({ children, ...props }: React.ComponentProps<'div'>) => {
        const isMobile = useIsMobile();
        const Component = isMobile ? MobileComponent : DesktopComponent;
        return <Component {...props}>{children}</Component>;
    };
};

export const ResponsiveModal: React.FC<ResponsiveModalProps> = ({ children, onOpenChange, open }) => {
    const isMobile = useIsMobile();

    return isMobile ? (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <div className="hide-scrollbar max-h-[85vh] overflow-y-auto p-4 sm:p-6">{children}</div>
            </DrawerContent>
        </Drawer>
    ) : (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="hide-scrollbar max-h-[85vh] w-full overflow-y-auto border-none p-4 sm:max-w-lg sm:p-6">
                {children}
            </DialogContent>
        </Dialog>
    );
};

// Export subcomponents for convenience
export const ResponsiveModalHeader = withResponsiveComponent(DrawerHeader, DialogHeader);
export const ResponsiveModalFooter = withResponsiveComponent(DrawerFooter, DialogFooter);
export const ResponsiveModalTitle = withResponsiveComponent(DrawerTitle, DialogTitle);
export const ResponsiveModalDescription = withResponsiveComponent(DrawerDescription, DialogDescription);
export const ResponsiveModalClose = withResponsiveComponent(DrawerClose, DialogClose);
