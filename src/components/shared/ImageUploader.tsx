import { uploadImage } from "@/lib/actions/s3actions";
import { Image } from "@nextui-org/react";
import { useRef, useState } from "react";

type ImageUploaderProps = {
  onImageUploaded: (url: string) => void;
  defaultImage?: string;
};

export default function ImageUploader({
  defaultImage,
  onImageUploaded,
}: ImageUploaderProps) {
  const [imageUploading, setImageUploading] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleImageUpload = async (e: any) => {
    setImageUploading(true);
    if (!e?.target?.files[0]) {
      setImageUploading(false);
      return;
    }
    const file = e.target.files[0] as File;
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileUrl = await uploadImage(buffer.toJSON(), file.name);
    console.log(imageRef.current);
    if (imageRef.current) {
      imageRef.current.src = fileUrl;
    }
    onImageUploaded(fileUrl);
    setImageUploading(false);
  };

  return (
    <div className="inline-block">
      <label
        htmlFor="image"
        className="cursor-pointer hover:opacity-75 duration-300"
      >
        <Image
          alt="Profile Image"
          className="object-cover max-w-48 h-48 rounded-xl"
          isLoading={imageUploading}
          src={defaultImage}
          ref={imageRef}
        />
      </label>
      <input
        disabled={imageUploading}
        id="image"
        className="hidden"
        onChange={handleImageUpload}
        name="image"
        placeholder="Enter your name..."
        type="file"
      />
    </div>
  );
}
