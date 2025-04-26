class ProductImageDto {
  id: string;

  imageUrl: string;
}

class AttributeDto {
  nameAttribute: string;

  description: string | null;
}

class AttributeValueDto {
  id: string;
  attributeId: string;
  attributeValue: string;
  attribute: AttributeDto;
  tagValue: string | null;
}

class CategoryDto {
  nameCategory: string;
  description: string | null;
}

export class ProductDto {
  id: string;

  createDate: Date;

  updateDate: Date;

  nameProduct: string;

  price: number;

  description: string | null;

  categoryId: string;

  isDeleted: boolean;

  category: CategoryDto;

  productImages: ProductImageDto[];

  attributeValues: AttributeValueDto[];
}
