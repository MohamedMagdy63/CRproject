const oracledb = require('oracledb');
const data = new Array()
let result = ''
 
const select = async(rowName,tableName)=>{
    result = `select ${rowName} from ${tableName}`
}
const update = async(table,dataUpdated)=>{
    result += `UPDATE ${table} SET ${dataUpdated}`
}
const remove = async(table)=>{
    result+=`DELETE FROM ${table}`
}
const insert = async(table,columns,values)=>{
    result+=`INSERT INTO ${table} (${columns}) VALUES (${values})`
}

// SQl Quarys Halper
const where = async (rowName,operation,val)=>{
    typeof(val)==='string' && val != '' ?
    result += ` where ${rowName} ${operation} '${val}'`
    :
    result += ` where ${rowName} ${operation} ${val}`
}
const otherOperation = async(operation) => {
    result += `${operation}`
}
const otherSelect = async(rowName, tableName) => {
    result += `(select ${rowName} from ${tableName})`
}
const innerJoin = async(secondTable,firstTable,commanColumn)=>{
    result = `INNER JOIN ${secondTable} ON ${firstTable}.${commanColumn} = ${secondTable}.${commanColumn}`
}
const leftJoin = async(secondTable,firstTable,commanColumn)=>{
    result = `LEFT JOIN ${secondTable} ON ${firstTable}.${commanColumn} = ${secondTable}.${commanColumn}`
}
const rightJoin = async(secondTable,firstTable,commanColumn)=>{
    result = `RIGHT JOIN ${secondTable} ON ${firstTable}.${commanColumn} = ${secondTable}.${commanColumn}`
}
const fullJoin = async(secondTable,firstTable,commanColumn)=>{
    result = `FULL JOIN ${secondTable} ON ${firstTable}.${commanColumn} = ${secondTable}.${commanColumn}`
}
async function all() {
    let connection;
    try{
        connection = await oracledb.getConnection({
            user: "court_reservation",
            password: "court_reservation",
            connectionString: "localhost:1521/xe",
        })
        console.log(result)
        console.log('success connect')

        result = await connection.execute(
            `${result}`,
            [],
            {resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT}
        )
        const rs = result.resultSet;
        let row;
        while ((row = await rs.getRow())){
            data.push(row)
        }
        await rs.close()
        result = ''
    } catch(err){
        console.error(err)
    } finally{
        if(connection){
            try{
                await connection.close()
            } catch (err){
                console.error(err)
            }
        }
    }
}
async function execute(){
    let connection;
    try{
        connection = await oracledb.getConnection({
            user: "court_reservation",
            password: "court_reservation",
            connectionString: "localhost:1521/xe",
        })
        console.log(result)
        console.log('success connect')
        output = await connection.execute(
            `${result}`,
            [],
            {resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT}
        )
        output.rowsAffected == 0 ?
        data.push('FAILED')
        :
        data.push('SUCCESSED')
        result = ''
    }catch(err){
        console.error(err)
    } finally{
        if(connection){
            try{
                await connection.close()
            } catch(err){
                console.error(err);
            }
        }
    }
}
module.exports.select = select
module.exports.update = update
module.exports.insert = insert
module.exports.where = where
module.exports.otherOperation = otherOperation
module.exports.otherSelect = otherSelect
module.exports.innerJoin = innerJoin
module.exports.leftJoin = leftJoin
module.exports.rightJoin = rightJoin
module.exports.fullJoin = fullJoin
module.exports.remove = remove
module.exports.all = all
module.exports.execute = execute
module.exports.data = data