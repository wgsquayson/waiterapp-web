import { Board } from '../Board';
import { Container } from './styles';

import { useEffect, useState } from 'react';
import { Order } from '../../types/Order.ts';
import { api } from '../../utils/api.ts';

import socketIo from 'socket.io-client';

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket = socketIo('http://localhost:3001', {
      transports: ['websocket'],
    });

    socket.on('orders@new', (order) => {
      setOrders(prevState =>
        prevState.some(o => o._id === order._id)
          ? prevState
          : prevState.concat(order)
      );
    });
  }, []);

  useEffect(() => {
    api.get('/orders').then(response => {
      setOrders(response.data);
    });
  },[]);

  function handleCancelOrder(orderId: string) {
    setOrders(prevState => prevState.filter(order => order._id !== orderId));
  }

  function handleOrderStatusChange(orderId: string, status: Order['status']) {
    setOrders(prevState => prevState.map(order => {
      if (order._id === orderId) {
        return {
          ...order, status
        };
      }

      return order;
    }));
  }

  return (
    <Container>
      <Board
        icon='⏱️'
        title='Fila de espera'
        orders={orders.filter(order => order.status === 'WAITING')}
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}
      />
      <Board
        icon='🧑‍🍳'
        title='Em preparação'
        orders={orders.filter(order => order.status === 'IN_PRODUCTION')}
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}
      />
      <Board
        icon='✅'
        title='Pronto!'
        orders={orders.filter(order => order.status === 'DONE')}
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}
      />
    </Container>
  );
}
