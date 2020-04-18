const _transResToBook = (res) => {
    let data = {
        ...res
    };
    data.rating = res.rating.average
    data.tags = res.tags.map(tag => tag.title)
    data.author = res.author ? res.author[0] : "无名氏"
    data.series = res.series ? res.series.title : "无系列"
    return data
}

module.exports = {
    Query: {
        books: (_, {query}, {dataSources}) => {
            return dataSources.booksApi.searchBooks(query).then(res => {
                if (!res) {
                    return []
                }
                return res.map(book => _transResToBook(book))
            })
        },
        book: (_, {id}, {dataSources}) => {
            return dataSources.booksApi.getBook(id).then(_transResToBook)
        },
        cartList: async (_,{},{dataSources,user}) =>{
            if(!user){
                throw new Error("需要登录");
            }
            return dataSources.mysql.getCartList(user.studentNo)
        },
    },
    Mutation:{
        login: async (_,{student},{dataSources})=>{
            return dataSources.mysql.login(student)
        },
        regist: async (_,{student},{dataSources})=>{
            return dataSources.mysql.addStudent(student)
        }
    }
}