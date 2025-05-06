import Porto, { IPorto } from "@/models/porto";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";

// Tipe untuk request data (bisa sesuaikan kalau struktur berubah)
interface CreatePortoBody {
  title: string;
  description: string;
  images: string[]; // base64 URLs
  gitLink: string;
  webLink: string;
  tags: string[];
}

// POST /api/porto
export const POST = async (request: NextRequest) => {
  await connectDB();

  try {
    const data: CreatePortoBody = await request.json();

    if (!Array.isArray(data.tags)) {
      data.tags = data.tags ? String(data.tags).split(',').map(tag => tag.trim()) : [];
    }
    // console.log(data);

    const uploadPromises = data.images.map(async (image: string) => {
      const uploadedImage = await cloudinary.uploader.upload(image, {
        folder: "personal_website",
      });
      return { url: uploadedImage.secure_url };
    });

    const uploadedImages = await Promise.all(uploadPromises);

    const newData = {
      ...data,
      images: uploadedImages,
      tags: data.tags
    };

    const porto: IPorto = await Porto.create(newData);

    return NextResponse.json({
      message: "Porto created successfully",
      porto,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
};

// GET /api/porto
export const GET = async (request: NextRequest) => {
  await connectDB();
  try {
    const portos: IPorto[] = await Porto.find();
    return NextResponse.json({ portos });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch portos" },
      { status: 500 }
    );
  }
};
