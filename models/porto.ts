import mongoose, { Schema, Document, Model } from "mongoose";

interface IImage {
  url: string;
}

interface IIcon {
  text: any;
}

// 3. Tipe utama untuk Porto
export interface IPorto extends Document {
  title: string;
  description: string;
  images: IImage[];
  gitLink: string;
  webLink: string;
  tags: string[];
  // icon?: IIcon;
  createdAt: Date;
  updatedAt: Date;
}

// 4. Subschema untuk Image
const imageSchema = new Schema<IImage>({
  url: { type: String, required: true },
});

// 5. Subschema untuk Icon (opsional jika digunakan)
const iconSchema = new Schema<IIcon>({
  text: Schema.Types.Mixed,
});

// 6. Main schema Porto
const portoSchema = new Schema<IPorto>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [imageSchema],
    gitLink: { type: String, required: true },
    webLink: { type: String, required: true },
    // icon: iconSchema,
  },
  {
    timestamps: true,
  }
);

// 7. Model TypeScript
const Porto: Model<IPorto> =
  mongoose.models.Porto || mongoose.model<IPorto>("Porto", portoSchema);

export default Porto;
