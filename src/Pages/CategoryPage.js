// src/pages/CategoryPage.js
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { handleSuccess, handleError } from '../utils';

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({ name: '', description: '' });
    const [editingId, setEditingId] = useState(null);

    const fetchCategories = async () => {
        try {
            const res = await fetch('http://localhost:8080/categories');
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            handleError('Failed to fetch categories');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId
            ? `http://localhost:8080/categories/${editingId}`
            : 'http://localhost:8080/categories';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const result = await res.json();
            if (result.success !== false) {
                handleSuccess(editingId ? 'Updated' : 'Created');
                setForm({ name: '', description: '' });
                setEditingId(null);
                fetchCategories();
            } else {
                handleError(result.message);
            }
        } catch (err) {
            handleError('Error saving category');
        }
    };

    const handleEdit = (cat) => {
        setForm(cat);
        setEditingId(cat._id);
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:8080/categories/${id}`, { method: 'DELETE' });
            handleSuccess('Deleted');
            fetchCategories();
        } catch {
            handleError('Delete failed');
        }
    };

    return (
        <div className="container">
            <h2>🍔 Manage Categories</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                <button type="submit">{editingId ? 'Update' : 'Add'} Category</button>
            </form>

            <ul>
                {categories.map((cat) => (
                    <li key={cat._id}>
                        {cat.name}
                        <button onClick={() => handleEdit(cat)}>Edit</button>
                        <button onClick={() => handleDelete(cat._id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <ToastContainer />
        </div>
    );
};

export default CategoryPage;
