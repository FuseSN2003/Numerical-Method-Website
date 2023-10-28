import prisma from "../prisma";

export default class Solutions {

  private static areEqual(obj1: any, obj2: any): boolean {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  }

  static async addData(method: string, inputData: any) {
    const checkData = await this.getData(method);
    
    const existedQuestion = checkData.some((data) => {
      return this.areEqual(data.form, inputData);
    });
    
    if (existedQuestion) {
      return;
    }

    await prisma.inputData.create({
      data: {
        method,
        form: inputData,
      }
    })
  }

  static async getData(method: string) {
    const result = await prisma.inputData.findMany({
      where: {
        method
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    })
    
    return result;
  }
}