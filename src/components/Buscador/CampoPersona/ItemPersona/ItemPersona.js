import './ItemPersona.css'

const ItemPersona = ({titulo, desc, preguntaDisabledDescontar, preguntaDisabledAumentar , funcionButton, contador}) => {
    return (
        <div className='item_modal_personas'>
            <div className='contenedor_label_item'>
                <p className='label_item'>{titulo}</p>
                <p className='info_label_item'>{desc}</p>
            </div>
            <div className='contenedor_cant_pers'>
                <button disabled={preguntaDisabledDescontar} className='btn btn-primary' onClick={() => funcionButton(contador - 1)}>-</button>
                <p>{contador}</p>
                <button disabled={preguntaDisabledAumentar} className='btn btn-primary' onClick={() => funcionButton(contador + 1)}>+</button>
            </div>
        </div>
    )
}

export default ItemPersona;