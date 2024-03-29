'use-strict';

const conn = require('../Configs/connection'),
    { getMaxPage } = require('./page');

exports.getOrders = (req, page) => {
    let sql = 'SELECT * FROM table_orders';

    return new Promise((resolve, reject) => {
        getMaxPage(page, null, "table_orders").then(maxPage => {
            const infoPage = {
                currentPage: page.page,
                totalAllOrder: maxPage.totalProduct,
                maxPage: maxPage.maxPage
            };

            conn.query(`${sql} LIMIT ? OFFSET ?`, [page.limit, page.offset], (err, data) => {
                if (!err) resolve({
                    infoPage,
                    data
                });
                else reject(err);
            });
        }).catch(err => reject(err));
    });
}

exports.newOrder = async (req, order) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO table_orders SET admin_id = ?, order_id = ?, total_price = ?',
            [req.body.admin_id, order, req.body.total_price],
            (err, result) => {
                if (!err) {
                    const values = req.body.detail_order.map(item => [order, item.prod_id, item.quantity, item.sub_total]);
                    conn.query('INSERT INTO table_orders_detail (order_id, prod_id, quantity, sub_total) VALUES ? ',
                        [values],
                        (err, result) => {
                            if (!err) resolve(result);
                            else reject(err);
                        }
                    );
                } else reject(err);
            });
    });
}

exports.updateStatusOrder = req => {
    const body = req.body;
    return new Promise((resolve, reject) => {
        conn.query('UPDATE table_orders SET status = ?, cancel_reason = ? WHERE order_id = ?', [body.status, body.cancel_reason, req.params.order_id],
            (err, result) => {
                if (!err) resolve(result)
                else reject(err);
            });
    });
}

exports.updateQtyProduct = (product, status) => {
    let sql = '';
    const operator = status == 'success' ? '-' : '+';
    console.log(product);
    
    product.forEach((item, index) => {
        sql += `UPDATE table_products SET quantity = quantity ${operator} ${item.quantity} WHERE id = ${item.prod_id};`;
    });

    return new Promise((resolve, reject) => {
        conn.query(sql, product, (err, result) => {
            if (!err) resolve(result);
            else reject(err);
        });
    });

}

exports.reduceQtyProduct = (product) => {
    return new Promise((resolve, reject) => {
        conn.query(`UPDATE table_products SET quantity = quantity - ? WHERE id = ?`, [product.quantity, product.prod_id], (err, result) => {
            if(!err) resolve(result);
            else reject(err);
        })
    })
}

exports.getOrderById = (req, order) => {
    const orderId = req.params.order_id || req.body.order_id || order;
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM table_orders WHERE order_id = ?`, [orderId],
            (err, result) => {
                if (!err) resolve(result);
                else reject(err);
            })
    });
}

exports.getDetailOrderById = orderId => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT prod_id, quantity, sub_total FROM table_orders_detail WHERE order_id = ?`, [orderId],
            (err, result) => {
                if (!err) resolve(result);
                else reject(err);
            });
    })
}