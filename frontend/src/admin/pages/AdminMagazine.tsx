import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { adminService } from "@/services/admin.service";
import { mediaService } from "@/services/media.service";
import { toast } from "sonner";
import { ImageIcon, Loader2, Upload, CheckCircle2 } from "lucide-react";

const AdminMagazineCover = () => {
    const [currentImageUrl, setCurrentImageUrl] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchCover();
    }, []);

    const fetchCover = async () => {
        try {
            const res = await adminService.getMagazine();
            if (res.success && res.data) {
                setCurrentImageUrl(res.data.imageUrl);
            }
        } catch (error) {
            console.error("Failed to load cover", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async () => {
        if (!selectedFile) return toast.error("Please select an image first");

        setIsSubmitting(true);
        const loadingToast = toast.loading("Updating magazine cover...");
        
        try {
            // 1. Upload to Cloudinary
            const cloudUrl = await mediaService.uploadImage(selectedFile);
            
            // 2. Update Database
            const res = await adminService.updateMagazine({ imageUrl: cloudUrl });
            
            if (res.success) {
                toast.success("Cover updated successfully!");
                setCurrentImageUrl(cloudUrl);
                setSelectedFile(null);
                setPreviewUrl(null);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
            toast.dismiss(loadingToast);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="max-w-sm mx-auto px-4 py-4 md:py-8 animate-fade-up">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-5 text-center border-b border-gray-50">
                    <h2 className="text-lg font-bold font-headline">Magazine Cover</h2>
                    <p className="text-[11px] text-muted-foreground mt-1">Update homepage featured image.</p>
                </div>

                <div className="p-6 space-y-6">
                    {/* Image Display */}
                    <div className="flex flex-col items-center">
                        <div className="relative w-full max-w-[180px] aspect-[3/4] rounded-xl overflow-hidden bg-gray-50 border border-dashed border-gray-200 shadow-inner flex flex-col items-center justify-center text-center">
                            {previewUrl ? (
                                <>
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full shadow-lg">
                                        <CheckCircle2 className="w-3 h-3" />
                                    </div>
                                </>
                            ) : currentImageUrl ? (
                                <img src={currentImageUrl} alt="Current" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-center p-4 opacity-20 flex flex-col items-center">
                                    <ImageIcon className="w-10 h-10 mb-2" />
                                    <p className="text-[10px] font-bold uppercase tracking-widest">No Image</p>
                                </div>
                            )}
                        </div>
                        {previewUrl && (
                            <p className="mt-3 text-[9px] font-bold text-primary uppercase tracking-widest animate-pulse font-body">
                                New Preview
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            ref={fileInputRef}
                            className="hidden"
                        />
                        
                        {!previewUrl ? (
                            <Button 
                                onClick={() => fileInputRef.current?.click()}
                                variant="outline"
                                className="w-full py-6 text-sm rounded-xl border-dashed border-2 hover:border-primary/50 transition-all font-semibold gap-2 font-body"
                            >
                                <ImageIcon className="w-4 h-4 text-primary" />
                                Select Image
                            </Button>
                        ) : (
                            <div className="flex flex-col gap-2 font-body">
                                <Button 
                                    onClick={handleUpdate}
                                    disabled={isSubmitting}
                                    className="w-full py-6 text-sm rounded-xl font-bold gap-2 shadow-md shadow-primary/20"
                                >
                                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                    Update Cover
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => {
                                        setPreviewUrl(null);
                                        setSelectedFile(null);
                                    }}
                                    className="text-muted-foreground text-[11px] font-medium"
                                >
                                    Cancel
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminMagazineCover;
