import { sequelize } from '../models/IndexModel'

// select Brand
const allCategory = async (req, res) => {
    const cate = await req.context.models.category.findAll(
        {
            include: [{
                model: req.context.models.category,

            }, {
                model: req.context.models.product,

            }, { model: req.context.models.categoryImg }]
        }
    );
    // console.log(findAll())
    return res.send(cate);
}

const findCate = async (req, res) => {
    const cate = await req.context.models.category.findByPk(
        req.params.cate_id,
    );
    return res.send(cate);
}
const getCateId = async (req, res) => {
    const CateId = await sequelize.query(
        'select cate_name from category where cate_cate_id = 0',
        { type: sequelize.QueryTypes.SELECT }
    )
    return res.send(CateId);
}




const deleteCate = async (req, res) => {

    const result2 = await req.context.models.categoryImg.destroy(
        {
            where: { caim_cate_id: req.params.cate_id },
        });
    const result = await req.context.models.category.destroy(
        {
            where: { cate_id: req.params.cate_id },
        });

       

    return res.send(200);
};



const updateCate = async (req, res) => {
    const { cate_name, cate_cate_id } = req.body;
    // console.log(cate_id);
    const category = await req.context.models.category.update(

        {
            cate_name: cate_name,
            cate_cate_id: cate_cate_id,
        },
        {
            where: {
                cate_id: req.params.cate_id
            }
        }
    );

    return res.send(200);
};

const addCate = async (req, res) => {
    const { cate_name, cate_cate_id } = req.body;
    const category = await req.context.models.category.create({
        cate_name: cate_name,
        cate_cate_id: cate_cate_id
    });

    return res.send(category);
}

export default {
    allCategory,
    deleteCate,
    updateCate,
    addCate,
    findCate,
    getCateId
}