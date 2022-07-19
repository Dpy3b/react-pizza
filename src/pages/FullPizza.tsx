import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza :FC = () => {
	 const navigate = useNavigate()


    const [pizza, setPizza] = useState<{
		imageUrl: string;
		title: string;
		price: number;
	}>();


    const { id } = useParams()

    useEffect(() => {
        console.log(pizza)
        async function fetchPizza() {
            console.log('вызов fetchPizza')
            try {
                const { data } = await axios.get('https://62cac4103e924a01285e89b3.mockapi.io/items/' + id)
                setPizza(data)
            } catch (error) {
                console.log('ошибка при получение пиццы')
                alert('Не удалось найти пиццу. Нажмите "Ok", чтобы вернуться на гланую страницу')
                navigate('/')
            }
        }

        fetchPizza()
    }, [])

    if (!pizza) {
        return <>Загрузка...</>
    }

	return (
		<div>
			<h2>{pizza.title}</h2>
			<h4>{pizza.price}</h4>
		</div>
	);
};

export default FullPizza;


