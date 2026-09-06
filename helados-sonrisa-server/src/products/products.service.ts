import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ApiResponse } from 'src/utils/api.response';
import { handleDBException } from 'src/utils/handle-exceptions.util';

@Injectable()
export class ProductsService {

  private readonly productModel: Model<Product>

  constructor(@InjectModel(Product.name) productModel: Model<Product>) {
    this.productModel = productModel
  }

  async create(createProductDto: CreateProductDto) {
    try {
      const newProduct = await this.productModel.create({
        ...createProductDto,
        status: "Disponible"
      })
      return new ApiResponse("Producto registrado exitosamente", 201, newProduct)
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleDBException(error, ProductsService.name)
    }
  }

  async findAll() {
    const products = await this.productModel.find()
    return new ApiResponse("Productos obtenidos exitosamente", 200, products)
  }

  async findOne(term: string) {
    try {
      let product: Product | null = null
      if (isValidObjectId(term)) {
        product = await this.productModel.findById(term)
      }
      if (!product) {
        product = await this.productModel.findOne({
          $or: [
            { name: { $regex: term, $options: 'i' } },
            { category: { $regex: term, $options: 'i' } },
            { type: { $regex: term, $options: 'i' } }
          ]
        })
      }
      if (!product) return new ApiResponse("No se encontro ningun producto", 404, null)
      return new ApiResponse("Producto encontrado exitosamente", 200, product)
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleDBException(error, ProductsService.name)
    }

  }

  async update(term: string, updateProductDto: UpdateProductDto) {
    try {
      const filter = isValidObjectId(term) ? { _id: term } : { name: term }
      const updateProduct = await this.productModel.findOneAndUpdate(filter, updateProductDto, { new: true })
      return new ApiResponse("Producto actualizado exitosamente", 200, updateProduct)
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleDBException(error, ProductsService.name)
    }
  }

  async remove(term: string) {
    try {
      const filter = isValidObjectId(term) ? { _id: term } : { name: term }
      const deleteProduct = await this.productModel.findOneAndDelete(filter)
      if (!deleteProduct) return new ApiResponse("No se encontro el producto", 404, null)
      return new ApiResponse("Producto eliminado exitosamente", 204, null)
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleDBException(error, ProductsService.name)
    }
  }

  async insertMany(CreateProductDtos: CreateProductDto[]) {
    try {
      const products = await Promise.all(
        CreateProductDtos.map((product) => ({
          ...product,
          status: "Disponible"
        }))
      )
      const insertProducts = await this.productModel.insertMany(products)
      return new ApiResponse(`${insertProducts.length} productos insertados exitosamente`, 201, { count: insertProducts.length })
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleDBException(error, ProductsService.name)
    }
  }

  async removeAll() {
    try {
      await this.productModel.deleteMany()
      return new ApiResponse("Productos eliminados exitosamente", 204, null)
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleDBException(error, ProductsService.name)
    }
  }
}
