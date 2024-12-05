import { Card, CardContent, Typography, CardActions,  CardMedia} from '@mui/material';
import {Produt} from "../backend/get_products"
//image issue
interface ProdutsProps{
    produt: Produt;
    
}

function ProductsCards({produt}: ProdutsProps){
    return(
        <Card sx={{maxWidth:200, minHeight:100}}>
            <CardMedia component="image" height="50" src="../Images/produto.png"></CardMedia>
            <Typography gutterBottom fontSize={20} component="div">{produt.nome}</Typography>
            <Typography gutterBottom fontSize={16} component="div">R${produt.preco}</Typography>
            <Typography gutterBottom fontSize={12}>{produt.descricao}</Typography>          
        </Card>

    );
    
}

export default ProductsCards;
//            <Typography gutterBottom variant='h5' component="div">{produt.preco}</Typography>
//            <Typography variant='body2'sx={{color: 'text.secondary'}}>{produt.descricao}</Typography>          