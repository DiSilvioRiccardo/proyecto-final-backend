import Product from "./product.model";

export async function createProduct(req,res) {
    try{
        const { name, price, category } = req.body;
        if (!(name && price && category)) {
            return res.status(400).send("All input is required");
        }

        const product = Product({
            name: name, 
            price: price,
            owner: req.user._id,
            category: category
        });
    
        await product.save();

        return res.status(200).json(product);
    }catch (e) {
        return res.status(500).json({"error": e.toString()})
    }
}


export async function getProduct(req,res) {
    const { id } = req.query;

    if (!(id)) {
      return res.status(400).send("All input is required");
    }

    const product = await Product.findById(id);
    
    if (product){
        return res.status(200).json(product);
    }else{
        return res.status(404).json({"error": "product not found"});
    }

}
//TODO search text implementation
export async function searchProduct(req, res){
    const { id, searchText, category } = req.query;
    let query = {};
    id != null ? query.owner = id : null
    category != null ? query.category = category : null

    if (searchText){
        query.name = {$regex: searchText, $options: 'i'};
    }

    let products = await Product.find(query);
    products.sort((product1, product2) => product2.rating - product1.rating);
    return res.status(200).json(products);
}

export async function getUserProducts(req, res){
    let products = await Product.find({owner: req.user._id});
    let categories = [];
    products.forEach((product) => categories.push(product.category));
    return res.status(200).json(categories);
}

export async function patchProduct(req, res){
    let resultado = await Product.updateOne({_id: req.body.id, owner: req.user._id}, req.body);
    if (resultado.matchedCount === 1){
        return res.status(200).json({"result": "product updated successfully"});
    }else{
        return res.status(404).json({"error": "product not found"});
    }
}

export async function deleteProduct(req, res){
    try {
        let resultado = await Product.deleteOne({_id: req.body.id, owner: req.user._id});
        if (resultado.deletedCount === 1){
            return res.status(200).json({"result":"done"});
        }else{
            return res.status(400).json({"error":"product not found"});
        }
        
    } catch (e){
        return res.status(400).json({"error": e.toString()});
    }
} 
