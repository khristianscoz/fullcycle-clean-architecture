import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test list product use case", () => {
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
  
      it("should list products", async() => {
        const productRepository = new ProductRepository();
        const useCase = new ListProductUseCase(productRepository);

        const product1 = new Product("aaa", "ProductA", 1)
        const product2 = new Product("bbb", "ProductB", 2)

        await productRepository.create(product1);
        await productRepository.create(product2);

        const input = {};

        const result = await useCase.execute(input);

        expect(result.products.length).toBe(2);
        expect(result.products[0].id).toBe(product1.id);
        expect(result.products[0].name).toBe(product1.name);
        expect(result.products[0].price).toBe(product1.price);
        expect(result.products[1].id).toBe(product2.id);
        expect(result.products[1].name).toBe(product2.name);
        expect(result.products[1].price).toBe(product2.price);
      });
})