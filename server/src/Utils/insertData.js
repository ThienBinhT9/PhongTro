
const chothuematbang = require('../Data/chothuematbang.json')
const chothuephongtro = require('../Data/chothuephongtro.json')
const chothuecanho = require('../Data/chothuecanho.json')
const nhachothue = require('../Data/nhachothue.json')

const bcrypt = require('bcrypt')

const Post = require('../Model/post')
const User = require('../Model/user')
const Area = require('../Model/area')
const Price = require('../Model/price')
const Province = require('../Model/province')
const generateCode = require('../Utils/generateCode');
const {dataPrice, dataArea} = require('../Utils/data')
const { getNumberFromString } = require('../Utils/common')

const dataBody = [
    {
        body:chothuematbang.body,
        code:'CTMB'
    },
    {
        body:chothuephongtro.body,
        code:'CTPT'
    },
    {
        body:chothuecanho.body,
        code:'CTCH'
    },
    {
        body:nhachothue.body,
        code:'NCT'
    }
]

const insertData  = async(req, res) => {
    try {
        
 
            nhachothue.body.forEach(async(item, index) => {

               
                
                let currentArea = getNumberFromString(item?.header?.attributes?.acreage)
                let currentPrice = getNumberFromString(item?.header?.attributes?.price)

                const _province = item?.header?.address.split(',')[item?.header?.address.split(',').length - 1].trim()
                
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash('123456', salt)
                const newUser = await new User({
                    name: item?.contact?.content.find(i => i.name === "Liên hệ:")?.content,
                    phone: item?.contact?.content.find(i => i.name === "Điện thoại:")?.content,
                    zalo: item?.contact?.content.find(i => i.name === "Zalo")?.content,
                    password:hash
                })

                await newUser.save()
                
                const newPost = await new Post({
                    images:item?.images,
                    title:item?.header?.title,
                    star:item?.header?.star,
                    labelCode:generateCode(item?.header?.class?.classType),
                    address:item?.header?.address,
                    rent:item?.header?.attributes?.price,
                    acreage:item?.header?.attributes?.acreage,
                    description:JSON.stringify(item?.mainContent?.content),
                    area:item?.overview?.content?.find(i => i.name === 'Khu vực')?.content,
                    type:item?.overview?.content?.find(i => i.name === 'Loại tin rao:')?.content,
                    target:item?.overview?.content?.find(i => i.name === 'Đối tượng thuê:')?.content,
                    userId:newUser._id,
                    areaCode:dataArea.find(area => area.max > currentArea && area.min <= currentArea)?.code,
                    priceCode:dataPrice.find(price => price.max > currentPrice && price.min <= currentPrice)?.code,
                    provinceCode:generateCode(_province),
                    categoryCode:'NCT',
                    username:item?.contact?.content.find(i => i.name === "Liên hệ:")?.content,
                    userphone:item?.contact?.content.find(i => i.name === "Điện thoại:")?.content,
                })

                await newPost.save()

                const province = await Province.findOne({code:generateCode(_province), value:_province})

                if(!province){

                    const newProvince = await new Province({
                        code:generateCode(_province),
                        value:_province
                    })

                    await newProvince.save()
                }else{
                    console.log(_province);
                }

            })


        // dataArea.forEach(async(item,index) => {
        //     const newArea = await new Area({
        //         code:item.code,
        //         value:item.value,
        //         order:index + 1
        //     })

        //     await newArea.save()
        // })

        // dataPrice.forEach(async(item,index) => {
        //     const newPrice = await new Price({
        //         code:item.code,
        //         value:item.value,
        //         order:index + 1
        //     })

        //     await newPrice.save()
        // })
        res.status(200).json('okela')
    } catch (error) {
        return res.status(500).json('Lỗi server')
    }
}

module.exports = {insertData}