import db from '../config/db.js'; 

const getAllCustomers = async () => {
    const [rows] = await db.query('SELECT * FROM customer');
    return rows;
};

const getCustomerById = async (id) => {
    const [rows] = await db.query('SELECT * FROM customer WHERE idcustomer = ?', [id]);
    return rows[0];
};

const addCustomer = async (customerData) => {
    const {
        fk_idcity, fk_ididentification, fk_idcustomer, fk_idclasscustomer,
        fk_idcountry, typecustomer, name, andress, phone, phone2, zipcode,
        state, email, dtbirth, numidentification, comissionpercent, attention,
        picture_path, active, restriction
    } = customerData;

    const result = await db.query(`
        INSERT INTO customer (fk_idcity, fk_ididentification, fk_idcustomer, fk_idclasscustomer, 
            fk_idcountry, typecustomer, name, andress, phone, phone2, zipcode, state, email, 
            dtbirth, numidentification, comissionpercent, attention, picture_path, active, restriction) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [fk_idcity, fk_ididentification, fk_idcustomer, fk_idclasscustomer, fk_idcountry, typecustomer, 
        name, andress, phone, phone2, zipcode, state, email, dtbirth, numidentification, 
        comissionpercent, attention, picture_path, active, restriction]
    );
    return result[0].insertId;
};

const updateCustomer = async (id, customerData) => {
    const {
        fk_idcity, fk_ididentification, fk_idcustomer, fk_idclasscustomer,
        fk_idcountry, typecustomer, name, andress, phone, phone2, zipcode,
        state, email, dtbirth, numidentification, comissionpercent, attention,
        picture_path, active, restriction
    } = customerData;

    const result = await db.query(`
        UPDATE customer SET fk_idcity = ?, fk_ididentification = ?, fk_idcustomer = ?, fk_idclasscustomer = ?, 
            fk_idcountry = ?, typecustomer = ?, name = ?, andress = ?, phone = ?, phone2 = ?, 
            zipcode = ?, state = ?, email = ?, dtbirth = ?, numidentification = ?, 
            comissionpercent = ?, attention = ?, picture_path = ?, active = ?, restriction = ? 
        WHERE idcustomer = ?`,
        [fk_idcity, fk_ididentification, fk_idcustomer, fk_idclasscustomer, fk_idcountry, 
        typecustomer, name, andress, phone, phone2, zipcode, state, email, dtbirth, 
        numidentification, comissionpercent, attention, picture_path, active, restriction, id]
    );
    return result[0].affectedRows;
};

const deleteCustomer = async (id) => {
    const result = await db.query('DELETE FROM customer WHERE idcustomer = ?', [id]);
    return result[0].affectedRows;
};

export default {
    getAllCustomers,
    getCustomerById,
    addCustomer,
    updateCustomer,
    deleteCustomer
};
