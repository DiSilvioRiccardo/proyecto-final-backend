import Delivery from "./delivery.model";

export async function createDelivery(req,res) {
    const { product } = req.body;
    if (!product) {
        res.status(400).send("All input is required");
    }

    const delivery = Delivery({
        owner: req.user._id,
        product: product
      });
 
    await delivery.save();

    res.status(200).json(delivery);
}

export async function getDelivery(req,res) {
    const { id } = req.query;

    if (!(id)) {
      res.status(400).send("Id in query is required");
    }

    const delivery = await Delivery.findOne({owner: req.user._id, _id: id});
    
    if (delivery){
        res.status(200).json(delivery);
    }else{
        res.status(404).json({"error": "delivery not found"});
    }

}


//TODO add time query
export async function getDeliveriesBulk(req, res){
    before = req.query.before;
    after = req.query.after;
    const deliveries = await Delivery.find({owner: req.user._id});
    return res.status(200).json(deliveries);
}

export async function patchDelivery(req, res){
    let resultado = await Delivery.updateOne({_id: req.body.id, owner: req.user._id}, req.body);
    if (resultado.matchedCount === 1){
        return res.status(200).json({"result": "product updated successfully"});
    }else{
        return res.status(404).json({"error": "product not found"});
    }
} 