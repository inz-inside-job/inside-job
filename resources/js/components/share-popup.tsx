import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Copy, Facebook, Linkedin } from 'lucide-react';
import React, { useState } from 'react';

interface SharePopupProps {
    url: string;
    open: boolean;
    onClose: () => void;
}

export const SharePopup: React.FC<SharePopupProps> = ({ url, open, onClose }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="w-80">
                <DialogHeader>
                    <DialogTitle>Share this page</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                    <Button onClick={handleCopy} className="w-full cursor-pointer">
                        <Copy className="mr-2 h-4 w-4" />
                        {copied ? 'Copied!' : 'Copy Link'}
                    </Button>
                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                    >
                        <Button variant="outline" className="w-full cursor-pointer">
                            <Facebook className="mr-2 h-4 w-4" />
                            Share on Facebook
                        </Button>
                    </a>
                    <a
                        href={`https://x.com/intent/tweet?text=Check this out&url=${encodeURIComponent(url)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                    >
                        <Button variant="outline" className="w-full cursor-pointer">
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            Share on X
                        </Button>
                    </a>
                    <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                    >
                        <Button variant="outline" className="w-full cursor-pointer">
                            <Linkedin className="mr-2 h-4 w-4" />
                            Share on LinkedIn
                        </Button>
                    </a>
                </div>
                <Button onClick={onClose} variant="outline" className="mt-4 w-full cursor-pointer">
                    Close
                </Button>
            </DialogContent>
        </Dialog>
    );
};
