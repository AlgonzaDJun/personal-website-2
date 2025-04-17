interface IImage {
  url: string;
}

// 3. Tipe utama untuk Porto
export interface PortoInterface {
  _id: string;
  title: string;
  description: string;
  images: IImage[];
  gitLink: string;
  webLink: string;
  tags: string[];
  // icon?: IIcon;
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
}
