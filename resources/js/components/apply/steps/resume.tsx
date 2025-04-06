import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import { JobFormInterface } from '../job-application-form';

interface ResumeStepProps {
    resume: File | null;
    cover_letter: string | null;
    setResume: (resume: File | null) => void;
    setCoverLetter: (coverLetter: string | null) => void;
    errors: Partial<Record<keyof JobFormInterface, string>>;
    validate: (field: keyof JobFormInterface) => void;
}

export default function ResumeStep({ resume, setResume, cover_letter, setCoverLetter, errors, validate }: ResumeStepProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (file: File | null) => {
        setResume(file);
        validate('resume');
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileChange(files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    return (
        <div className="space-y-6">
            {/* Resume Upload Section */}
            <div className="space-y-4">
                <Label htmlFor="resume" className="text-base font-medium">
                    Resume
                </Label>

                <div
                    className={`rounded-lg border-2 border-dashed p-8 text-center ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    <Upload className="mx-auto mb-2 h-10 w-10 text-gray-400" />

                    <div className="mb-4 text-sm text-gray-600">
                        {resume ? <span className="text-blue-600">{resume.name}</span> : 'Drag and drop your file here, or click to browse'}
                    </div>

                    <Button type="button" variant="outline" className="w-full md:w-auto" onClick={() => fileInputRef.current?.click()}>
                        Browse Files
                    </Button>

                    <Input
                        ref={fileInputRef}
                        id="resume"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                    />

                    {errors.resume && <p className="mt-2 text-sm text-red-500">{errors.resume}</p>}
                </div>
            </div>

            <div className="space-y-4">
                <Label htmlFor="cover_letter" className="text-base font-medium">
                    Cover Letter
                </Label>

                <Textarea
                    id="cover_letter"
                    value={cover_letter || ''}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    onBlur={() => validate('cover_letter')}
                    placeholder="Write your cover letter here..."
                    className="min-h-[150px]"
                />

                {errors.cover_letter && <p className="mt-2 text-sm text-red-500">{errors.cover_letter}</p>}
            </div>
        </div>
    );
}
