import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './style.module.css';
import { useTheme } from '../../theme';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isBlue, toggleTheme } = useTheme();

    const fetchOrders = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            const orders = response.data.map(product => ({
                id: product.id,
                customerName: product.title,
                isAccepted: Math.random() > 0.5
            }));
            setOrders(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <div className={isBlue ? styles.containerBlue : styles.containerWhite}>
            <h1 className={isBlue ? styles.titleBlue : styles.titleWhite}>Buyurtmalar</h1>
            <ul className={styles.orderList}>
                {orders.map((order) => (
                    <li key={order.id} className={isBlue ? styles.orderItemBlue : styles.orderItemWhite}>
                        <p className={isBlue ? styles.orderItempBlue : styles.orderItempWhite}><strong>Buyurtma ID:</strong> {order.id}</p>
                        <p className={isBlue ? styles.orderItempBlue : styles.orderItempWhite}><strong>Buyurtmachi:</strong> {order.customerName}</p>
                        <p className={isBlue ? styles.orderItempBlue : styles.orderItempWhite}>
                            <strong className={styles.strong}>Status:</strong>
                            <span className={order.isAccepted ? styles.accepted : styles.rejected}>
                                {order.isAccepted ? ' Qabul qilindi' : ' Qabul qilinmadi'}
                            </span>
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrdersPage;