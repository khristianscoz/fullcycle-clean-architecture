import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test update product use case", () => {
    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([ProductModel]);
      await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a product", async() => {
        const productRepository = new ProductRepository();
        const useCase = new UpdateProductUseCase(productRepository);

        const product = new Product("abc", "ProductA", 1)

        await productRepository.create(product);

        const input = {
            id: "abc",
            name: "ProductB",
            price: 2
        };

        const output = {
            id: "abc",
            name: "ProductB",
            price: 2
        };

        const result = await useCase.execute(input);

        expect(result).toEqual({
            id: input.id,
            name: input.name,
            price: input.price
        });
    })
})