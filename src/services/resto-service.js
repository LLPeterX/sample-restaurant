import React from 'react'

class RestoService extends React.Component {
  constructor() {
    super();
    this._apiBase = "http://localhost:3000";
  }

  async getResource(url) {
    const res = await fetch(this._apiBase + url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}. Status: ${res.status}`);
    }
    return await res.json();
  }

  async getMenuItems() {
    return await this.getResource("/menu/");
  }

  // async saveCart(items) {
  //   const json = JSON.stringify(items);
  //   const res = await fetch(this._apiBase+"/cart",{
  //     method: 'POST',
  //     body: json,
  //     headers: {
  //       'Content-Type':'application/json;charset=utf-8'
  //     }
  //   });
  //   console.log('saveCart:',res);
  //   return await res.json();
  // }

  async setOrder(order) {
    const number = await this.getOrderNumber();
    const newOrder = {
      id: number,
      order: order
    }
    const response = await fetch(`${this._apiBase}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(newOrder)
    });
    if (!response.ok) {
      throw new Error('json error');
    }
  }

  async getOrderNumber() {
    const res = await this.getResource('/orders/');
    const orderNumber = res.length + 1;

    return orderNumber
  }
}

export default RestoService;