const readAccount = async(req,res)=> {
    if (req.body.acco_id){
        const account = await req.context.models.account.findByPk(
            req.body.acco_id,
          );
        return res.send(account);
    }
    else {
        const account = await req.context.models.account.findAll(
            {
                include: [
				{
                model: req.context.models.product
            }]}
        );
        return res.send(account);
    }   
}

export default{
    readAccount
}