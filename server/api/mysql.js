const {
    SQLDataSource
} = require("datasource-sql");
const sha256 = require("sha256");

const knexConfig = {
    client: 'mysql',
    connection: {
        host: '212.64.14.17',
        user: 'root',
        port: "32774",
        password: 'admin123',
        database: 'graphql'
    }
};

class MyDatabase extends SQLDataSource {

    async getCartList(studentNo) {
        return this.knex
            .select("*")
            .from("cart")
            .where({
                studentNo
            })
    }
    async login(student) {
        let token = sha256(student.studentNo + ":" + student.password);
        let stu = (await this.getStudentByToken(token))[0];
        if (!stu) {
            throw new Error("学号或密码错误");
        }
        return stu
    }
    async getStudentByToken(token) {
        return this.knex
            .select("*")
            .from("student")
            .where({
                token
            })
    }
    async getStudentByNo(studentNo) {
        return this.knex
            .select("*")
            .from("student")
            .where({
                studentNo
            })
    }
    async addStudent(student) {
        let stu = (await this.getStudentByNo(student.studentNo))[0];
        if (stu) {
            throw new Error("该学生已存在")
        }
        let token = sha256(student.studentNo + ":" + student.password);
        let password = sha256(student.password);
        let res = await this.knex
        .insert({
            studentNo: student.studentNo,
            password,
            token,
            studentName: student.studentName
        })
        .from("student");
        console.log(res)
        return res
    }
}

module.exports = new MyDatabase(knexConfig);