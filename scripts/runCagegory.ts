const { PrismaClient } = require("@prisma/client");
//种方式假定了 @prisma/client 是通过 npm 或类似的包管理器安装的一个可用模块。

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Music" },
        { name: "Fitness" },
        { name: "Photography" },
        { name: "Accounting" },
        { name: "Engineering" },
        { name: "Filming" },
      ],
    });
  } catch (error) {
    console.log(error);
  } finally {
    await database.$disconnect();
  }
}
 main();
