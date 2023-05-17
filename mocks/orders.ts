import { Order } from '../src/types/Order';

export const orders: Order[] = [
  {
    _id: '6372e48cbcd195b0d3d0f7f3',
    table: '123',
    status: 'WAITING',
    products: [
      {
        product: {
          name: 'Pizza quatro queijos',
          imagePath: '1683166113868-quatro-queijos.png',
          price: 70,
        },
        quantity: 4,
        _id: '6372e48cbcd195b0d3d0f7f4'
      },
      {
        product: {
          name: 'Coca-cola lata',
          imagePath: '1683334002695-coca-cola.png',
          price: 7,
        },
        quantity: 5,
        _id: '6372e48cbcd195b0d3d0f7f5'
      }
    ],
  }
];
