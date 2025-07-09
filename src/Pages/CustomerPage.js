// src/pages/CustomerPage.js
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { handleSuccess, handleError } from '../utils';

const CustomerPage = () => {
    const [customers, setCustomers] = useState([]);
    const [form, setForm] = useState({ name: '', phone: '', email: '', address: '' });
    const [editingId, setEditingId] = useState(null);

    const fetchCustomers = async () => {
        try {
            const res = await fetch('http://localhost:8080/customers');
            const data = await res.json();
            setCustomers(data);
        } catch (err) {
            handleError('Failed to fetch customers');
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId
            ? `http://localhost:8080/customers/${editingId}`
            : 'http://localhost:8080/customers';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const result = await res.json();
            if (result.success !== false) {
                handleSuccess(editingId ? 'Updated' : 'Created');
                setForm({ name: '', phone: '', email: '', address: '' });
                setEditingId(null);
                fetchCustomers();
            } else {
                handleError(result.message);
            }
        } catch (err) {
            handleError('Error saving customer');
        }
    };

    const handleEdit = (customer) => {
        setForm(customer);
        setEditingId(customer._id);
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:8080/customers/${id}`, { method: 'DELETE' });
            handleSuccess('Deleted');
            fetchCustomers();
        } catch {
            handleError('Delete failed');
        }
    };

    return (
        <div className="container">
            <h2>👤 Manage Customers</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                <button type="submit">{editingId ? 'Update' : 'Add'} Customer</button>
            </form>

            <ul>
                {customers.map((c) => (
                    <li key={c._id}>
                        {c.name} - {c.phone} - {c.email} - {c.address}
                        <button onClick={() => handleEdit(c)}>Edit</button>
                        <button onClick={() => handleDelete(c._id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <ToastContainer />
        </div>
    );
};

export default CustomerPage;
