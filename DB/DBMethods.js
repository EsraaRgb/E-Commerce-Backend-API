
export const findOne = async ({model, filter={},select='',populate = [],skip=0,limit=10}={}) =>{
    const result = await model.findOne(filter).limit(limit).skip(skip).select(select).populate(populate)
    return result
}
export const find = async ({model,select='',populate = [],skip=0,limit=10}={}) =>{
    const result = await model.find().limit(limit).skip(skip).select(select).populate(populate)
    return result
}
export const create = async ({model,data={}={}}) => {
    const result = await model.create(data)
    return result
}
export const createAndSave = async ({model, data={},select='',populate = [],skip=0,limit=10}={}) =>{
    const newObj = new model(data)
    const result = await newObj.save()
    return result
}
export const updateOne = async ({model,filter={}, data={}}={}) =>{
    const result = await model.updateOne(filter,data)
    return result
}
export const findById = async ({model,filter={},select='',populate=[]}={}) =>{
    const result = await model.findById(filter).select(select).populate(populate)
    return result
}
export const findOneAndUpdate = async ({model,filter={}, data={},options={},select='',populate=[]}={}) =>{
    const result = await model.findByIdAndUpdate(filter,data,options).select(select).populate(populate)
    return result
}
export const findByIdAndUpdate = async ({model,filter={}, data={},options={},select='',populate=[]}={}) =>{
    const result = await model.findByIdAndUpdate(filter,data,options ).select(select).populate(populate)
    return result
}
