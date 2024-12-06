import { Card, CardContent, Typography, CardActions,  CardMedia} from '@mui/material';
import {Produt} from "../backend/get_products"
//image issue
interface ProdutsProps{
    produt: Produt;    
}

function ProductsCards({produt}: ProdutsProps){
    return(
        <Card style={{width:300, height:200}}>
            <CardMedia component="img" style={{height:"50px", width:"50px"}} src={produt.foto} ></CardMedia>
            <Typography gutterBottom fontSize={20} component="div">{produt.nome}</Typography>
            <Typography gutterBottom fontSize={16} component="div">R${produt.preco}</Typography>
            <Typography gutterBottom fontSize={12}>{produt.descricao}</Typography>          
        </Card>
    );    
}
export default ProductsCards;