import { sequelize } from "../models/IndexModel"

const findProduct = async (req, res) => {
	const product = await req.context.models.product.findByPk(req.params.prod_id);
	return res.send(product);
};

const readProduct = async (req, res) => {
	const product = await req.context.models.product.findAll(
		{
			include: [
				{
					model: req.context.models.brand
				}, {
					model: req.context.models.category
				}, {
					model: req.context.models.condition
				}, {
					model: req.context.models.account
				}, {
					model: req.context.models.productVariant,
				},

				{ model: req.context.models.productImages }]

		}
	)
	return res.send(product);
}

const addProduct = async (req, res) => {
	const {
		prod_id,
		prod_name,
		prod_desc,
		prod_price,
		prod_stock,
		prod_expire,
		prod_weight,
		prod_cate_id,
		prod_brand_id,
		prod_acco_id,
		prod_cond_name,
	} = req.body;
	const product = await req.context.models.product.create({
		prod_id: prod_id,
		prod_name: prod_name,
		prod_desc: prod_desc,
		prod_price: prod_price,
		prod_stock: prod_stock,
		prod_expire: Date.now(),
		prod_weight: prod_weight,
		prod_cate_id: prod_cate_id,
		prod_brand_id: prod_brand_id,
		prod_acco_id: prod_acco_id,
		prod_cond_name: prod_cond_name,
	})
	return res.send(product)
}

const editProduct = async (req, res) => {
	const {
		prod_name,
		prod_desc,
		prod_price,
		prod_stock,
		prod_expire,
		prod_weight,
		prod_cate_id,
		prod_brand_id,
		prod_acco_id,
		prod_cond_name,
	} = req.body;
	const product = await req.context.models.product.update({
		prod_name: prod_name,
		prod_desc: prod_desc,
		prod_price: prod_price,
		prod_stock: prod_stock,
		prod_expire: Date.now(),
		prod_weight: prod_weight,
		prod_cate_id: prod_cate_id,
		prod_brand_id: prod_brand_id,
		prod_acco_id: prod_acco_id,
		prod_cond_name: prod_cond_name,
	}, {
		where: { prod_id: req.params.prod_id }
	}

	)
	return res.sendStatus(200)
}

const deleteProduct = async (req, res) => {
	const result = await req.context.models.product.destroy({
		where: { prod_id: req.params.prod_id },
	});

	return res.send(true);
};

const getProdName = async (req, res) => {
	const prodName = await sequelize.query(
		`select * from product  where lower(prod_name) like lower(:prod_name) `
		,
		{ replacements: { prod_name: '%' + req.params.prod_name + '%' }, type: sequelize.QueryTypes.SELECT }
	);
	return res.send(prodName);
};

const getProdStatus = async (req, res) => {
	const prodName = await sequelize.query(
		`select * from product   where prod_status="blokir" and lower(prod_name) like lower(:prodStatus) `
		,
		{ replacements: { prod_name: '%' + req.params.prodStatus + '%' }, type: sequelize.QueryTypes.SELECT }
	);
	return res.send(prodName);
};

const getProdSearch = async (req, res) => {
	const prodName = await sequelize.query(
		`select prim_id,prim_path, prod_id,prod_name, prod_desc,prod_price, prod_stock, 
		prod_weight,prod_status, prod_reason, prod_priorty, prod_priority_sort 
		from product join product_images on prod_id = prim_prod_id  
		where lower(prod_name) like lower(:prod_name) order by prod_priority_sort desc 
		 `
		,
		{ replacements: { prod_name: '%' + req.params.prod_name + '%' }, type: sequelize.QueryTypes.SELECT }
	);
	return res.send(prodName);
};


const getProdPriority = async (req, res) => {
	const prodName = await sequelize.query(
		`select prim_id,prim_path, prod_id,prod_name, prod_desc,prod_price, prod_stock, prod_weight,prod_status, prod_reason, prod_priorty, prod_priority_sort from product join product_images on prod_id = prim_prod_id  order by prod_priority_sort desc   `
		,
		{ replacements: { prod_name: req.params.prod_priority_sort }, type: sequelize.QueryTypes.SELECT }
	);
	return res.send(prodName);
};





export default {
	findProduct,
	readProduct,
	addProduct,
	editProduct,
	deleteProduct,
	getProdName,
	getProdStatus,
	getProdPriority,
	getProdSearch,
}