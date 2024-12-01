import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './style.module.css';
import { useTheme } from '../../theme';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isBlue } = useTheme();
    const navigate = useNavigate();

    // API dan buyurtmalarni olish funksiyasi
    const fetchOrders = async () => {
        const accessToken = localStorage.getItem('accessToken'); // Tokenni localStorage dan olish
        if (!accessToken) {
            console.error('Access token not found.');
            navigate('/login'); // Token topilmasa, login sahifasiga yo'naltirish
            return;
        }

        try {
            const response = await axios.get('https://taxibuxoro.pythonanywhere.com/requests/', {
                headers: {
                    'Authorization': `JWT ${accessToken}`, // Tokenni headerga qo'shish
                }
            });

            // API dan olingan ma'lumotlarni kerakli formatga o'tkazish
            const orders = response.data.map(order => ({
                id: order.id, // Buyurtma ID
                user: order.user, // Foydalanuvchi ID
                requestType: order.request_type, // So'rov turi
                where: order.where, // Qayerdan
                whereTo: order.whereTo, // Qayerga
                phoneNumber: order.phone_number, // Telefon raqami
                yolovchiSoni: order.yolovchiSoni, // Yo'lovchilar soni
                isActive: order.is_active // Faoliyat holati
            }));

            setOrders(orders); // Buyurtmalarni holatga o'rnatish
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false); // Yuklash holatini to'xtatish
        }
    };

    // Komponent yuklanganda buyurtmalarni olish
    useEffect(() => {
        fetchOrders();
    }, []);

    // Yuklanayotgan paytda ko'rsatish
    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    // Buyurtmalarni ko'rsatish
    return (
        <div className={isBlue ? styles.containerBlue : styles.containerWhite}>
            <h1 className={isBlue ? styles.titleBlue : styles.titleWhite}>Buyurtmalar</h1>
            <ul className={styles.orderList}>
                {orders.map((order) => (
                    <li key={order.id} className={isBlue ? styles.orderItemBlue : styles.orderItemWhite}>
                        <p className={isBlue ? styles.orderItempBlue : styles.orderItempWhite}><strong>Buyurtma ID:</strong> {order.id}</p>
                        <p className={isBlue ? styles.orderItempBlue : styles.orderItempWhite}><strong>Foydalanuvchi ID:</strong> {order.user}</p>
                        <p className={isBlue ? styles.orderItempBlue : styles.orderItempWhite}><strong>So'rov turi:</strong> {order.requestType}</p>
                        <p className={isBlue ? styles.orderItempBlue : styles.orderItempWhite}><strong>Qayerdan:</strong> {order.where}</p>
                        <p className={isBlue ? styles.orderItempBlue : styles.orderItempWhite}><strong>Qayerga:</strong> {order.whereTo}</p>
                        <p className={isBlue ? styles.orderItempBlue : styles.orderItempWhite}><strong>Telefon raqami:</strong> {order.phoneNumber}</p>
                        <p className={isBlue ? styles.orderItempBlue : styles.orderItempWhite}><strong>Yo'lovchilar soni:</strong> {order.yolovchiSoni}</p>
                        <p className={isBlue ? styles.orderItempBlue : styles.orderItempWhite }>
                            <strong className={styles.strong}>Holati:</strong>
                            <span className={order.isActive ? styles.accepted : styles.rejected}>
                                {order.isActive ? 'Qabul qilingan' : 'Qabul qilinmagan'}
                            </span>
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrdersPage;