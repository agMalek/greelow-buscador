import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import './ItemPersona.css'

const ItemPersona = ({titulo, desc, preguntaDisabledDescontar, preguntaDisabledAumentar , funcionButton, contador}) => {
    return (
        <div className='item_modal_personas'>
            <div className='contenedor_label_item'>
                <p className='label_item'>{titulo}</p>
                <p className='info_label_item'>{desc}</p>
            </div>
            <div className='contenedor_cant_pers'>
                <button disabled={preguntaDisabledDescontar} className='botonMasMenosPersonas' onClick={() => funcionButton(contador - 1)}>
                    <RemoveCircleOutlineIcon fontSize='large'/>
                </button>
                <p>{contador}</p>
                <button disabled={preguntaDisabledAumentar} className='botonMasMenosPersonas' onClick={() => funcionButton(contador + 1)}>
                    <AddCircleOutlineIcon fontSize='large'/>
                </button>
            </div>
        </div>
    )
}

export default ItemPersona;